!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequired7c6=o);var a=o("bpxeT"),s=o("2TvXO"),i=o("b7ONl"),l=o("kxOFy"),c=document.getElementById("others"),d=document.getElementById("dropdown"),u=document.getElementById("others-list"),f=document.getElementById("categories-span"),g=document.getElementsByClassName("categories__btn"),p=document.getElementById("categories__list"),y=document.getElementById("categories__arrow"),m=document.getElementById("img-noresults"),w=document.getElementById("news-list"),v=new(0,i.default);function x(){d.classList.toggle("js-is-hidden"),c.classList.toggle("is-active")}function E(e){return'<li><button class="dropdown-item" type="button">'.concat(e,"</button></li>")}function b(e){u.insertAdjacentHTML("beforeend",e)}function h(){return L.apply(this,arguments)}function L(){return(L=e(a)(e(s).mark((function t(){var n,r,o,a;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(m.style.display="none",e.prev=1,n=JSON.parse(localStorage.getItem("date")),v.dateFilter=n,""!==v.dateFilter){e.next=17;break}return e.next=8,v.categoryNews();case 8:if(null!==(r=e.sent).data.results){e.next=11;break}throw new Error("no results");case 11:console.log(r.data.results),o=(0,l.createCategoriesMarkup)(r.data.results),w.innerHTML="",w.innerHTML=o,e.next=26;break;case 17:return e.next=19,v.categoryNewsWithDate();case 19:if(null!==(r=e.sent).data.results){e.next=22;break}throw new Error("no results");case 22:console.log(r.data.results),a=(0,l.createCategoriesMarkup)(r.data.results),w.innerHTML="",w.innerHTML=a;case 26:e.next=33;break;case 28:e.prev=28,e.t0=e.catch(1),console.log("ERROR",e.t0),w.innerHTML="",m.style.display="block";case 33:case"end":return e.stop()}}),t,null,[[1,28]])})))).apply(this,arguments)}c.addEventListener("click",x),window.addEventListener("DOMContentLoaded",(function(){v.categoryList().then((function(e){return e.data.results})).then((function(e){window.innerWidth<768&&(f.textContent="Categories",function(e){for(var t=0;t<50;t+=1){b(E(e[t].display_name))}}(e)),function(e){for(var t=0;t<6;t+=1)g[t].textContent=e[t].display_name}(e),function(e){for(var t=0;t<44;t+=1){b(E(e[t+6].display_name))}}(e)}))})),p.addEventListener("click",(function(e){var t=e.target;if(v.category=t.textContent.toLowerCase(),"others"===v.category||t===c||t===y)return;h()})),u.addEventListener("click",(function(e){x();var t=e.target,n=encodeURIComponent(t.textContent.toLowerCase());v.category=n,h()}))}();
//# sourceMappingURL=index.3e3bc3d6.js.map
