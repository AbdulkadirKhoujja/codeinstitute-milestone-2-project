# HTML Validation Local Check

Date: 2026-06-18

Files checked:

- `index.html`
- `404.html`

Checks completed:

| Check | Result |
| --- | --- |
| Files load in headless Edge during automated test run | Pass |
| Required favicon, stylesheet, and anchor links exist | Pass |
| `404.html` includes a clear not-found message and homepage link | Pass |
| Browser console errors while loading and testing pages | Pass, zero runtime exceptions or browser log errors captured |

Attempted external/local validator:

`npx.cmd --yes html-validate@latest index.html 404.html`

Result: The validator package download/run timed out in the local environment, so this check is not recorded as an HTML validator pass. Existing W3C screenshot evidence remains in `docs/evidence/validation/`, and final reviewer validation can be repeated against the deployed pages.
