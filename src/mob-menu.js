const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
  
function toggleMenu() {
    mobileMenu.classList.toggle('is-open');
    if (mobileMenu.classList.contains('is-open')){
        document.body.style.position = 'fixed';
    } else {
        document.body.style.position = '';
    }
};
  
openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
