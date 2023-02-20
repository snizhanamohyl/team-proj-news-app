const MAX_LENGTH_TEXT = 112;
const textEl = document.querySelectorAll('.news-card__text');

function editingLangthString(textEl, MAX_LENGTH_TEXT) {
  const filteredArr = Array.from(textEl).filter(elem => {
    return elem.textContent.length >= MAX_LENGTH_TEXT;
  });
  const filteredText = filteredArr.forEach(elem => {
    const textValue = elem.textContent.slice(0, MAX_LENGTH_TEXT);
    return (elem.textContent = textValue + '...');
  });
}

editingLangthString(textEl, MAX_LENGTH_TEXT);

/////////////////////////////////////////////////////////////////

const ACTIVE_ICON = './sprite.74cebf96.svg#icon-icons-heart-active';
const INACTIVE_ICON = './sprite.74cebf96.svg#icon-icons-heart-no-active';
const cardSetEl = document.querySelector('.card-set');

cardSetEl.addEventListener('click', onChangeIconFavorite);

function onChangeIconFavorite(e) {
  if (
    e.target.nodeName !== 'BUTTON' &&
    e.target.nodeName !== 'svg' &&
    e.target.nodeName !== 'use'
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

  if (e.target.nodeName === 'svg') {
    const svgEl = e.target;
    const btnEl = svgEl.parentNode;
    btnEl.classList.toggle('is-selected');

    if (btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = addActiveStatus();
    }

    if (!btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = removeActiveStatus();
    }
  }

  if (e.target.nodeName === 'use') {
    const useEl = e.target;
    const btnEl = useEl.closest('button');
    btnEl.classList.toggle('is-selected');

    if (btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = addActiveStatus();
    }

    if (!btnEl.classList.contains('is-selected')) {
      btnEl.innerHTML = removeActiveStatus();
    }
  }
}

function addActiveStatus() {
  return `Remove from favorite <svg class="favorite-btn__icon" width="16" height="16">
            <use class="icon-js" href="${ACTIVE_ICON}"></use></svg>`;
}

function removeActiveStatus() {
  return `Add to favorite <svg class="favorite-btn__icon" width="16" height="16">
            <use class="icon-js" href="${INACTIVE_ICON}"></use></svg>`;
}

export { cardSetEl };

// ///////////////////////////////////////////////////////////////////////

// const linkEl = document.querySelectorAll('.news-card__link');

// const linkArr = Array.from(linkEl).forEach(link => {
//     link.addEventListener("click", onReadАrticle);
// })

// function onReadАrticle(e) {
//     const currentLink = e.target;

//     const currentArticle = currentLink.closest("article");
//     currentArticle.classList.add("is-hidden");
// }
