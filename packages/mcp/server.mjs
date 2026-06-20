#!/usr/bin/env node
// OliveKit MCP server — exposes the design kit's components, standards,
// expressions, and house rules to AI agents over stdio.
//
// Stack: @modelcontextprotocol/sdk v1.29 (McpServer + StdioServerTransport).
// This file is at packages/mcp/, so the repo root is two levels up. Every tool
// reads source-of-truth files (registry.json, r/<name>.json, docs/, audit.json,
// CLAUDE.md, llms.txt) at call time, so the server never holds stale data.

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// Repo root: packages/mcp -> ../.. is the design-kit root.
const ROOT = path.resolve(import.meta.dirname, '../..');
const at = (...p) => path.join(ROOT, ...p);

// --- Zod, resolved the way the SDK resolves it -----------------------------
// v1.29's registerTool wants `inputSchema` as a Zod raw shape. Zod is a peer of
// the SDK and is not linked into this package's own node_modules, but it IS
// resolvable from the SDK package's location. Resolving it through the SDK's
// createRequire yields the exact Zod the SDK validates against. If that ever
// fails we degrade gracefully: the arg tools still register (without a typed
// schema) so the server stays up.
let z = null;
try {
  const requireFromSdk = createRequire(import.meta.resolve('@modelcontextprotocol/sdk/server/mcp.js'));
  for (const spec of ['zod/v4-mini', 'zod/v4', 'zod/v3', 'zod']) {
    try {
      const mod = await import(new URL('file://' + requireFromSdk.resolve(spec)).href);
      const candidate = mod.z ?? mod.default ?? mod;
      if (candidate && typeof candidate.string === 'function') {
        z = candidate;
        break;
      }
    } catch {
      // try the next specifier
    }
  }
} catch {
  // import.meta.resolve unavailable or SDK not found; z stays null.
}

// inputSchema for a single required string `name`, or an empty shape if Zod is
// unavailable. With the empty shape the SDK still passes through `extra`, and we
// fall back to reading the raw arguments off the request handler context.
const nameSchema = z ? { name: z.string() } : {};

// --- File helpers ----------------------------------------------------------
const readText = (rel) => readFile(at(rel), 'utf8');
const readJson = async (rel) => JSON.parse(await readText(rel));
const text = (s) => ({ content: [{ type: 'text', text: s }] });
const fail = (s) => ({ content: [{ type: 'text', text: s }], isError: true });

// Pull the `name` argument whether it arrived via a validated inputSchema
// (args object) or, in the Zod-less fallback, via the raw request context.
function readNameArg(argsOrExtra, maybeExtra) {
  // Typed path: registerTool(..., { inputSchema: { name } }, (args, extra) => …)
  if (argsOrExtra && typeof argsOrExtra === 'object' && typeof argsOrExtra.name === 'string') {
    return argsOrExtra.name;
  }
  // Fallback path: no inputSchema -> handler is (extra). Raw args live on the
  // request that the SDK threads through requestInfo/_meta in some transports;
  // we also accept an explicit `arguments` bag if present.
  const extra = maybeExtra ?? argsOrExtra;
  const raw =
    extra?.arguments ??
    extra?.params?.arguments ??
    extra?.requestInfo?.arguments;
  if (raw && typeof raw === 'object' && typeof raw.name === 'string') return raw.name;
  return undefined;
}

// --- Server ----------------------------------------------------------------
const server = new McpServer({
  name: 'olivekit',
  version: '0.0.0',
});

