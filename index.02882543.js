!function(){setInterval((function(){var e,t;e=112,t=document.querySelectorAll(".news-card__text"),Array.from(t).filter((function(t){return t.textContent.length>=e})).forEach((function(t){var s=t.textContent.slice(0,e);return t.textContent=s+"..."}))}),500);var e;e=setInterval((function(){var e=document.querySelectorAll(".icon-js");Array.from(e).forEach((function(e){return e.href.baseVal="/sprite.74cebf96.svg#icon-icons-heart-no-active"}))}),500);function t(){return'Remove from favorite <svg class="favorite-btn__icon" width="16" height="16">\n            <use class="icon-js" href="'.concat("./sprite.74cebf96.svg#icon-icons-heart-active",'"></use></svg>')}function s(){return'Add to favorite <svg class="favorite-btn__icon" width="16" height="16">\n            <use class="icon-js" href="'.concat("./sprite.74cebf96.svg#icon-icons-heart-no-active",'"></use></svg>')}document.querySelector(".card-set").addEventListener("click",(function(n){if(clearInterval(e),"BUTTON"!==n.target.nodeName&&"svg"!==n.target.nodeName&&"use"!==n.target.nodeName&&"A"!==n.target.nodeName)return;if("BUTTON"===n.target.nodeName){var i=n.target;i.classList.toggle("is-selected"),i.classList.contains("is-selected")&&(i.innerHTML=t()),i.classList.contains("is-selected")||(i.innerHTML=s())}if("svg"===n.target.nodeName){var c=n.target.parentNode;c.classList.toggle("is-selected"),c.classList.contains("is-selected")&&(c.innerHTML=t()),c.classList.contains("is-selected")||(c.innerHTML=s())}if("use"===n.target.nodeName){var a=n.target.closest("button");a.classList.toggle("is-selected"),a.classList.contains("is-selected")&&(a.innerHTML=t()),a.classList.contains("is-selected")||(a.innerHTML=s())}if("A"===n.target.nodeName){var r=n.target.closest("article");r.childNodes[1].children[2].style.opacity="1",r.childNodes[1].children[0].children[0].classList.add("is-hidden"),r.childNodes[3].classList.add("is-hidden"),r.childNodes[5].classList.add("is-hidden"),r.childNodes[7].classList.add("is-hidden")}}))}();
//# sourceMappingURL=index.02882543.js.map