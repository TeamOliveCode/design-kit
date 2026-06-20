# @olivekit/web-components

Framework-agnostic OliveKit components as **web components** (Lit custom elements). They read the same OliveKit CSS variables as the React components, so the house look reaches **Vue, Svelte, Angular, server-rendered HTML, or no framework at all**. This is the cross-stack component layer (the Adobe Spectrum SWC model): one token contract, components anywhere.

## Use

```html
<link rel="stylesheet" href="@olivekit/tokens/css" />   <!-- or any expression bundle -->
<script type="module" src="@olivekit/web-components"></script>

<ok-button>Get started</ok-button>
<ok-button variant="outline">Docs</ok-button>
<ok-badge variant="success">Active</ok-badge>
<ok-input placeholder="Search"></ok-input>
```

Because tokens are CSS custom properties (which inherit through the shadow DOM), switching the expression (`<html class="dark">`, or an `.expr-warm` wrapper) restyles the web components too. Korean renders in Pretendard via the shared font stack.

See `demo.html` for a runnable, self-contained example (`<ok-button>`, `<ok-badge>`, `<ok-input>`, `<ok-card>`). The four core elements prove the pattern; the remaining components follow the same Lit + token-variable approach.
