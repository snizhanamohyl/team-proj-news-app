import SearchNews from './api';
import { createMarkup, createMostPopularMarkup } from './markup-function';

const form = document.getElementById('form-field');
const imageNoResults = document.getElementById('img-noresults');

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    const articles = res.data.results;
    const gallery = document.getElementById('news-list');
    const markup = createMostPopularMarkup(articles);
    gallery.innerHTML = markup;
  })
  .catch(console.log);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  imageNoResults.style.display = 'none';

  const form = e.currentTarget;
  searchNews.searchQuery = form.elements.searchQuery.value.trim();

  findNews();

  async function findNews() {
    let gallery = document.querySelector('.card-set');
    let newSearch;
    const date = JSON.parse(localStorage.getItem('date'));
    if (date === null) {
      newSearch = await searchNews.searchNews();
      if (newSearch.data.response.docs.length === 0) {
        throw new Error('no results');
      }
      let markup = createMarkup(newSearch.data.response.docs);

      gallery.innerHTML = markup;
    } else {
      searchNews.dateFilter = date.replace('/', '').replace('/', '');
      newSearch = await searchNews.searchNewsWithDate();
      if (newSearch.data.response.docs.length === 0) {
        throw new Error('no results');
      }
      let markup = createMarkup(newSearch.data.response.docs);

      gallery.innerHTML = markup;
    }
  }
}

// const date = JSON.parse(localStorage.getItem('date'));
// //   .replace('/', '')
// //   .replace('/', '');
// searchNews.dateFilter = date;
// const card = document.querySelector('.news-card');
// console.log(card.dataset.date);
// function filter() {
//   let list = [];

//   const cards = document.querySelectorAll('.news-card');
//   list = cards.filter(card => card.dataset.date === date);
//   return console.log(list);
// }
