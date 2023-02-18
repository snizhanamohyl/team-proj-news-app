import SearchNews from '../js/api';

// Categories drop-down list

const othersBtn = document.getElementById('others');
const dropdown = document.getElementById('dropdown');
const btns = document.getElementsByClassName('categories__btn');
const dropDownBtns = document.getElementsByClassName('dropdown-item');

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
      console.log(categories);
      for (let i = 0; i < 6; i += 1) {
        btns[i].textContent = categories[i].display_name;
      }
      otherCategories(categories);
    });
}

function otherCategories(categories) {
  for (let i = 0; i < 12; i += 1) {
    dropDownBtns[i].textContent = categories[i + 6].display_name;
  }
}