// 1) list_components --------------------------------------------------------
server.registerTool(
  'list_components',
  {
    title: 'List OliveKit components',
    description:
      'List every OliveKit UI component available in the registry. Returns each ' +
      'component name with the exact `npx shadcn@latest add @olivekit/<name>` command ' +
      'to install it. Use this to discover what to reuse before hand-rolling any UI.',
    inputSchema: {},
  },
  async () => {
    try {
      const registry = await readJson('registry.json');
      const items = (registry.items ?? []).filter((i) => i.type === 'registry:ui');
      if (items.length === 0) return fail('No registry:ui components found in registry.json.');
      const lines = items
        .map((i) => i.name)
        .sort()
        .map((name) => `- ${name}\n    npx shadcn@latest add @olivekit/${name}`);
      return text(
        `${items.length} OliveKit components:\n\n${lines.join('\n')}\n\n` +
          'Fetch a component\'s source with the get_component tool.'
      );
    } catch (err) {
      return fail(`Failed to read registry.json: ${err.message}`);
    }
  }
);

// 2) get_component { name } -------------------------------------------------
server.registerTool(
  'get_component',
  {
    title: 'Get an OliveKit component',
    description:
      'Get the source files for one OliveKit component by name (e.g. "button", ' +
      '"dialog", "data-table"). Returns each file\'s path and full contents from ' +
      'r/<name>.json. Use list_components to discover valid names.',
    inputSchema: nameSchema,
  },
  async (argsOrExtra, maybeExtra) => {
    const name = readNameArg(argsOrExtra, maybeExtra);
    if (!name) return fail('Missing required argument "name" (a component name, e.g. "button").');
    const safe = String(name).trim();
    if (!/^[a-z0-9][a-z0-9-]*$/i.test(safe)) {
      return fail(`Invalid component name "${name}". Use a registry name like "button" or "data-table".`);
    }
    const rel = path.join('r', `${safe}.json`);
    if (!existsSync(at(rel))) {
      return fail(
        `Component "${safe}" not found (no ${rel}). Run list_components to see available names.`
      );
    }
    try {
      const comp = await readJson(rel);
      const files = comp.files ?? [];
      if (files.length === 0) return fail(`Component "${safe}" has no files in ${rel}.`);
      const header = [
        `Component: ${comp.name ?? safe}`,
        `Install: npx shadcn@latest add @olivekit/${comp.name ?? safe}`,
        comp.dependencies?.length ? `npm dependencies: ${comp.dependencies.join(', ')}` : null,
        comp.registryDependencies?.length
          ? `registry dependencies: ${comp.registryDependencies.join(', ')}`
          : null,
        `${files.length} file(s).`,
      ]
        .filter(Boolean)
        .join('\n');
      const body = files
        .map((f) => `--- ${f.path} ---\n${f.content ?? '(no content)'}`)
        .join('\n\n');
      return text(`${header}\n\n${body}`);
    } catch (err) {
      return fail(`Failed to read ${rel}: ${err.message}`);
    }
  }
);

// 3) list_standards ---------------------------------------------------------
const STANDARDS = [
  ['composition', 'docs/standards/composition.md', 'When to use which type role, measure, spacing, layout, and hierarchy.'],
  ['content', 'docs/standards/content.md', 'Voice, action vocabulary, designed empty/loading/error copy, i18n.'],
  ['app-ui', 'docs/standards/app-ui.md', 'App / product UI surface: dense, dark, mono data, dot status.'],
  ['landing', 'docs/standards/landing.md', 'Landing / marketing surface: airy, big display type, one restrained signature.'],
  ['presentation', 'docs/standards/presentation.md', 'HTML decks on OliveKit tokens, so slides read as OliveLabs.'],
  ['components', 'docs/standards/components.md', 'The component depth bar every component must pass before "done".'],
  ['anti-ai-patterns', 'docs/standards/anti-ai-patterns.md', 'The enforced "no AI smell" anti-pattern checklist; self-audit before shipping.'],
  ['governance', 'docs/governance.md', 'Versioning, deprecation, and rollout rules that keep the kit evolving without breaking consumers.'],
];

