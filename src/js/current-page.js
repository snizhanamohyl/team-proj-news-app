const currentPage = document.location.pathname;
const navItemsRef = document.querySelectorAll('.navbar__link');

navItemsRef.forEach(addCurrentPageClass);

function addCurrentPageClass(navItem) {
  if (navItem.pathname === currentPage) {
    navItemsRef[0].classList.remove('navbar__link--current');
    navItem.classList.add('navbar__link--current');
  }
}
