const introStep = document.getElementById('introStep');
const captchaStep = document.getElementById('captchaStep');
const continueButton = document.getElementById('continueButton');
const backButton = document.getElementById('backButton');
const confirmButton = document.getElementById('confirmButton');
const introStatus = document.getElementById('introStatus');
const captchaStatus = document.getElementById('captchaStatus');
const instagramUrl = 'https://www.instagram.com/accounts/login/';

function openInstagram() {
  const opened = window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  if (!opened) {
    introStatus.textContent = 'Instagram could not be opened automatically. Use the Open Instagram button on the next screen.';
  }
}

continueButton?.addEventListener('click', () => {
  introStatus.textContent = '';
  introStep?.classList.add('hidden');
  captchaStep?.classList.remove('hidden');
  captchaStep?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  openInstagram();
});

backButton?.addEventListener('click', () => {
  captchaStep?.classList.add('hidden');
  introStep?.classList.remove('hidden');
  introStatus.textContent = '';
  continueButton?.focus();
});

confirmButton?.addEventListener('click', () => {
  captchaStatus.textContent = 'Acknowledged locally. CAPTCHA completion is not verified by this tool.';
});