server.registerTool(
  'list_standards',
  {
    title: 'List OliveKit standards',
    description:
      'List the OliveKit design standards (composition, content, app-ui, landing, ' +
      'presentation, components, anti-ai-patterns, governance), each with a one-line ' +
      'summary. Fetch any one in full with get_standard.',
    inputSchema: {},
  },
  async () => {
    const lines = STANDARDS.map(([name, , summary]) => `- ${name}: ${summary}`);
    return text(
      `OliveKit standards:\n\n${lines.join('\n')}\n\n` +
        'Fetch the full markdown of any standard with get_standard { name }.'
    );
  }
);

// 4) get_standard { name } --------------------------------------------------
server.registerTool(
  'get_standard',
  {
    title: 'Get an OliveKit standard',
    description:
      'Get the full markdown of one OliveKit standard by name. Valid names: ' +
      'composition, content, app-ui, landing, presentation, components, ' +
      'anti-ai-patterns, governance. Use list_standards for summaries.',
    inputSchema: nameSchema,
  },
  async (argsOrExtra, maybeExtra) => {
    const name = readNameArg(argsOrExtra, maybeExtra);
    if (!name) {
      return fail(
        'Missing required argument "name". Valid: ' + STANDARDS.map((s) => s[0]).join(', ') + '.'
      );
    }
    const key = String(name).trim().toLowerCase();
    const entry = STANDARDS.find((s) => s[0] === key);
    if (!entry) {
      return fail(
        `Unknown standard "${name}". Valid names: ${STANDARDS.map((s) => s[0]).join(', ')}.`
      );
    }
    try {
      return text(await readText(entry[1]));
    } catch (err) {
      return fail(`Failed to read ${entry[1]}: ${err.message}`);
    }
  }
);

// 5) list_expressions -------------------------------------------------------
const EXPRESSIONS = {
  instrument: 'Utility / SaaS. Dark-first, electric lime-olive accent. The default "Lab Instrument" look.',
  warm: 'Consumer-facing. Lighter, warmer surfaces with a coral accent.',
  editorial: 'Content / long-form. Serif display with a claret accent.',
};

server.registerTool(
  'list_expressions',
  {
    title: 'List OliveKit expressions',
    description:
      'List the OliveKit expressions (color/voice themes that share the same ' +
      'components): instrument (utility/SaaS/dark/olive), warm (consumer/light/coral), ' +
      'editorial (content/serif/claret). Sourced from the tokens audit. Each app picks ' +
      'one expression.',
    inputSchema: {},
  },
  async () => {
    let keys = Object.keys(EXPRESSIONS);
    try {
      const audit = await readJson('packages/tokens/dist/audit.json');
      const auditKeys = Object.keys(audit ?? {});
      if (auditKeys.length) keys = auditKeys;
    } catch {
      // audit.json missing/unreadable: fall back to the known expression set.
    }
    const lines = keys.map(
      (k) => `- ${k}: ${EXPRESSIONS[k] ?? 'OliveKit expression (see packages/tokens/dist/audit.json).'}`
    );
    return text(
      `OliveKit expressions (same components, different soul; pick one per project):\n\n` +
        `${lines.join('\n')}`
    );
  }
);

// 6) get_rules --------------------------------------------------------------
server.registerTool(
  'get_rules',
  {
    title: 'Get OliveKit house rules',
    description:
      'Get the OliveKit house design rules (the root CLAUDE.md): the non-negotiable ' +
      'law (tokens only, reuse from the registry, must pass lint:design), the house ' +
      '"Lab Instrument" look, and the list of AI tells to never produce. Read this ' +
      'before generating any UI.',
    inputSchema: {},
  },
  async () => {
    try {
      return text(await readText('CLAUDE.md'));
    } catch (err) {
      return fail(`Failed to read CLAUDE.md: ${err.message}`);
    }
  }
);

// --- Startup ---------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Intentionally silent on stdout/stderr: stdout is the JSON-RPC channel.
}

main().catch((err) => {
  // Never write to stdout (it carries protocol frames). Report on stderr and exit.
  process.stderr.write(`olivekit-mcp failed to start: ${err?.stack ?? err}\n`);
  process.exit(1);
});
