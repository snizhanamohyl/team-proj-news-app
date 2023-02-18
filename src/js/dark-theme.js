const bodyRef = document.querySelector('body');
const themeSwitcher = document.querySelector('.switch-checkbox');
const DARK_THEME = 'page-dark-theme';
const currentTheme = localStorage.getItem(DARK_THEME);

themeSwitcher.addEventListener('change', onThemeSwitch);
onPageLoad();

function onThemeSwitch() {
  if (this.checked) {
    addClass();
    saveCurrentToLS('dark');
  } else {
    removeClass();
    saveCurrentToLS('light');
  }
}

function saveCurrentToLS(current) {
  localStorage.setItem(DARK_THEME, current);
}

function addClass() {
  bodyRef.classList.add('dark');
}

function removeClass() {
  bodyRef.classList.remove('dark');
}

function onPageLoad() {
  if (currentTheme === 'dark') {
    addClass();
    themeSwitcher.checked = true;
  }
}
