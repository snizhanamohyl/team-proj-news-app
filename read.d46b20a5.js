var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},e.parcelRequired7c6=t);var o=t("bZeYP");const i=document.querySelector(".date-list");!function(e){const r=Object.entries(e).reduce(((e,r)=>e+(0,o.createReadListMarkup)(r[0],(0,o.createCardReadMarkup)(r[1]))),"");i.innerHTML="",i.innerHTML=r}(function(){const e=JSON.parse(localStorage.getItem("read-articles"));return e||{}}());
//# sourceMappingURL=read.d46b20a5.js.map
