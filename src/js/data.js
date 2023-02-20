import SearchNews from './api';
const searchNews = new SearchNews();

async function findNews() {
  let newSearch;
  const date = JSON.parse(localStorage.getItem('date'));
  dateFilter = date;
  if (dateFilter === '') {
    newSearch = await searchNews.searchNews();
    if (newSearch.data.response.docs.length === 0) {
      throw new Error('no results');
    }
    let markup = createMarkup(newSearch.data.response.docs);

    gallery.innerHTML = markup;
  } else {
    newSearch = await searchNews.searchNewsWithData();
    if (newSearch.data.response.docs.length === 0) {
      throw new Error('no results');
    }
    let markup = createMarkup(newSearch.data.response.docs);

    gallery.innerHTML = markup;
  }
}
