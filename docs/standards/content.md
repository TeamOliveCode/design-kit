# Content & voice standard

> Copy is design material. Carbon's model: prefer objective rules over subjective taste, because "important words" and "specialness" are subjective and drift across an org. Agent-followable.

## Voice

Plain, direct, confident. Write from the user's side of the screen: name things by what people control, not how the system is built ("Notifications", not "Webhook config"). Active voice. Say what an action does, plainly; specific beats clever.

## Capitalization

**Sentence case** for headings, labels, buttons, and menu items (capitalize the first word + proper nouns only). Exceptions: product names, brand names, trademarks, and acronyms keep their own casing. Do **not** use Title Case or ALL-CAPS for sans headings (mono spec labels / `text-overline` may be uppercase, used sparingly).

## Action labels (controlled vocabulary)

A button keeps the same verb through the whole flow: a `Publish` button produces a "Published" toast.

| Use | Not |
|---|---|
| Log in / Log out | Sign in / Sign out |
| Start | Launch |
| Back | Previous |
| Apply | Save changes (when it is not a true save) |
| Delete | Remove (for permanent destruction) |
| Save | Submit (for forms that persist) |

One clear verb per action. Avoid vague "OK" / "Submit" where a real verb fits.

## Banned marketing clichés (the lint also flags some)

leverage, elevate, unlock, navigate, robust, seamless, transformative, effortless, pivotal, paradigm, supercharge, revolutionize. Replace with the plain thing it does. Avoid em-dashes (—) and middle-dots (·) as separators, throat-clearing openers, and gerund clusters (highlighting / showcasing / fostering / leveraging / ensuring).

## State copy (design every non-happy path)

- **Empty:** explain what goes here and the one action to fill it. An empty screen is an invitation, not a dead end. ("No experiments yet. Start your first run.")
- **Loading:** a `Skeleton` of the real layout, not a spinner-on-blank where possible.
- **Error:** say what went wrong and how to fix it, in the interface's voice — never apologize, never vague. ("Couldn't reach the registry. Check your token and retry.")
- **Success:** confirm in the same vocabulary as the action ("Published.").

## i18n resilience

Localized text runs ~50% longer on average and short labels can grow up to ~300%. Never hard-size text containers to the English string; let buttons/labels wrap or truncate gracefully. Use logical properties (`ms-*`/`me-*`, `ps-*`/`pe-*`) so RTL works. Korean and CJK render in Pretendard (the font stack handles fallback).
