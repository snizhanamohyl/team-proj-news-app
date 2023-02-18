const cardRef = document.querySelectorAll('.news-card');
const cardsContainerRef = document.querySelector('#favorites-card-set');
const savedFavorites = localStorage.getItem('Favorites');
const favoriteCardsArray = [];

cardRef.forEach(card => {
  card.addEventListener('click', onClick);
});

getFavoritesFromLS();
showFavoritesNews();

function onClick(evt) {
  if (evt.target.nodeName === 'BUTTON') {
    const cardMarkUp = evt.currentTarget.outerHTML;
    renderMarkup(cardMarkUp);
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
