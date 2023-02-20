function createCategoriesMarkup(articles) {
  const markup = articles
    .map(({ url, abstract, title, updated_date, multimedia, section }) => {
      let image = multimedia[2].url;

      return `<li class="news-card">
        <article>
         <div class="box-img">
        <div class="news-card__img"><img src=${image} alt="img-news" height = "395">
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
						${updated_date.split('').splice(0, 10).join('').replaceAll('-', '/')}</p>
            <a class="news-card__link" target="_blank" href="${url}">
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

export { createCategoriesMarkup };
