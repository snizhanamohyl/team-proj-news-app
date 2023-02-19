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
        <div class="news-card__img"><img src=${link} alt="img-news" height = "395">
        </div>
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
      if (!image) return '';
      let link = image['media-metadata'][2].url;
      return `<li class="news-card">
        <article>
        <div class="box-img">
        <div class="news-card__img"><img src=${link} alt="img-news" height = "395">
        </div>
            <p class="box-img__inform">${section}</p>
            <button type="button" class="favorite-btn">
                Add to favorite
                <svg class="favorite-btn__icon" width="16" height="16">
                     <use class="icon-js" href="./images/sprite.svg#icon-icons-heart-no-active"></use>
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

export { createMarkup, createMostPopularMarkup };
