// Calendar open/hide

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
    refs.modal.classList.add('is-hidden-wrapper');
    refs.input.classList.remove('is-active');
    refs.arrow.classList.remove('switched');
    refs.calendarBtn.classList.remove('switched-color');
  }
}

// Rendered Calendar

const daysTag = document.querySelector('.days'),
  currentDate = document.querySelector('.current-date'),
  prevNextIcon = document.querySelectorAll('.calendar-icons span'),
  nextYearIcon = document.querySelector('.calendar__button-next');

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
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
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
    liTag += `<li class="${isToday}">${i}</li>`;
    //console.log(isToday);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
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
nextYearIcon.addEventListener('click', () => {
  if (currYear) {
    currYear += 1;
  }
  renderCalendar(); // calling renderCalendar function

  paginationForMonth();
});

// pagination for months
function paginationForMonth() {
  // take day from localStorage
  let selectedDay = JSON.parse(localStorage.getItem('day'));
  let daysArray = daysTag.childNodes;
  //console.log(daysArray);
  daysArray.forEach(elem => {
    if (elem.textContent === selectedDay) {
      // console.log(elem.textContent);
      elem.classList.add('active');
    }
  });
}

// change day on click and show selected day in input

let selectedInputDate = null;
let selectedValueDay = null;

daysTag.addEventListener('click', evt => {
  [...evt.currentTarget.children].forEach(item => {
    item.classList.remove('active');
  });

  // !!!!!!!!!!!!!!!!!!!
  let selectedValueDay = evt.target.textContent;
  // console.log("🚀 ~ selectedValueDay", selectedValueDay)

  evt.target.classList.add('active');

  let month = (currMonth + 1).toString();

  refs.input.value =
    selectedValueDay.padStart(2, '0') +
    '/' +
    month.padStart(2, '0') +
    '/' +
    currYear;

  // !!!!!!!!!!!!!!!!!!!!!
  let selectedInputDate = refs.input.value;
  // console.log(selectedInputDate);

  localStorage.setItem('day', JSON.stringify(selectedValueDay));
  localStorage.setItem('date', JSON.stringify(selectedInputDate));

  refs.modal.classList.add('is-hidden-wrapper');
  refs.input.classList.remove('is-active');
  refs.arrow.classList.remove('switched');
  refs.calendarBtn.classList.remove('switched-color');
});

localStorage.removeItem('day');
localStorage.removeItem('date');
