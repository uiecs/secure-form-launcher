const API_BASE = window.SECURE_BROWSER_API || '';
const SIGNUP_URL = 'https://www.instagram.com/accounts/emailsignup/';

const $ = (id) => document.getElementById(id);
const state = { sessionId: null };

const defaults = {
  email: '',
  fullName: 'Demo User',
  username: 'demo_user',
  dob: '2000-01-01'
};

function applyDefaults() {
  Object.entries(defaults).forEach(([id, value]) => {
    const el = $(id);
    if (el && !el.value) el.value = value;
  });
}

function values() {
  return {
    email: $('email')?.value.trim() || '',
    fullName: $('fullName')?.value.trim() || '',
    username: $('username')?.value.trim() || '',
    dob: $('dob')?.value || ''
  };
}

function setError(message = '') { $('error').textContent = message; }

async function startBrowser() {
  setError('');
  const data = values();
  if (!data.fullName || !data.username || !data.dob) {
    setError('Complete the profile fields first.');
    return;
  }

  $('start').disabled = true;
  $('start').textContent = 'Starting...';

  try {
    const response = await fetch(`${API_BASE}/api/browser/session`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({...data, targetUrl: SIGNUP_URL})
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Unable to start browser session.');

    state.sessionId = payload.sessionId;
    $('empty')?.classList.add('hidden');
    $('browser')?.classList.remove('hidden');
    $('url').textContent = SIGNUP_URL;
    $('status').textContent = payload.status || 'Browser ready. Enter password and CAPTCHA manually.';
    $('viewer').src = payload.viewerUrl || payload.liveUrl || 'about:blank';
  } catch (err) {
    setError(err.message);
  } finally {
    $('start').disabled = false;
    $('start').textContent = 'Start cloud browser';
  }
}

$('start')?.addEventListener('click', startBrowser);
$('clear')?.addEventListener('click', () => {
  ['email','fullName','username','dob'].forEach(id => { const el=$(id); if(el) el.value=''; });
  setError('');
});

applyDefaults();
