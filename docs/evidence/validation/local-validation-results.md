# Local Validation Results

These are local checks run during Part 2. They are not official W3C Validator or Lighthouse results.

| Check | Command | Result |
| --- | --- | --- |
| JavaScript syntax | `node --check assets/js/script.js` | Pass, no syntax errors reported |
| CSS brace balance | PowerShell count of `{` and `}` in `assets/css/style.css` | Pass, 82 opening braces and 82 closing braces |
| Accessibility markup spot check | `Select-String` for `aria-live`, `aria-atomic`, `role="status"`, `aria-keyshortcuts` | Pass, expected ARIA attributes found in `index.html` |
| Lower-case file naming spot check | PowerShell scan for uppercase, underscores, or spaces in file names | `README.md` reported only; this is the conventional required project README filename |

Official HTML/CSS validation screenshots and Lighthouse reports have since been generated and embedded in `README.md`.
