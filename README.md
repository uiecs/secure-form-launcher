# Secure Form Launcher

A small, static web utility that provides a clear, user-controlled handoff to the official Instagram website.

> **Independent utility:** This project is not affiliated with, endorsed by, or operated by Instagram or Meta.

## Features

- Mobile-first, responsive dark UI
- Direct link to Instagram login
- No password or credential input inside the tool
- No credential storage, logging, cookies, localStorage, or sessionStorage
- Manual CAPTCHA/security-check flow only
- No CAPTCHA solving, bypassing, or automation
- GitHub Pages compatible; no runtime backend or build service required

## Flow

1. The utility explains the security model and presents **Continue to Instagram**.
2. The user is sent to `https://www.instagram.com/accounts/login/` and interacts directly with Instagram.
3. If Instagram presents a CAPTCHA or security challenge, the user completes it themselves on Instagram.
4. The utility can record only a local acknowledgement that the user says they completed the check. It does **not** verify the CAPTCHA result or access Instagram session state.

## Security

The application intentionally does not provide a password field. Instagram credentials, OTP/verification codes, session cookies, access tokens, API keys, and other authentication material are not requested, collected, stored, extracted, or transmitted by this project.

The frontend uses a restrictive Content Security Policy, same-origin script/style loading, `no-referrer`, and `noopener,noreferrer` for the external Instagram link. There are no external scripts, analytics SDKs, or third-party runtime dependencies.

## Privacy

This static site does not send application data to a backend. It does not use `localStorage`, `sessionStorage`, application cookies, analytics, or remote logging. Browser and operating-system behavior outside this site's control may still apply.

## CAPTCHA and Security Checks

CAPTCHA and other Instagram security checks are handled exclusively by the user on Instagram. The project does not solve, bypass, automate, or claim to verify these checks.

## Run locally

Open `index.html` in a modern browser, or serve the directory with any static HTTP server. No Node.js runtime is required.

## Deploy on GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Select the `main` branch and the repository root (`/`) as the deployment source.
4. Save the configuration and wait for the Pages build to finish.
5. Open the generated HTTPS Pages URL.

The project uses relative local assets, so it works under a repository project path such as `/secure-form-launcher/`.

## Project structure

```text
.
├── index.html   # Semantic UI and security metadata
├── styles.css   # Responsive visual system
├── app.js       # Minimal navigation and Instagram handoff
└── README.md    # Project, deployment, privacy, and security documentation
```

## Limitations

- This utility cannot confirm whether Instagram accepted a CAPTCHA or security challenge.
- It cannot inspect Instagram authentication state, cookies, tokens, or private account data.
- GitHub Pages is static hosting; there is intentionally no server-side credential or secret storage.
- A browser may block a new tab/window; the UI provides a direct Instagram link as a fallback.

## Future improvements

- Add automated static HTML/accessibility checks in CI without collecting user data.
- Add a small privacy/security regression test suite for the frontend source.
- Improve localization while preserving the same security guarantees.
