!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,r){n[e]=r},e.parcelRequired7c6=t);var o,i,a=t("kxOFy"),d=document.querySelector(".date-list"),l=JSON.parse(localStorage.getItem("read-articles"))||{};o=l,i=Object.entries(o).reduce((function(e,r){return e+(0,a.createReadListMarkup)(r[0],(0,a.createCardReadMarkup)(r[1]))}),""),d.innerHTML="",d.innerHTML=i}();
//# sourceMappingURL=read.bf116729.js.map
