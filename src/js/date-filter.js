export default function filterByDate(date) {
  const cards = document.querySelectorAll('.news-card');
  const listCards = document.getElementById('news-list');
  const listCardArr = [...cards];
  let html = '';
  const filteredCards = listCardArr.filter(
    card => card.getAttribute('data-date') === date
  );

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
}
