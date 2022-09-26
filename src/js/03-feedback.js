import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
};
const STORAGE_KEY = 'feedback-message';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormData, 500));

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();

  const parseData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('data:', parseData);

  localStorage.removeItem(STORAGE_KEY);
}

function onFormData() {
  const formData = {
    email: refs.email.value,
    message: refs.textarea.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

insetData();

function insetData() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage !== null) {
    refs.textarea.value = savedMessage.message;
    refs.email.value = savedMessage.email;
  }
}
