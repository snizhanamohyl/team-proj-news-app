const cardsGallery = document.querySelector('.card-set');

if (cardsGallery) {
  cardsGallery.addEventListener('click', linkReadMore);
}

function linkReadMore(event) {
  if (event.target.nodeName === 'A') {
    const cardEl = event.target.closest('article');

    const cardData = {
      img: cardEl.childNodes[1].children[0].children[0].src,
      uri: event.target.getAttribute('data-article-uri'),
      title: cardEl.childNodes[3].textContent,
      descr: cardEl.childNodes[5].textContent,
      date: cardEl.childNodes[7].children[0].innerText,
      link: event.target.href,
      category: cardEl.childNodes[1].children[1].textContent,
    };

    const curStorageData = isLocalEmpty();

    const curDate = generateDate();

    const curStorageDataKeys = [...Object.keys(curStorageData)];
    const curStorageDataValues = [...Object.values(curStorageData)];

    const curStorageObjs = curStorageDataValues.flatMap(arr => arr);

    if (curStorageObjs.find(obj => obj.uri === cardData.uri)) {
      return;
    }

    if (curStorageDataKeys.length === 0) {
      curStorageData[curDate] = [cardData];
    } else {
      if (curStorageDataKeys.includes(curDate)) {
        curStorageData[curDate].push(cardData);
      } else {
        curStorageData[curDate] = [cardData];
      }
    }

    addReadCardToLS(curStorageData);
  }
}

function isLocalEmpty() {
  const storedValue = JSON.parse(localStorage.getItem('read-articles'));
  return storedValue ? storedValue : {};
}

function addReadCardToLS(localStorageData) {
  localStorage.setItem('read-articles', JSON.stringify(localStorageData));
}

function generateDate() {
  const eventDateNow = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return eventDateNow.toLocaleDateString([], options).replaceAll('.', '/');
}
