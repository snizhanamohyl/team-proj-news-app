import SearchNews from './api';

const othersBtn = document.getElementById('others');
const dropdown = document.getElementById('dropdown');
const othersList = document.getElementById('others-list');
const btnSpan = document.getElementById('categories-span');
const btns = document.getElementsByClassName('categories__btn');

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
