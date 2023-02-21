import SearchNews from './api';
import { createAlreadyReadMarkup } from './markup-function';

const cardsGallery = document.querySelector('.card-set');

// ............. локал сторедж + маркап

if (cardsGallery) {
  cardsGallery.addEventListener('click', linkReadMore);
}

function isLocalEmpty() {
  const storedValue = JSON.parse(localStorage.getItem('readMoreLocal'));
  return storedValue ? storedValue : {};
}

function linkReadMore(event) {
  const readMore = event.target.closest('.news-card__link');
  if (!readMore) return;
  addReadMore(readMore);
}

function addReadMore(readMore) {
  const stored = isLocalEmpty();
  const eventDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = eventDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');
  const uri = readMore.getAttribute('data-article-uri');

  const updatedStore = {
    ...stored,
    [readDateNow]: [...new Set([...(stored[readDateNow] || []), uri])],
  };
  localStorage.setItem('readMoreLocal', JSON.stringify(updatedStore));
}

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    const articles = res.data.results;
    console.log(res);
    const stored = isLocalEmpty();
    const datesWithArticlesUri = Object.entries(stored);
    const gallery = document.querySelector('.date-list');
    const markup = createReadMarkup(datesWithArticlesUri, articles);
    gallery.innerHTML = markup;
  })
  .catch(console.log);

function createReadMarkup(datesWithArticlesUri, articles) {
  const markup = datesWithArticlesUri
    .sort(([date1], [date2]) => {
      const aDate = new Date(date1);
      const bDate = new Date(date2);
      return aDate.getTime() - bDate.getTime();
    })
    .map(([date, articleUri]) => {
      const filteredArticles = articles.filter(({ uri }) =>
        articleUri.includes(uri)
      );
      const articlesMarkup = createAlreadyReadMarkup(filteredArticles);
      return `
        <li class="date-list__item">
            <button class="date-list__btn">
                <span class="date-list__btn-text">${date}</span>
                <span class="date-list__btn-elem">
                    <svg class="date-list__btn-svg">
                        <use class="date-list__btn-use" href="./images/sprite.84e7d85a.svg#arrow-down2"></use>
                    </svg>
                </span>
            </button>
            <ul class="card-set">
              ${articlesMarkup}
            </ul>
        </li>

`;
    })
    .join('');
  return markup;
}
