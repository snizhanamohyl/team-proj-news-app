const dateListUl = document.querySelector('.date-list');

dateListUl.addEventListener('click', dateListUlClick);

function dateListUlClick(e) {
  if (e.target.classList.contains('date-list__btn')) {
    const cardSet = e.target.nextElementSibling;
    if (cardSet.classList.contains('card-set')) {
      cardSet.classList.toggle('visually-hidden');
    }
  }
}
