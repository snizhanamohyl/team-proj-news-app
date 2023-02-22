import { Notify } from 'notiflix';
export default function filterByDate(date) {
  const paginationEl = document.querySelector('.pagination');
  const cards = document.querySelectorAll('.news-card');
  const listCards = document.getElementById('news-list');
  const listCardArr = [...cards];
  let html = '';
  const filteredCards = listCardArr.filter(
    card => card.getAttribute('data-date') === date
  );
  if (filteredCards.length === 0) {
    Notify.info(`We haven't found news by this date. You can search the news on this date through the search box.
`);
    return;
  }
  html = filteredCards.reduce(function (html, { outerHTML }) {
    html += outerHTML;

    [...cards].map(el => {
      if (el.dataset.date === date);
      return toString(el);
    });

    return html;
  }, '');
  listCards.innerHTML = '';
  listCards.insertAdjacentHTML('beforeend', html);
  paginationEl.style.display = 'none';
}
