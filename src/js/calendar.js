// Calendar open/hide
import filterByDate from './date-filter';
// Get refs

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  modal: document.querySelector('[data-modal]'),
  input: document.querySelector('.calendar-input'),
  arrow: document.querySelector('.calendar__button-arrow'),
  calendarBtn: document.querySelector('.calendar__button-calendar'),
};

// Add EventListener

refs.openModalBtn.addEventListener('click', toggleModal);
window.addEventListener('click', hideModals);

// Change styles on icons and hide calendar-wrapper

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-wrapper');
  refs.input.classList.toggle('is-active');
  refs.arrow.classList.toggle('switched');
  refs.calendarBtn.classList.toggle('switched-color');
}

function hideModals(evt) {
  if (evt.target.closest('.calendar-form')) {
    return;
  }

  if (refs.input.classList.contains('is-active')) {
    changeStyleOfHiddingCalendar();
  }
}

function changeStyleOfHiddingCalendar() {
  refs.modal.classList.add('is-hidden-wrapper');
  refs.input.classList.remove('is-active');
  refs.arrow.classList.remove('switched');
  refs.calendarBtn.classList.remove('switched-color');
}

// Rendered Calendar

const daysTag = document.querySelector('.days');
const currentDate = document.querySelector('.current-date');
const prevNextIcon = document.querySelectorAll('.calendar-icons span');
const nextYearIcon = document.querySelector('.calendar__button-next');
const prevYearIcon = document.querySelector('.calendar__button-prev');

// getting new date, current year and month
let date = new Date(),
  currDay = date.getDate(),
  currMonth = date.getMonth(),
  currYear = date.getFullYear();

// storing full name of all months in array
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const renderCalendar = number => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liTag = '';

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li ><button class="inactive" disabled>${
      lastDateofLastMonth - i + 1
    }</button></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();
    //   ? 'active'
    //   : '';
    liTag += `<li><button class="${isToday}">${i}</button></li>`;
    //console.log(isToday);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li ><button class="inactive" disabled>${
      i - lastDayofMonth + 1
    }</button></li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
  // console.log(liTag);
};

renderCalendar();

prevNextIcon.forEach(icon => {
  // getting prev and next icons
  icon.addEventListener('click', () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function

    paginationForMonth();
  });
});

// pagination for years
nextYearIcon.addEventListener('click', incrementYear);
prevYearIcon.addEventListener('click', decrementYear);

function incrementYear() {
  if (currYear) {
    currYear += 1;
  }
  renderCalendar(); // calling renderCalendar function

  paginationForMonth();
}

function decrementYear() {
  if (currYear) {
    currYear -= 1;
  }
  renderCalendar(); // calling renderCalendar function

  paginationForMonth();
}

// pagination for months
function paginationForMonth() {
  // take day from localStorage
  let selectedDay = JSON.parse(localStorage.getItem('day'));
  let daysArray = daysTag.childNodes;
  daysArray.forEach(elem => {
    if (elem.textContent === selectedDay) {
      elem.children[0].classList.add('active');
    }
  });
}

// change day on click and show selected day in input

let selectedInputDate = null;
let selectedValueDay = null;

daysTag.addEventListener('click', evt => {
  [...evt.currentTarget.children].forEach(item => {
    item.children[0].classList.remove('active');
  });

  selectedValueDay = evt.target.textContent;

  evt.target.classList.add('active');

  let month = (currMonth + 1).toString();

  refs.input.value =
    currYear +
    '/' +
    month.padStart(2, '0') +
    '/' +
    selectedValueDay.padStart(2, '0');

  selectedInputDate = refs.input.value;
  filterByDate(selectedInputDate);

  localStorage.setItem('day', JSON.stringify(selectedValueDay));
  localStorage.setItem('date', JSON.stringify(selectedInputDate));

  changeStyleOfHiddingCalendar();
});

localStorage.removeItem('day');
localStorage.removeItem('date');
