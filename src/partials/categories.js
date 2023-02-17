const othersBtn = document.getElementById('others');

const dropdown = document.getElementById('dropdown');

othersBtn.addEventListener('click', openDropdown);

function openDropdown() {
  dropdown.classList.toggle('js-is-hidden');
}
