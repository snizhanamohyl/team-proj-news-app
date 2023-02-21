import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addActiveStatus } from './js/news-cards';
import { removeActiveStatus } from './js/news-cards';

const bodyRef = document.querySelector('body');
const cardsContainerRef = document.querySelector('#favorites-card-set');
const noResultsRef = document.querySelector('#img-noresults');
const savedFavorites = localStorage.getItem('favorites');
const favoriteCardsArray = [];

getFavoritesFromLS();
showFavoritesNews();
updateRefs();

function updateRefs() {
  setTimeout(() => {
    const cardRef = document.querySelectorAll('.news-card');
    cardRef.forEach(card => {
      card.addEventListener('click', onClick);
    });
  }, 500);
}

function onClick(evt) {
  if (evt.target.nodeName === 'BUTTON') {
    if (bodyRef.id === 'news') {
      const cardMarkUp = evt.currentTarget.outerHTML;
      renderMarkup(cardMarkUp);
    }
    if (bodyRef.id === 'favorites') {
      const cardMarkUp = evt.currentTarget.outerHTML;
      searchCardInFavorites(cardMarkUp);
    }
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
      changeBtnState();
    }
  } catch (error) {
    Notify.error('Failed to markup your favorites news');
  }
}

function markUpFavoriteNews() {
  const markupArr = favoriteCardsArray.reduce((arr, card) => {
    return arr + card;
  }, '');
  cardsContainerRef.innerHTML = markupArr;
}

function changeBtnState() {
  const btnRef = document.querySelectorAll('#favorites-card-set .favorite-btn');
  btnRef.forEach(btn => {
    btn.innerHTML = addActiveStatus();
    btn.classList.add('is-selected');
  });
}

// function disableBtnState() {
//   const btnRef = document.querySelectorAll('#favorites-card-set .favorite-btn');
//   btnRef.forEach(btn => {
//     btn.innerHTML = removeActiveStatus();
//     btn.classList.remove('is-selected');
//   });
// }

function searchCardInFavorites(card) {
  // favoriteCardsArray.forEach(fav => {
  //   if (fav.length === card.length) console.log('found');
  // });
  favoriteCardsArray.splice(card, 1);
  saveFavoritesToLS(favoriteCardsArray);
  showFavoritesNews();
  updateRefs();
}
