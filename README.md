# Secure Form Launcher

A static, browser-style preparation workspace for an Instagram signup handoff. It helps a user prepare **non-sensitive** signup details, then opens the official Instagram signup page for the actual registration.

> **Independent utility:** This project is not affiliated with, endorsed by, or operated by Instagram or Meta.

## What it does

- Browser-like, app-style responsive interface.
- Prepares optional email, full name, username, and date of birth fields in page memory only.
- Opens the official Instagram signup URL in a new tab.
- Keeps passwords, OTPs, recovery codes, session cookies, and authentication tokens completely outside this app.
- Leaves CAPTCHA and security challenges to the user on Instagram.
- Works as a static GitHub Pages site with no backend or runtime dependency.

## What it deliberately does not do

This site is **not** an Instagram signup bot. It does not automate registration, submit Instagram forms, solve or bypass CAPTCHA, capture credentials, extract cookies, or handle authentication tokens. Instagram may change its signup flow at any time; this utility does not claim to verify the resulting account or security checks.

## Flow

1. Enter only optional non-sensitive details in the local preparation form.
2. Click **Open guided browser**.
3. The app shows a browser-style handoff panel and opens Instagram's official signup page.
4. Enter the password only on Instagram.
5. Complete CAPTCHA/security checks yourself if Instagram requests them.
6. Finish the registration on Instagram.
7. The local **I finished on Instagram** control is only an acknowledgement; it does not verify success.

## Security & Privacy

- No `localStorage`, `sessionStorage`, application cookies, analytics, or remote API calls are used by the application.
- Form values are held only in JavaScript memory while the page is open and disappear on refresh/navigation.
- No password field exists in the app.
- No OTP, recovery code, session token, or authentication cookie is requested or processed.
- No API key or secret belongs in this frontend.
- A restrictive Content Security Policy blocks external scripts, frames, forms, and network connections from the app.
- The external Instagram window is opened with `noopener,noreferrer`.

## GitHub Pages

The project is plain HTML/CSS/JavaScript. Deploy the repository root from the `main` branch in **Settings → Pages**. Relative assets (`styles.css` and `app.js`) are used so project-site paths remain compatible.

## Files

```text
index.html   # semantic UI and browser-style handoff
styles.css   # responsive visual system and accessibility states
app.js       # local form state and official-site navigation
README.md    # security, flow, deployment and limitations
```

## Local run

Open `index.html` in a modern browser, or serve the directory with any static HTTP server. No Node.js runtime is required.

## Limitations

- Instagram can change URLs, registration requirements, or anti-abuse checks.
- A new tab can be blocked by browser popup settings.
- The app cannot and should not verify CAPTCHA completion or Instagram authentication state.
- The app cannot embed Instagram signup because third-party sites can restrict framing; the safe handoff is a real browser tab.

## Future improvements

- Add automated HTML/accessibility checks in CI without collecting user data.
- Add localization while preserving the same security boundaries.
- Add a small static test suite for UI state transitions and external-link behavior.
