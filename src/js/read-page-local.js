const cardsGallery = document.querySelector('.card-set');
const readMoreArr = isLocalEmpty();

cardsGallery.addEventListener('click', linkReadMore);

function isLocalEmpty() {
  const storedValue = JSON.parse(localStorage.getItem('readMoreLocal'));
  return storedValue ? storedValue : [];
}

function linkReadMore(event) {
  const readMore = event.target.closest('.news-card__link');
  if (!readMore) return;
  addReadMore(readMore);
}

function addReadMore(readMore) {
  console.log(readMore);
  const eventDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const readDateNow = eventDateNow
    .toLocaleDateString([], options)
    .replaceAll('.', '/');
  const read = {
    url: readMore.nextElementSibling.textContent,
    date: readMore.parentNode.firstElementChild.innerText,
    img: readMore.parentNode.parentNode.childNodes[0].children[0].currentSrc,
    title: readMore.parentNode.parentNode.childNodes[1].innerText,
    description: readMore.parentNode.elem.previousSibling.innerText,
    link: readMore.parentNode.parentNode.children[0].currentSrc,
    category:
      readMore.parentNode.parentNode.childNodes[0].children[1].innerText,
    dateRead: readDateNow,
  };
  if (readMoreArr.some(item => item.url === read.url)) {
    return;
  }
  readMoreArr.push(read);
  localStorage.setItem('readMoreLocal', JSON.stringify(readMoreArr));
}
