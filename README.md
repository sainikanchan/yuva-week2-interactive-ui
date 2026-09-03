# Nova — Interactive Modal Component
### Yuva Intern | Week 2 Task

## Objective
This project demonstrates a reusable interactive modal component built using semantic HTML5, CSS3 and vanilla JavaScript.

## Files
- `index.html` — semantic component structure and demo page
- `style.css` — responsive styling, modal states, transitions and reduced-motion support
- `script.js` — modal logic, DOM manipulation, events, focus management and keyboard support

## Interactive behavior
1. Click **Open Modal** to display the dialog.
2. Click **Continue** to close it and display a success message.
3. Click **Cancel** or the **X** button to close it.
4. Click the dark backdrop to close it.
5. Press **Escape** to close it.
6. Use **Tab / Shift + Tab** to keep keyboard focus inside the modal.

## Accessibility
- Uses `role="dialog"` and `aria-modal="true"`.
- Uses `aria-labelledby` and `aria-describedby`.
- Close button has an accessible `aria-label`.
- Focus moves into the dialog when it opens and returns to the trigger when it closes.
- Keyboard focus is trapped inside the dialog while it is open.
- Escape closes the dialog.
- `aria-live="polite"` provides feedback after actions.
- `prefers-reduced-motion` is respected.

## Error handling / fallback
The JavaScript checks that all required elements exist before initialization and logs a useful error instead of throwing when the component markup is incomplete. A `<noscript>` message explains that JavaScript is required for the interactive behavior.

## How to test
Open `index.html` in a modern browser. Test both mouse and keyboard interaction. Resize the browser to confirm the modal remains usable on mobile-sized screens.

No frameworks or external dependencies are required.
