// import SearchNews from './api';
// const searchNews = new SearchNews();

import SearchNews from './api';

// async function findNews() {
//   let gallery = document.querySelector('.card-set');
//   let newSearch;
//   const date = JSON.parse(localStorage.getItem('date'));
//   searchNews.dateFilter = date;
//   if (searchNews.dateFilter === '') {
//     newSearch = await searchNews.searchNews();
//     if (newSearch.data.response.docs.length === 0) {
//       throw new Error('no results');
//     }
//     let markup = createMarkup(newSearch.data.response.docs);

//     gallery.innerHTML = markup;
//   } else {
//     newSearch = await searchNews.searchNewsWithDate();
//     if (newSearch.data.response.docs.length === 0) {
//       throw new Error('no results');
//     }
//     let markup = createMarkup(newSearch.data.response.docs);

//     gallery.innerHTML = markup;
//   }
// }

// async function renderNews() {
//   imageNoResults.style.display = 'none';
//   try {
//     const date = JSON.parse(localStorage.getItem('date'));
//     api.dateFilter = date;
//     let categorySearch;
//     if (api.dateFilter === '') {
//       categorySearch = await api.categoryNews();

//       if (categorySearch.data.results === null) {
//         throw new Error('no results');
//       }

//       const markup = createCategoriesMarkup(categorySearch.data.results);

//       gallery.innerHTML = '';
//       gallery.innerHTML = markup;
//     } else {
//       categorySearch = await api.categoryNewsWithDate();

//       if (categorySearch.data.results === null) {
//         throw new Error('no results');
//       }

//       const markup = createCategoriesMarkup(categorySearch.data.results);

//       gallery.innerHTML = '';
//       gallery.innerHTML = markup;
//     }
//   } catch (error) {
//     console.log('ERROR', error);
//     gallery.innerHTML = '';
//     imageNoResults.style.display = 'block';
//   }
// }

const date = JSON.parse(localStorage.getItem('date'));
//   .replace('/', '')
//   .replace('/', '');
searchNews.dateFilter = date;
const card = document.querySelector('.news-card');
console.log(card.dataset.date);
function filter() {
  let list = [];

  const cards = document.querySelectorAll('.news-card');
  list = cards.filter(card => card.dataset.date === date);
  //   if (dateFilter === '') {
  //     return;
  //   } else if (dateFilter !== card.dataset.date) {
  //     card.classList.add('.visually-hidden');display block
  //   }
}
// if (dateFilter === '') {
//   return;
// } else if (dateFilter !== card.dataset.date) {
//   card.classList.add('.visually-hidden');
// }

// ul filter dateFilter === publishedDate.textContent) {
// малюємо розмітку, як ні то innerHTML
