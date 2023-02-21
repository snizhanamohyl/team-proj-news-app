const bodyRef = document.querySelector('body');
const themeSwitcher = document.querySelectorAll('.switch-checkbox');
const currentTheme = localStorage.getItem('current-page-theme');

themeSwitcher.forEach(switcher => {
  switcher.addEventListener('change', onThemeSwitch);
});
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
  localStorage.setItem('current-page-theme', current);
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
    themeSwitcher.forEach(switcher => {
      switcher.checked = true;
    });
  }
}
