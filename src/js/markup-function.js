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
        return `<li class="card-set__item news-card">
        <article>
         <div class="box-img">
        <div class="news-card__img"><img src=${link} alt="img-news" height = "395">
        </div>
            <p class="box-img__inform">${section_name}</p>

            <p class="box-img__text">Already read   &#10003</p>

            <button type="button" class="favorite-btn">
                Add to favorite 
                <svg class="favorite-btn__icon" width="16" height="16">
                    <use class="icon-js" href="./sprite.74cebf96.svg#icon-icons-heart-no-active"></use>
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
    .map(({ uri, url, abstract, title, published_date, media, section }) => {
      let image = media[0];
      if (!image) return '';
      let link = image['media-metadata'][2].url;
      return `<li class="card-set__item news-card" data-date="${published_date
        .split('')
        .splice(0, 10)
        .join('')
        .replaceAll('-', '/')}">
        <article>
        <div class="box-img">
        <div class="news-card__img"><img src=${link} alt="img-news" height = "395">
        </div>
            <p class="box-img__inform">${section}</p>

            <p class="box-img__text">Already read   &#10003</p>

            <button type="button" class="favorite-btn">
                Add to favorite 
                <svg class="favorite-btn__icon" width="16" height="16">
                     <use class="icon-js" href="./sprite.74cebf96.svg#icon-icons-heart-no-active"></use>
                </svg>
            </button>
        </div>
        <h2 class="news-card__title">${title}</h2>
        <p class="news-card__text">${abstract}</p>
        <div class="news-card__inform">
            <p class="news-card__date">
						${published_date.split('').splice(0, 10).join('').replaceAll('-', '/')}</p>
            <a class="news-card__link" target="_blank" data-article-uri="${uri}" href="${url}" >
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

function createCategoriesMarkup(articles) {
  const markup = articles
    .map(
      ({
        url,
        abstract,
        title,
        updated_date,
        multimedia,
        section,
        created_date,
      }) => {
        if (multimedia === null) {
          return;
        }
        let image = multimedia[2].url;

        return `<li class="card-set__item news-card" data-date="${created_date
          .split('')
          .splice(0, 10)
          .join('')
          .replaceAll('-', '/')}">
        <article>
         <div class="box-img">
        <div class="news-card__img"><img src=${image} alt="img-news" height = "395">
        </div>
            <p class="box-img__inform">${section}</p>
            
            <p class="box-img__text">Already read   &#10003</p>

            <button type="button" class="favorite-btn">
                Add to favorite
                <svg class="favorite-btn__icon" width="16" height="16">
                    <use class="icon-js" href="./sprite.74cebf96.svg#icon-icons-heart-no-active"></use>
                </svg>
            </button>
        </div>
        <h2 class="news-card__title">${title}</h2>
        <p class="news-card__text">${abstract}</p>
        <div class="news-card__inform">
            <p class="news-card__date">
						${updated_date.split('').splice(0, 10).join('').replaceAll('-', '/')}</p>
            <a class="news-card__link" target="_blank" href="${url}">
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

function createWeatherAppMarkup(
  { temp, weather, city, icon },
  currentDay,
  allInfoDays
) {
  return `
  <li class="card-set__item weather__app" >
    <div class="weather__app--info"> 
        <span class="weather__app--degree" >${Math.round(temp)}°</span>        
        <div class="weather__app--geo-position">
            <span class="weather__app--days-value" >${weather}</span>
            <p class="weather__app--location">
                <svg>   
                    <use href="./images/sprite.svg#location"></use>
                </svg>
                <span class="weather__app--city">${city}</span>
            </p>
        </div>
    </div>

    <img class="weather__app--skyCons" src="https://openweathermap.org/img/wn/${icon}@4x.png"/>

    <div class="weather__app--date">
        <span class="weather__app--day">${currentDay()}</span>
        <span class="weather__app--year">${allInfoDays()}</span>
    </div>      
    <a 
    href="https://www.meteoprog.com/ua/"
    class="weather__app--link"
    target="_blank"
    rel="noopener nofolow norefferer"
    >
    Weather for Week
    </a>
</li>`;
}

export {
  createMarkup,
  createMostPopularMarkup,
  createCategoriesMarkup,
  createWeatherAppMarkup,
};
