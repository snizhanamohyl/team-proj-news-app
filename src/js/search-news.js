import SearchNews from './api';
import { createMarkup, createMostPopularMarkup } from './markup-function';
import { renderWeatherAppGeo, renderWeatherApp } from './weather';

const form = document.getElementById('form-field');
const imageNoResults = document.getElementById('img-noresults');

const refs = {
  pg: document.getElementById('pagination'),
  btnNextPg: document.querySelector('.next-page'),
  btnPrevPg: document.querySelector('.prev-page'),
  pageContainer: document.querySelector('.pagination-container'),
};

let itemsPerPage = 0;
let totalPages = 0;

if (window.innerWidth < 768) {
  itemsPerPage = 4;
}
if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  itemsPerPage = 7;
}
if (window.innerWidth >= 1280) {
  itemsPerPage = 8;
}

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  // totalPages: Math.ceil(totalItem / itemsPerPage),
};

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    const articles = res.data.results;
    const totalItem = articles.length;
    totalPages = Math.ceil(totalItem / itemsPerPage);
    let arrToPopularMarkup = showPage(articles);
    const gallery = document.getElementById('news-list');
    let markup = createMostPopularMarkup(arrToPopularMarkup);

    gallery.innerHTML = markup;
    navigator.geolocation.getCurrentPosition(
      renderWeatherAppGeo,
      renderWeatherApp
    );
    pagination();
    refs.pg.addEventListener('click', e => {
      const elem = e.target;

      if (elem.dataset.page) {
        const pageNumber = parseInt(elem.dataset.page, 10);

        valuePage.curPage = pageNumber;
        let arrToPopularMarkup = showPage(articles);
        markup = createMostPopularMarkup(arrToPopularMarkup);
        gallery.innerHTML = markup;
        navigator.geolocation.getCurrentPosition(
          renderWeatherAppGeo,
          renderWeatherApp
        );

        pagination(valuePage);
        // console.log(valuePage);
        handleButtonLeft();
        handleButtonRight();
      }
    });
    refs.pageContainer.addEventListener('click', function (e) {
      if (e.target.nodeName === 'LI') {
        return;
      }
      handleButton(e.target);
      arrToPopularMarkup = showPage(articles);
      markup = createMostPopularMarkup(arrToPopularMarkup);
      gallery.innerHTML = markup;
      navigator.geolocation.getCurrentPosition(
        renderWeatherAppGeo,
        renderWeatherApp
      );
    });
  })
  .catch(console.log);

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  imageNoResults.style.display = 'none';
  valuePage.curPage = 1;
  const form = e.currentTarget;
  searchNews.searchQuery = form.elements.searchQuery.value.trim();

  findNews();

  async function findNews() {
    let gallery = document.querySelector('.card-set');
    let newSearch;

    try {
      const date = JSON.parse(localStorage.getItem('date'));
      if (date === null) {
        newSearch = await searchNews.searchNews();

        const totalItem = newSearch.data.response.docs.length;
        totalPages = Math.ceil(totalItem / itemsPerPage);
        let arrToMarkup = showPage(newSearch.data.response.docs);

        if (newSearch.data.response.docs.length === 0) {
          throw new Error('no results');
        }

        let markup = createMarkup(arrToMarkup);

        gallery.innerHTML = markup;
        navigator.geolocation.getCurrentPosition(
          renderWeatherAppGeo,
          renderWeatherApp
        );
        pagination();
      } else {
        searchNews.dateFilter = date.replace('/', '').replace('/', '');
        newSearch = await searchNews.searchNewsWithDate();
        if (newSearch.data.response.docs.length === 0) {
          throw new Error('no results');
        }

        let markup = createMarkup(arrToMarkup);

        gallery.innerHTML = markup;
        navigator.geolocation.getCurrentPosition(
          renderWeatherAppGeo,
          renderWeatherApp
        );
        pagination();
      }

      refs.pg.addEventListener('click', e => {
        const elem = e.target;

        if (elem.dataset.page) {
          const pageNumber = parseInt(elem.dataset.page, 10);

          valuePage.curPage = pageNumber;
          let arrToMarkup = showPage(newSearch.data.response.docs);
          markup = createMarkup(arrToMarkup);
          gallery.innerHTML = markup;
          navigator.geolocation.getCurrentPosition(
            renderWeatherAppGeo,
            renderWeatherApp
          );

          pagination(valuePage);
          // console.log(valuePage);
          handleButtonLeft();
          handleButtonRight();
        }
      });

      refs.pageContainer.addEventListener('click', function (e) {
        if (e.target.nodeName === 'LI') {
          return;
        }
        handleButton(e.target);
        arrToMarkup = showPage(articles);
        markup = createMarkup(arrToMarkup);
        gallery.innerHTML = markup;
        navigator.geolocation.getCurrentPosition(
          renderWeatherAppGeo,
          renderWeatherApp
        );
      });
    } catch (err) {
      console.log('ERROR', err);
      gallery.innerHTML = '';
      imageNoResults.style.display = 'block';
    } finally {
      form.reset();
    }
  }
}

function showPage(data) {
  const startIndex = (valuePage.curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // console.log("Обрізаний масив: ", value.slice(startIndex, endIndex))
  return data.slice(startIndex, endIndex);
}

function pagination() {
  const { curPage, numLinksTwoSide: delta } = valuePage;
  let range = delta + 2;

  let numberTruncateLeft;
  let numberTruncateRight;

  if (window.innerWidth < 768) {
    numberTruncateLeft = curPage;
    numberTruncateRight = curPage;
  }
  if (window.innerWidth >= 768) {
    range = delta + 4;
    numberTruncateRight = curPage + delta;
    numberTruncateLeft = curPage - delta;
  }

  // const range = delta; // use for handle visible number of links left side

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item-dot"><a class="pg-link">...</a></li>`;
  let countTruncate = 0; // use for ellipsis - truncate left side or right side

  // use for truncate two side
  // const numberTruncateLeft = curPage;
  // const numberTruncateRight = curPage;

  let active = '';
  for (let pos = 1; pos <= totalPages; pos += 1) {
    active = pos === curPage ? 'active' : '';

    // truncate
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 2 && numberTruncateRight < totalPages - 2 + 1) {
        // truncate 2 side
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        // truncate left side or right side
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      // not truncate
      render += renderPage(pos, active);
    }
  }

  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    refs.pg.innerHTML = renderTwoSide;
  } else {
    refs.pg.innerHTML = render;
  }
}

function renderPage(index, active = '') {
  return ` 
    <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>
  `;
}

function handleButton(element) {
  if (element.classList.contains('prev-page')) {
    valuePage.curPage -= 1;
    handleButtonLeft();
    refs.btnNextPg.disabled = false;
    //  btnLastPg.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage += 1;
    handleButtonRight();
    refs.btnPrevPg.disabled = false;
    //  btnFirstPg.disabled = false;
  }
  pagination();
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    console.log('valuePage.curPage: ', valuePage.curPage);
    refs.btnPrevPg.disabled = true;
    //  btnFirstPg.disabled = true;
  } else {
    refs.btnPrevPg.disabled = false;
    //  btnFirstPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === totalPages) {
    console.log('valuePage.curPage: ', valuePage.curPage);
    //   console.log(valuePage.curPage);
    refs.btnNextPg.disabled = true;
    //  btnLastPg.disabled = true;
  } else {
    refs.btnNextPg.disabled = false;
    //  btnLastPg.disabled = false;
  }
}
