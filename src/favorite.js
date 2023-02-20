import { Notify } from 'notiflix/build/notiflix-notify-aio';
const bodyRef = document.querySelector('body');
const cardsContainerRef = document.querySelector('#favorites-card-set');
const savedFavorites = localStorage.getItem('favorites');
const favoriteCardsArray = [];

getCardsRef();
getFavoritesFromLS();
showFavoritesNews();

function getCardsRef() {
  setTimeout(() => {
    const cardRef = document.querySelectorAll('.news-card');
    cardRef.forEach(card => {
      card.addEventListener('click', onClick);
    });
  }, 200);
}

function onClick(evt) {
  if (evt.target.nodeName === 'BUTTON') {
    const cardMarkUp = evt.currentTarget.outerHTML;
    if (bodyRef.id === 'news') renderMarkup(cardMarkUp);
    searchCardInFavorites(cardMarkUp);
    getCardsRef();
  }
}

function renderMarkup(card) {
  favoriteCardsArray.push(card);
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
    Notify.info('Favorites list is empty');
  }
}

function showFavoritesNews() {
  try {
    if (cardsContainerRef) {
      const markupArr = favoriteCardsArray.reduce((arr, card) => {
        return arr + card;
      }, '');
      cardsContainerRef.innerHTML = markupArr;
    }
  } catch (error) {
    Notify.error('Failed to markup your favorites news');
  }
}

function searchCardInFavorites(card) {
  if (bodyRef.id === 'favorites') {
    if (favoriteCardsArray.includes(card)) {
      favoriteCardsArray.splice(card, 1);
      saveFavoritesToLS(favoriteCardsArray);
      showFavoritesNews();
    }
  }
}
