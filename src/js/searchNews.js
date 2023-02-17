import SearchNews from '../src/js/api';

const form = document.getElementById('form-field');

const searchNews = new SearchNews();

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  searchNews.searchQuery = form.elements.searchQuery.value.trim();

  findNews();
}

async function findNews() {
  try {
    const newSearch = await searchNews.searchNews();
    console.log(newSearch.data.response.docs);
  } catch (err) {
    alert('error');
  } finally {
    form.reset();
  }
}

function createMarkup({ docs }) {
  const markup = docs
    .map(
      ({
        web_url,
        lead_paragraph,
        headline,
        pub_date,
        comments,
        downloads,
      }) => `<div class="news-card">
            <div class="box-img">
                <img src="#" class="news-card__img" width="395" height="395" alt="img-news">
                <p class="box-img__inform">Job searching</p>
                <p class="box-img__text">Already read
                    <svg width="16" height="16">
                        <!-- <use href="./img/symbol-defs.svg#icon-check-mark-icon"></use> -->
                    </svg>
                </p>

                <button type="button" class="favorite-btn">
                    Add to favorite
                    <svg class="favorite-btn__icon" width="16" height="16">
                        <!-- <use class="icon-js" href="./img/symbol-defs.svg#icon-icons-heart-no-active"></use> -->
                    </svg>
                </button>
            </div>

            <h2 class="news-card__titel">${headline}</h2>
            <p class="news-card__text">${lead_paragraph}</p>
            <div class="news-card__inform">
                <p class="news-card__date">${pub_date}</p>
                <a class="news-card__link" target="_blank" href="${web_url}">
                    Read more
                </a>
            </div>
        </div>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGalleryList() {
  gallery.innerHTML = '';
}
