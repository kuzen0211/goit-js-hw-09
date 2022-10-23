import Notiflix from 'notiflix';

const refs = {
  btnSubmit: document.querySelector('button'),
  form: document.querySelector('form'),
  label: document.querySelectorAll('label'),
};

for (const element of refs.label) {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'flex-start';
  element.style.marginBottom = '15px';
}

refs.btnSubmit.style.padding = '5px 24px';
refs.btnSubmit.style.color = 'gery';
refs.btnSubmit.style.fontSize = '16px';

refs.form.addEventListener('submit', onFormSubmit);

const onSuccsess = (position, delay) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const onReject = (position, delay) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

function onFormSubmit(event) {
  event.preventDefault();

  const currentEvent = event.currentTarget;
  const {
    elements: { delay, step, amount },
  } = currentEvent;

  const formData = new FormData(currentEvent);
  const obj = {};

  formData.forEach((value, key) => {
    obj[key] = value;
  });

  let delValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delValue)
      .then(result => onSuccsess(result.position, result.delay))
      .catch(error => onReject(error.position, error.delay));

    delValue += stepValue;

    currentEvent.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const object = { position, delay };

      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}
