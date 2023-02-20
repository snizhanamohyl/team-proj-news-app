const MAX_LENGTH_TEXT = 112;


function editingLangthString( MAX_LENGTH_TEXT) {
  const textEl = document.querySelectorAll('.news-card__text');
  const filteredArr = Array.from(textEl).filter(elem => {
    return elem.textContent.length >= MAX_LENGTH_TEXT;
  });
  const filteredText = filteredArr.forEach(elem => {
    const textValue = elem.textContent.slice(0, MAX_LENGTH_TEXT);
    return (elem.textContent = textValue + '...');
  });
}

 setInterval(() => { editingLangthString( MAX_LENGTH_TEXT) },500) 

/////////////////////////////////////////////////////////////////

//  74cebf96


let timeridSvgIcon = null;

timeridSvgIcon = setInterval(() => {
  const svgEl = document.querySelectorAll(".icon-js");
  const arrSvg = Array.from(svgEl);

  arrSvg.forEach(svg => {
    return svg.href.baseVal = "/sprite.74cebf96.svg#icon-icons-heart-no-active";
  });
}, 500);
  
// 74cebf96
const ACTIVE_ICON = './sprite.74cebf96.svg#icon-icons-heart-active';
const INACTIVE_ICON = './sprite.74cebf96.svg#icon-icons-heart-no-active';
const cardSetEl = document.querySelector('.card-set');

cardSetEl.addEventListener('click', onChangeIconFavorite);

function onChangeIconFavorite(e) {
  clearInterval(timeridSvgIcon);

  if (
    e.target.nodeName !== 'BUTTON' &&
    e.target.nodeName !== 'svg' &&
    e.target.nodeName !== 'use' &&
    e.target.nodeName !== "A"
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

  if (e.target.nodeName === 'A') {
    const linkEl = e.target;

    const articleEl = linkEl.closest('article');
    const textInform = articleEl.childNodes[1].children[2];
    textInform.style.opacity = "1";

    const imageEl = articleEl.childNodes[1].children[0].children[0];
    imageEl.classList.add("is-hidden");

    const titelEl = articleEl.childNodes[3];
    titelEl.classList.add("is-hidden");

    const textEl = articleEl.childNodes[5];
    textEl.classList.add("is-hidden");

    const dateEl = articleEl.childNodes[7];
    dateEl.classList.add("is-hidden");
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




