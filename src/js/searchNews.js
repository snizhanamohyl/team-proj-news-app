import SearchNews from './api';

const form = document.getElementById('form-field');
const imageNoResult = document.getElementById('img-noresults');

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    let articles = res.data.results;
    console.log(articles);
    let gallery = document.querySelector('.card-set');
    let markup = createMostPopularMarkup(articles);
    gallery.innerHTML = markup;
  })
  .catch(console.log);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  imageNoResult.style.display = 'none';

  const form = e.currentTarget;
  searchNews.searchQuery = form.elements.searchQuery.value.trim();

  findNews();

  async function findNews() {
    let gallery = document.querySelector('.card-set');
    try {
      const newSearch = await searchNews.searchNews();
      console.log(newSearch.data.response.docs);
      if (newSearch.data.response.docs.length === 0) {
        throw new Error('no results');
      }
      let markup = createMarkup(newSearch.data.response.docs);

      gallery.innerHTML = markup;
    } catch (err) {
      console.log('ERROR', err);
      gallery.innerHTML = '';
      imageNoResult.style.display = 'block';
    } finally {
      form.reset();
    }
  }
}

function createMarkup(articles) {
  const markup = articles
    .map(
      ({
        web_url,
        lead_paragraph,
        headline,
        pub_date,
        multimedia,
        section_name,
      }) => {
        let image = multimedia.find(image => {
          return image.type === 'image';
        });
        if (!image) return '';
        let link = 'http://www.nytimes.com/' + image.url;
        return `<li class="news-card">
        <article>
        <div class="box-img">
            <img src=${link} class="news-card__img" width="395" height="395" alt="img-news">
            <p class="box-img__inform">${section_name}</p>
            <button type="button" class="favorite-btn">
                Add to favorite
                <svg class="favorite-btn__icon" width="16" height="16">
                    <use class="icon-js" href="./images/sprite.svg#icon-icons-heart-no-active"></use>
                </svg>
            </button>
        </div>
        <h2 class="news-card__title">${headline.main}</h2>
        <p class="news-card__text">${lead_paragraph}</p>
        <div class="news-card__inform">
            <p class="news-card__date">
						${pub_date.split('').splice(0, 10).join('').replaceAll('-', '/')}</p>
            <a class="news-card__link" target="_blank" href="${web_url}">
                Read more
            </a>
        </div>
      </article>
    </li>   
`;
      }
    )
    .join('');
  return markup;
}

function createMostPopularMarkup(articles) {
  const markup = articles
    .map(({ web_url, abstract, title, published_date, media, section }) => {
      let image = media[0];
      console.log(image);
      if (!image) return '';
      let link = image['media-metadata'][2].url;
      return `<li class="news-card">
        <article>
        <div class="box-img">
            <img src=${link} class="news-card__img" width="395" height="395" alt="img-news">
            <p class="box-img__inform">${section}</p>
            <button type="button" class="favorite-btn">
                Add to favorite
                <svg class="favorite-btn__icon" width="16" height="16">
                     <use class="icon-js" href="./img/symbol-defs.svg#icon-icons-heart-no-active"></use>
                </svg>
            </button>
        </div>
        <h2 class="news-card__title">${title}</h2>
        <p class="news-card__text">${abstract}</p>
        <div class="news-card__inform">
            <p class="news-card__date">
						${published_date.split('').splice(0, 10).join('').replaceAll('-', '/')}</p>
            <a class="news-card__link" target="_blank" href="${web_url}">
                Read more
            </a>
        </div>
      </article>
    </li>

`;
    })
    .join('');
  return markup;
}
