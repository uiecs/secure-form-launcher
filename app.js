const passwordStep = document.getElementById('passwordStep');
const captchaStep = document.getElementById('captchaStep');
const password = document.getElementById('password');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const openButton = document.getElementById('openButton');
const confirmButton = document.getElementById('confirmButton');
const passwordStatus = document.getElementById('passwordStatus');
const captchaStatus = document.getElementById('captchaStatus');

const INSTAGRAM_SIGNUP = 'https://www.instagram.com/accounts/emailsignup/';

function openInstagram() {
  window.open(INSTAGRAM_SIGNUP, '_blank', 'noopener,noreferrer');
}

nextButton.addEventListener('click', () => {
  if (!password.value) {
    passwordStatus.textContent = 'Enter your password to continue.';
    password.focus();
    return;
  }
  passwordStatus.textContent = '';
  passwordStep.classList.add('hidden');
  captchaStep.classList.remove('hidden');
  openInstagram();
});

backButton.addEventListener('click', () => {
  captchaStatus.textContent = '';
  captchaStep.classList.add('hidden');
  passwordStep.classList.remove('hidden');
  password.focus();
});

openButton.addEventListener('click', openInstagram);

confirmButton.addEventListener('click', () => {
  captchaStatus.textContent = 'CAPTCHA completion noted. Continue in the Instagram tab if another security check appears.';
  password.value = '';
});

window.addEventListener('pagehide', () => {
  password.value = '';
});