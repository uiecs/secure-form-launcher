const API_BASE = window.SECURE_BROWSER_API || '';
const SIGNUP_URL = 'https://www.instagram.com/accounts/emailsignup/';

const $ = (id) => document.getElementById(id);
const state = { sessionId: null };

function values() {
  return {
    email: $('email').value.trim(),
    fullName: $('fullName').value.trim(),
    username: $('username').value.trim(),
    dob: $('dob').value
  };
}

function setConnection(text, live = false) {
  $('connection').textContent = text;
  $('connection').style.color = live ? '#9fe6b2' : '';
}

function setError(message = '') { $('error').textContent = message; }

async function startBrowser() {
  setError('');
  const data = values();
  if (!data.email) { setError('Email is required.'); return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) { setError('Enter a valid email.'); return; }

  $('start').disabled = true;
  $('start').textContent = 'Starting…';
  try {
    const response = await fetch(`${API_BASE}/api/browser/session`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ...data, targetUrl: SIGNUP_URL })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Unable to start browser session.');
    state.sessionId = payload.sessionId;
    $('empty').classList.add('hidden');
    $('browser').classList.remove('hidden');
    $('url').textContent = SIGNUP_URL;
    $('status').textContent = payload.status || 'Browser ready. Enter password and CAPTCHA manually.';
    $('live').href = payload.liveUrl || '#';
    if (!payload.liveUrl) $('live').style.display = 'none';
    $('viewer').src = payload.viewerUrl || payload.liveUrl || 'about:blank';
    setConnection('Cloud browser connected', true);
  } catch (error) {
    setError(error.message);
    setConnection('Disconnected');
  } finally {
    $('start').disabled = false;
    $('start').textContent = 'Start cloud browser';
  }
}

$('start').addEventListener('click', startBrowser);
$('clear').addEventListener('click', () => {
  ['email','fullName','username','dob'].forEach(id => $(id).value = '');
  setError('');
});