// Calendar open/hide

// get refs
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  modal: document.querySelector('[data-modal]'),
  input: document.querySelector('.calendar-input'),
  arrow: document.querySelector('.calendar__button-arrow'),
  calendarBtn: document.querySelector('.calendar__button-calendar'),
};

// added addEventListener
refs.openModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-wrapper');
  refs.input.classList.toggle('is-active');
  refs.arrow.classList.toggle('switched');
  refs.calendarBtn.classList.toggle('switched-color');
}

// Rendered Calendar
