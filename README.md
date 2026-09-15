# Secure Form Launcher

A lightweight, app-like two-step UI for a user-controlled browser flow.

## Flow
1. User enters the password locally in the first screen.
2. The password is never sent to a backend and is cleared when the page is left or after confirmation.
3. The second screen provides a standard browser-like surface and opens Instagram signup in a normal browser window.
4. CAPTCHA is completed manually by the user.
5. The app does not solve, bypass, or automate CAPTCHA/security checks.

## Run
Open `index.html` in a modern browser or serve the directory with any static HTTP server.

## Security notes
- Do not add analytics, logging, localStorage, sessionStorage, or remote password APIs.
- Do not collect CAPTCHA answers or verification codes.
- The browser integration must preserve the user's direct interaction with Instagram's security controls.
