!function(){var e=document.querySelector("body"),t=document.querySelector(".switch-checkbox"),c="page-dark-theme",a=localStorage.getItem(c);function o(e){localStorage.setItem(c,e)}function d(){e.classList.add("dark")}t.addEventListener("change",(function(){this.checked?(d(),o("dark")):(e.classList.remove("dark"),o("light"))})),"dark"===a&&(d(),t.checked=!0)}();
//# sourceMappingURL=favorite.1754a05f.js.map
