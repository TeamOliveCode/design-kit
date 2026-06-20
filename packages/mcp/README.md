# @olivekit/mcp

An [MCP](https://modelcontextprotocol.io) (Model Context Protocol) server that exposes the
OliveKit design kit to AI agents over stdio. It lets an agent discover and pull components,
read the design standards, list expressions, and load the house rules — straight from this
repository's source of truth, with no network calls.

It is a **stdio** server: it speaks JSON-RPC on stdin/stdout and stays silent otherwise.

## Tools

| Tool | Args | Returns |
| --- | --- | --- |
| `list_components` | — | Every registry UI component, each with its `npx shadcn@latest add @olivekit/<name>` command. |
| `get_component` | `name` | The source files (path + full content) for one component, from `r/<name>.json`. |
| `list_standards` | — | The design standards with one-line summaries. |
| `get_standard` | `name` | The full markdown of one standard. |
| `list_expressions` | — | The expressions (instrument / warm / editorial) — same components, different soul. |
| `get_rules` | — | The OliveKit house rules (root `CLAUDE.md`). |

`get_standard` names: `composition`, `content`, `app-ui`, `landing`, `presentation`,
`components`, `anti-ai-patterns`, `governance`.

## Requirements

- Node.js >= 18 (uses `import.meta.dirname`; tested on Node 22).
- Dependencies installed at the repo root (`@modelcontextprotocol/sdk`, and its `zod` peer).
  From the repo root: `pnpm install`.

The server reads files relative to the repository root, which it derives from its own location
(`packages/mcp/` → repo root is two levels up). Run it from anywhere; the paths resolve the same.

## Run it directly

```bash
node packages/mcp/server.mjs
```

It will sit quietly waiting for an MCP client on stdio (that is the expected behavior — there is
no banner). Press Ctrl-C to stop.

## Register it in an MCP client

Point your client at the server with **command** `node` and a single **arg**: the absolute path
to `server.mjs`.

### Claude Code

```bash
claude mcp add olivekit -- node /Users/ggomma/dev/olivecode/labs/design-kit/packages/mcp/server.mjs
```

### Generic client config (Claude Desktop, Cursor, etc.)

Most clients use a JSON block like this:

```json
{
  "mcpServers": {
    "olivekit": {
      "command": "node",
      "args": ["/Users/ggomma/dev/olivecode/labs/design-kit/packages/mcp/server.mjs"]
    }
  }
}
```

Replace the path with the absolute path to `server.mjs` on your machine. Use an absolute path so
the client can launch it regardless of its own working directory.

## Notes

- The server reads files at call time, so it always reflects the current repo state — no restart
  needed after editing components, standards, or `CLAUDE.md`.
- It writes nothing to stdout except protocol frames. Startup failures are reported on stderr.
