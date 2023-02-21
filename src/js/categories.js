import SearchNews from './api';
import { createCategoriesMarkup } from './markup-function';

const othersBtn = document.getElementById('others');
const dropdown = document.getElementById('dropdown');
const othersList = document.getElementById('others-list');
const btnSpan = document.getElementById('categories-span');
const btns = document.getElementsByClassName('categories__btn');
const categoriesList = document.getElementById('categories__list');
const svg = document.getElementById('categories__arrow');
const imageNoResults = document.getElementById('img-noresults');
const gallery = document.getElementById('news-list');

const api = new SearchNews();

// Categories drop-down list

othersBtn.addEventListener('click', openDropdown);

function openDropdown() {
  dropdown.classList.toggle('js-is-hidden');
  othersBtn.classList.toggle('is-active');
}

// Categories list load from server

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  api
    .categoryList()
    .then(response => {
      return response.data.results;
    })
    .then(categories => {
      if (window.innerWidth < 768) {
        btnSpan.textContent = 'Categories';
        renderMobCategories(categories);
      }

      renderButtons(categories);
      renderOtherCategories(categories);
    });
}

function renderMobCategories(categories) {
  for (let i = 0; i < 50; i += 1) {
    const category = categories[i].display_name;
    addOthersMarkup(createOthersMarkup(category));
  }
}

function renderButtons(categories) {
  for (let i = 0; i < 6; i += 1) {
    btns[i].textContent = categories[i].display_name;
  }
}

function renderOtherCategories(categories) {
  for (let i = 0; i < 44; i += 1) {
    const category = categories[i + 6].display_name;
    addOthersMarkup(createOthersMarkup(category));
  }
}

function createOthersMarkup(category) {
  return `<li><button class="dropdown-item" type="button">${category}</button></li>`;
}

function addOthersMarkup(markup) {
  othersList.insertAdjacentHTML('beforeend', markup);
}

// Fetch news by category

categoriesList.addEventListener('click', onCategoryListClick);
othersList.addEventListener('click', onDropDownListClick);

function onDropDownListClick(event) {
  openDropdown();

  const button = event.target;
  const encodedBtn = encodeURIComponent(button.textContent.toLowerCase());

  api.category = encodedBtn;

  renderNews();
}

function onCategoryListClick(event) {
  const button = event.target;

  api.category = button.textContent.toLowerCase();

  if (
    api.category === 'others' ||
    button === othersBtn ||
    button === svg ||
    api.category === 'categories' ||
    api.category === ''
  ) {
    return;
  }
  renderNews();
}

async function renderNews() {
  imageNoResults.style.display = 'none';
  try {
    let categorySearch;
    categorySearch = await api.categoryNews();

    if (categorySearch.data.results === null) {
      throw new Error('no results');
    }

    const markup = createCategoriesMarkup(categorySearch.data.results);

    gallery.innerHTML = '';
    gallery.innerHTML = markup;
  } catch (error) {
    console.log('ERROR', error);
    gallery.innerHTML = '';
    imageNoResults.style.display = 'block';
  }
}
