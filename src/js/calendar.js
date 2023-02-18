// Calendar open/hide

// get refs
const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('body'),
  modal: document.querySelector('[data-modal]'),
  input: document.querySelector('.calendar-input'),
  arrow: document.querySelector('.calendar__button-arrow'),
  calendarBtn: document.querySelector('.calendar__button-calendar'),
};

// added addEventListener
refs.openModalBtn.addEventListener('click', toggleModal);
document.addEventListener('click', hideModals);

//   function cleanInput() {
//     refs.input.classList.remove('is-active');
//   }

function toggleModal() {
  refs.modal.classList.toggle('is-hidden-wrapper');
  refs.input.classList.toggle('is-active');
  refs.arrow.classList.toggle('switched');
  refs.calendarBtn.classList.toggle('switched-color');
  // showCurrentDate();
}

function hideModals(evt) {
  let dataValue = document.getElementById('input-picker').value;
  if (evt.target.closest('.calendar-form')) {
    return;
  }
  if (refs.input.classList.contains('is-active')) {
    refs.modal.classList.add('is-hidden-wrapper');
    refs.input.classList.remove('is-active');
    refs.arrow.classList.remove('switched');
    refs.calendarBtn.classList.remove('switched-color');
    document.getElementById('input-picker').value = '';
    localStorage.removeItem('VALUE');
    localStorage.removeItem('date');
  }
}

// Rendered Calendar
