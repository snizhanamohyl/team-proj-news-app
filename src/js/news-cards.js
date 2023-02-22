const MAX_LENGTH_TEXT = 112;

function editingLangthString(MAX_LENGTH_TEXT) {
  const textEl = document.querySelectorAll('.news-card__text');
  const filteredArr = Array.from(textEl).filter(elem => {
    return elem.textContent.length >= MAX_LENGTH_TEXT;
  });
  const filteredText = filteredArr.forEach(elem => {
    const textValue = elem.textContent.slice(0, MAX_LENGTH_TEXT);
    return (elem.textContent = textValue + '...');
  });
}

setInterval(() => {
  editingLangthString(MAX_LENGTH_TEXT);
}, 500);

/////////////////////////////////////////////////////////////////

const ACTIVE_ICON = '<i class="fa-solid fa-heart"></i>';
const INACTIVE_ICON = '<i class="fa-regular fa-heart"></i>';
const cardSetEl = document.querySelector('.card-set');

cardSetEl.addEventListener('click', onChangeIconFavorite);

function onChangeIconFavorite(e) {

  if (
    e.target.nodeName !== 'BUTTON' &&
    e.target.nodeName !== 'I' &&
    e.target.nodeName !== 'A'
  ) {
    return;
  }
  
  if (e.target.nodeName === 'BUTTON') {
    const btnEl = e.target;
    btnEl.classList.toggle('is-selected');

    if (btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = addActiveStatus();
    }

    if (!btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = removeActiveStatus();
    }
  }
  if (e.target.nodeName === "I") {
    const iEl = e.target;
    const btnEl = iEl.parentNode;
    btnEl.classList.toggle('is-selected')
      if (btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = addActiveStatus();
    }

    if (!btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = removeActiveStatus();
    }
  }


  if (e.target.nodeName === 'A') {
    const linkEl = e.target;

    const articleEl = linkEl.closest('article');
    const textInform = articleEl.childNodes[1].children[2];
    textInform.style.opacity = '1';

    const imageEl = articleEl.childNodes[1].children[0].children[0];
    imageEl.classList.add('is-hidden');

    const titelEl = articleEl.childNodes[3];
    titelEl.classList.add('is-hidden');

    const textEl = articleEl.childNodes[5];
    textEl.classList.add('is-hidden');

    const dateEl = articleEl.childNodes[7];
    dateEl.classList.add('is-hidden');
  }
}

function addActiveStatus() {
  return `Remove from favorite ${ACTIVE_ICON}`;
}

function removeActiveStatus() {
  return `Add to favorite ${INACTIVE_ICON}`;
}

export { addActiveStatus, removeActiveStatus };
