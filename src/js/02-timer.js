import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
btnStart.addEventListener('click', onBtnClick);
const onDaysValue = document.querySelector('span[data-days]');
const onHoursValue = document.querySelector('span[data-hours]');
const onMinutesValue = document.querySelector('span[data-minutes]');
const onSecondsValue = document.querySelector('span[data-seconds]');
btnStart.setAttribute('disabled', 'disabled');

let startTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0];
    let currrentDate = options.defaultDate;

    if (startTime < currrentDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

function onBtnClick() {
  btnStart.setAttribute('disabled', 'disabled');
  const timeId = setInterval(() => {
    let difTime;
    const newCurrrentDate = new Date();
    difTime = startTime - newCurrrentDate;
    const componentsTime = convertMs(difTime);
    putDate(componentsTime);

    console.log(componentsTime);
    if (difTime < 500) {
      clearInterval(timeId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function putDate({ days, hours, minutes, seconds }) {
  onDaysValue.textContent = days;
  onHoursValue.textContent = hours;
  onMinutesValue.textContent = minutes;
  onSecondsValue.textContent = seconds;
}
