var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var r=o("7rYDH"),i=o("bZeYP");const s=document.getElementById("others"),d=document.getElementById("dropdown"),a=document.getElementById("others-list"),l=document.getElementById("categories-span"),c=document.getElementsByClassName("categories__btn"),u=document.getElementById("categories__list"),g=document.getElementById("categories__arrow"),f=document.getElementById("img-noresults"),y=document.getElementById("news-list"),m=new(0,r.default);function p(){d.classList.toggle("js-is-hidden"),s.classList.toggle("is-active")}function w(e){return`<li><button class="dropdown-item" type="button">${e}</button></li>`}function E(e){a.insertAdjacentHTML("beforeend",e)}async function L(){f.style.display="none";try{const e=await m.categoryNews();if(null===e.data.results)throw new Error("no results");const t=(0,i.createCategoriesMarkup)(e.data.results);y.innerHTML="",y.innerHTML=t}catch(e){console.log("ERROR",e),y.innerHTML="",f.style.display="block"}}s.addEventListener("click",p),window.addEventListener("DOMContentLoaded",(function(){m.categoryList().then((e=>e.data.results)).then((e=>{window.innerWidth<768&&(l.textContent="Categories",function(e){for(let t=0;t<50;t+=1){E(w(e[t].display_name))}}(e)),function(e){for(let t=0;t<6;t+=1)c[t].textContent=e[t].display_name}(e),function(e){for(let t=0;t<44;t+=1){E(w(e[t+6].display_name))}}(e)}))})),u.addEventListener("click",(function(e){const t=e.target;if(m.category=t.textContent.toLowerCase(),"others"===m.category||t===s||t===g)return;L()})),a.addEventListener("click",(function(e){p();const t=e.target,n=encodeURIComponent(t.textContent.toLowerCase());m.category=n,L()}));
//# sourceMappingURL=index.65894f9b.js.map
