import SearchNews from './api';
import {
  createMarkup,
  createMostPopularMarkup,
  createCategoriesMarkup,
} from './markup-function';
import { renderWeatherAppGeo, renderWeatherApp } from './weather';

const form = document.getElementById('form-field');
const imageNoResults = document.getElementById('img-noresults');
const gallery = document.getElementById('news-list');
const paginationRef = document.querySelector('.pagination');

const categoriesBtns = document.getElementsByClassName('categories__btn');
const othersList = document.getElementById('others-list');
const categoriesList = document.getElementById('categories__list');
const othersBtn = document.getElementById('others');
const svg = document.getElementById('categories__arrow');

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
  callback: createMostPopularMarkup,
  array: [],
};

function updateTemplate() {
  let arrToPopularMarkup = showPage(valuePage.array);
  let markup = valuePage.callback(arrToPopularMarkup);
  gallery.innerHTML = markup;
  navigator.geolocation.getCurrentPosition(
    renderWeatherAppGeo,
    renderWeatherApp
  );
  paginationRef.style.display = 'flex';
}

refs.pg.addEventListener('click', e => {
  const elem = e.target;

  if (!elem.dataset.page) return;

  const pageNumber = parseInt(elem.dataset.page, 10);
  valuePage.curPage = pageNumber;
  updateTemplate();
  pagination();
  handleButtonLeft();
  handleButtonRight();
});

refs.pageContainer.addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    return;
  }
  handleButton(e.target);
  updateTemplate();
  pagination();
});

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    const articles = res.data.results;
    const totalItem = articles.length;
    totalPages = Math.ceil(totalItem / itemsPerPage);
    valuePage.callback = createMostPopularMarkup;
    valuePage.curPage = 1;
    valuePage.array = articles;
    updateTemplate();
    pagination();
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

        if (newSearch.data.response.docs.length === 0) {
          throw new Error('no results');
        }

        const categoriesBtnsArr = Array.from(categoriesBtns);
        categoriesBtnsArr.map(child => child.classList.remove('pressed'));

        valuePage.callback = createMarkup;
        valuePage.array = newSearch.data.response.docs;
        updateTemplate();
        pagination();
      } else {
        searchNews.dateFilter = date.replace('/', '').replace('/', '');
        newSearch = await searchNews.searchNewsWithDate();

        const totalItem = newSearch.data.response.docs.length;
        totalPages = Math.ceil(totalItem / itemsPerPage);

        if (newSearch.data.response.docs.length === 0) {
          throw new Error('no results');
        }

        const categoriesBtnsArr = Array.from(categoriesBtns);
        categoriesBtnsArr.map(child => child.classList.remove('pressed'));

        valuePage.callback = createMarkup;
        valuePage.array = newSearch.data.response.docs;
        updateTemplate();
        pagination();
      }
    } catch (err) {
      console.log('ERROR', err);
      gallery.innerHTML = '';
      imageNoResults.style.display = 'block';
    } finally {
      form.reset();
    }
  }
}

categoriesList.addEventListener('click', onCategoryListClick);

othersList.addEventListener('click', onCategoryListClick);

//categories
function onCategoryListClick(event) {
  const button = event.target;
  searchNews.category = button.textContent.toLowerCase();

  const categoriesBtnsArr = Array.from(categoriesBtns);
  categoriesBtnsArr.map(child => child.classList.remove('pressed'));

  if (
    searchNews.category === 'others' ||
    button === othersBtn ||
    button === svg ||
    searchNews.category === 'categories' ||
    searchNews.category === ''
  ) {
    searchNews.category = encodeURIComponent(searchNews.category);
    return;
  }

  button.classList.add('pressed');

  renderNews();
}

async function renderNews() {
  imageNoResults.style.display = 'none';
  try {
    let categorySearch = await searchNews.categoryNews();

    if (categorySearch.data.results === null) {
      throw new Error('no results');
    }

    valuePage.callback = createCategoriesMarkup;
    valuePage.curPage = 1;
    valuePage.array = categorySearch.data.results;
    updateTemplate();
    pagination();
  } catch (error) {
    console.log('ERROR', error);
    gallery.innerHTML = '';
    imageNoResults.style.display = 'block';
  }
}

function showPage(data) {
  const startIndex = (valuePage.curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage += 1;
    handleButtonRight();
    refs.btnPrevPg.disabled = false;
  }
  pagination();
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    refs.btnPrevPg.disabled = true;
  } else {
    refs.btnPrevPg.disabled = false;
  }
}

function handleButtonRight() {
  if (valuePage.curPage === totalPages) {
    refs.btnNextPg.disabled = true;
  } else {
    refs.btnNextPg.disabled = false;
  }
}
