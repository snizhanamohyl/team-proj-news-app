const bodyRef = document.querySelector('body');
const cardsContainerRef = document.querySelector('#favorites-card-set');
const savedFavorites = localStorage.getItem('Favorites');
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
  localStorage.setItem('Favorites', JSON.stringify(current));
}

function getFavoritesFromLS() {
  try {
    const parsedFavorites = JSON.parse(savedFavorites);
    parsedFavorites.forEach(obj => favoriteCardsArray.push(obj));
    console.log('Saved news cards in favorite: ', favoriteCardsArray.length);
  } catch (error) {
    console.log('Favorites list is empty');
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
    console.log('Failed to markup your favorites news');
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
