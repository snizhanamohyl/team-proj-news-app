import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addActiveStatus } from './js/news-cards';

const cardsContainerRef = document.querySelector('#favorites-card-set');
const noResultsRef = document.querySelector('#img-noresults');
const savedFavorites = localStorage.getItem('favorites');
const favoriteCardsArray = [];

getFavoritesFromLS();
showFavoritesNews();
updateRefs();
changeBtnState();

function updateRefs() {
  setInterval(() => {
    const cardRef = document.querySelectorAll('.news-card');
    cardRef.forEach(card => {
      card.addEventListener('click', onClick);
    });
  }, 200);
}

function onClick(evt) {
  if (
    evt.target.nodeName === 'BUTTON' &&
    evt.target.classList.contains('is-selected')
  ) {
    const cardMarkUp = evt.currentTarget.outerHTML;
    const cardTitle = evt.currentTarget.querySelector('.news-card__title');
    const cardObj = {
      title: cardTitle.innerText,
      markup: cardMarkUp,
    };
    removeCardFromFavorites(searchCardInLS(cardObj.title));
  } else if (evt.target.nodeName === 'BUTTON') {
    const cardMarkUp = evt.currentTarget.outerHTML;
    const cardTitle = evt.currentTarget.querySelector('.news-card__title');
    const cardObj = {
      title: cardTitle.innerText,
      markup: cardMarkUp,
    };
    renderMarkup(cardObj);
  }
}

function renderMarkup(cardMarkup) {
  favoriteCardsArray.push(cardMarkup);
  saveFavoritesToLS(favoriteCardsArray);
}

function saveFavoritesToLS(current) {
  localStorage.setItem('favorites', JSON.stringify(current));
}

function getFavoritesFromLS() {
  try {
    const parsedFavorites = JSON.parse(savedFavorites);
    parsedFavorites.forEach(obj => favoriteCardsArray.push(obj));
  } catch (error) {
    // Notify.info('Favorites list is empty');
  }
}

function showFavoritesNews() {
  try {
    if (cardsContainerRef) {
      if (favoriteCardsArray.length === 0) {
        noResultsRef.style = 'display: block';
      }
      markUpFavoriteNews();
      enableBtn();
    }
  } catch (error) {
    Notify.error('Failed to markup your favorites news');
  }
}

function markUpFavoriteNews() {
  const markupArr = favoriteCardsArray.reduce((arr, { markup }) => {
    return arr + markup;
  }, '');
  cardsContainerRef.innerHTML = markupArr;
}

function enableBtn() {
  const btnRef = document.querySelectorAll('#favorites-card-set .favorite-btn');
  btnRef.forEach(btn => {
    btn.innerHTML = addActiveStatus();
    btn.classList.add('is-selected');
  });
}

function searchCardInLS(searchValue) {
  const searchKey = 'title';
  let index = -1;
  for (let i = 0; i < favoriteCardsArray.length; i++) {
    if (favoriteCardsArray[i][searchKey] === searchValue) {
      index = i;
      break;
    }
  }
  return index;
}

function removeCardFromFavorites(index) {
  if (index > -1) {
    favoriteCardsArray.splice(index, 1);
  }
  saveFavoritesToLS(favoriteCardsArray);
  showFavoritesNews();
  updateRefs();
}

function changeBtnState() {
  setInterval(() => {
    const titlesRefs = document.querySelectorAll('.news-card__title');
    favoriteCardsArray.forEach(obj => {
      const searchValue = obj.title;

      for (let i = 0; i < titlesRefs.length; i++) {
        if (titlesRefs[i].textContent === searchValue) {
          const pinnedCards =
            titlesRefs[i].parentElement.children[0].children[3];
          pinnedCards.innerHTML = addActiveStatus();
          pinnedCards.classList.add('is-selected');
        }
      }
    });
  }, 500);
}
