var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var s={id:e,exports:{}};return t[e]=s,o.call(s.exports,s,s.exports),s.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var s=o("7rYDH");const i=document.getElementById("others"),a=document.getElementById("dropdown"),r=document.getElementById("others-list"),c=document.getElementById("categories-span"),l=document.getElementsByClassName("categories__btn"),d=document.getElementById("categories__list"),u=document.getElementById("categories__arrow"),g=document.getElementById("img-noresults"),f=document.querySelector(".card-set"),m=new(0,s.default);function p(){a.classList.toggle("js-is-hidden"),i.classList.toggle("is-active")}function w(e){return`<li><button class="dropdown-item" type="button">${e}</button></li>`}function y(e){r.insertAdjacentHTML("beforeend",e)}async function _(){g.style.display="none";try{const e=await m.categoryNews();if(null===e.data.results)throw new Error("no results");const t=e.data.results.map((({url:e,abstract:t,title:n,updated_date:o,multimedia:s,section:i})=>`<li class="news-card">\n        <article>\n         <div class="box-img">\n        <div class="news-card__img"><img src=${s[2].url} alt="img-news" height = "395">\n        </div>\n            <p class="box-img__inform">${i}</p>\n            <button type="button" class="favorite-btn">\n                Add to favorite\n                <svg class="favorite-btn__icon" width="16" height="16">\n                    <use class="icon-js" href="./images/sprite.svg#icon-icons-heart-no-active"></use>\n                </svg>\n            </button>\n        </div>\n        <h2 class="news-card__title">${n}</h2>\n        <p class="news-card__text">${t}</p>\n        <div class="news-card__inform">\n            <p class="news-card__date">\n\t\t\t\t\t\t${o.split("").splice(0,10).join("").replaceAll("-","/")}</p>\n            <a class="news-card__link" target="_blank" href="${e}">\n                Read more\n            </a>\n        </div>\n      </article>\n    </li>   \n`)).join("");f.innerHTML="",f.innerHTML=t}catch(e){console.log("ERROR",e),f.innerHTML="",g.style.display="block"}}i.addEventListener("click",p),window.addEventListener("DOMContentLoaded",(function(){m.categoryList().then((e=>e.data.results)).then((e=>{window.innerWidth<768&&(c.textContent="Categories",function(e){for(let t=0;t<50;t+=1){y(w(e[t].display_name))}}(e)),function(e){for(let t=0;t<6;t+=1)l[t].textContent=e[t].display_name}(e),function(e){for(let t=0;t<44;t+=1){y(w(e[t+6].display_name))}}(e)}))})),d.addEventListener("click",(function(e){const t=e.target;if(m.category=t.textContent.toLowerCase(),"others"===m.category||t===i||t===u)return;_()})),r.addEventListener("click",(function(e){p();const t=e.target,n=encodeURIComponent(t.textContent.toLowerCase());m.category=n,_()}));
//# sourceMappingURL=index.4effcef6.js.map
