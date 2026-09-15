const passwordStep=document.getElementById('passwordStep');
const captchaStep=document.getElementById('captchaStep');
const password=document.getElementById('password');
const nextButton=document.getElementById('nextButton');
const backButton=document.getElementById('backButton');
const openButton=document.getElementById('openButton');
const confirmButton=document.getElementById('confirmButton');
const passwordStatus=document.getElementById('passwordStatus');
const captchaStatus=document.getElementById('captchaStatus');

nextButton.addEventListener('click',()=>{
  if(!password.value){passwordStatus.textContent='ابتدا رمز عبور را وارد کنید.';password.focus();return;}
  passwordStatus.textContent='';
  passwordStep.classList.add('hidden');
  captchaStep.classList.remove('hidden');
});

backButton.addEventListener('click',()=>{
  captchaStatus.textContent='';
  captchaStep.classList.add('hidden');
  passwordStep.classList.remove('hidden');
  password.focus();
});

openButton.addEventListener('click',()=>{
  window.open('https://www.instagram.com/accounts/signup/','_blank','noopener,noreferrer');
  captchaStatus.textContent='مرورگر باز شد؛ CAPTCHA را دستی تکمیل کنید.';
});

confirmButton.addEventListener('click',()=>{
  captchaStatus.textContent='تأیید شد. ادامه فرایند را می‌توان از طریق مرورگر انجام داد.';
  password.value='';
});

window.addEventListener('pagehide',()=>{password.value='';});