import { createReadListMarkup, createCardReadMarkup } from './markup-function';

const gallery = document.querySelector('.date-list');
const readNoresults = document.querySelector('.read-noresults');
const readDataLS = isLocalEmpty();

createReadMarkup(readDataLS);

function createReadMarkup(readDataLS) {
  const datesWithArticlesUri = Object.entries(readDataLS);

  const markup = datesWithArticlesUri.reduce(
    (acc, arr) =>
      (acc += createReadListMarkup(arr[0], createCardReadMarkup(arr[1]))),
    ''
  );

  gallery.innerHTML = '';
  gallery.innerHTML = markup;
}

function isLocalEmpty() {
  const storedValue = JSON.parse(localStorage.getItem('read-articles'));

  if (storedValue) {
    return storedValue;
  } else {
    readNoresults.style.display = 'block';
    return {};
  }
}
