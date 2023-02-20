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
    let gallery = document.getElementById('news-list');
    try {
      const newSearch = await searchNews.searchNews();
      if (newSearch.data.response.docs.length === 0) {
        throw new Error('no results');
      }
      const markup = createMarkup(newSearch.data.response.docs);

      gallery.innerHTML = markup;
    } catch (err) {
      console.log('ERROR', err);
      gallery.innerHTML = '';
      imageNoResults.style.display = 'block';
    } finally {
      form.reset();
    }
  }
}