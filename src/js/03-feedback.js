import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
};
const STORAGE_KEY = 'feedback-message';

const formData = {};

insetTextarea();

refs.form.addEventListener('input', onFormData);
refs.form.addEventListener('submit', throttle(onFormSubmit, 500));

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  JSON.parse(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);

  console.log(formData);
}

function onFormData(e) {
  formData[e.target.name] = e.target.value;

  const stringFormData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringFormData);
}

function insetTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage === null) {
    return;
  }

  refs.textarea.value = savedMessage['message'];
  refs.email.value = savedMessage['email'];
}
