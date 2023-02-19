import SearchNews from './api';

// Categories drop-down list

const othersBtn = document.getElementById('others');
const dropdown = document.getElementById('dropdown');
const categoriesList = document.getElementById('categories__list');
const othersList = document.getElementById('others-list');
const btnSpan = document.getElementById('categories-span');
const btns = document.getElementsByClassName('categories__btn');

othersBtn.addEventListener('click', openDropdown);

function openDropdown() {
  dropdown.classList.toggle('js-is-hidden');
  othersBtn.classList.toggle('is-active');
}

// Categories load from server

window.addEventListener('DOMContentLoaded', onPageLoad);

function onPageLoad() {
  const api = new SearchNews();

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
