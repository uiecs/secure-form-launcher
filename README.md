# Secure Cloud Browser Signup

A browser-style signup workspace backed by a real cloud browser session.

## Architecture

- **GitHub Pages frontend:** collects only non-sensitive profile fields and calls the backend.
- **Node backend:** creates a temporary Browserbase session and connects to it with Playwright.
- **Cloud browser:** opens the official Instagram signup page and fills only email, full name, username and date of birth.
- **Manual handoff:** the user enters the password and completes CAPTCHA directly in the remote browser.

Passwords, OTPs, cookies and session tokens are not collected by this application and are not written to browser storage.

## Run the backend

```bash
cd server
cp .env.example .env
npm install
# set BROWSERBASE_API_KEY and BROWSERBASE_PROJECT_ID in .env
npm start
```

The backend exposes `POST /api/browser/session` and `GET /api/health`.

## Production deployment

Deploy `server/` to a Node-capable service and set the environment variables from `.env.example`. Set `ALLOWED_ORIGIN` to the exact frontend origin. GitHub Pages itself cannot run the Node browser-session server.

If the frontend and backend use different origins, set `window.SECURE_BROWSER_API` before `app.js` to the backend origin.

## Safety boundaries

1. Never send a password to the backend.
2. Never automate, solve or bypass CAPTCHA.
3. Never collect or persist OTPs, cookies or session tokens.
4. Browser automation is limited to navigation and non-sensitive fields.
5. The application does not claim to verify account creation or authentication.
