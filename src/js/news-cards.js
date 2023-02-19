
const MAX_LENGTH_TEXT = 112;
const textEl = document.querySelectorAll(".news-card__text");

const filteredArr = Array.from(textEl).filter((elem) => {
    return elem.textContent.length >= MAX_LENGTH_TEXT
})


const filteredText = filteredArr.forEach((elem) => {
    const textValue = elem.textContent.slice(0, MAX_LENGTH_TEXT);
    return elem.textContent = textValue + "...";
});
 

/////////////////////////////////////////////////////////////////

const favoriteBtn = document.querySelectorAll(".favorite-btn");
const favoriteIcon = document.querySelectorAll(".icon-js")
const ACTIVE_ICON = "/sprite.f14d31f7.svg#icon-icons-heart-active";
const INACTIVE_ICON = "/sprite.f14d31f7.svg#icon-icons-heart-no-active";


const BtnArr = Array.from(favoriteBtn).forEach(btn => {
    btn.addEventListener("click", OnChangeFavoriteIcon)
});

function OnChangeFavoriteIcon(e) {
    const btnEl = e.target;
    const iconSVG = btnEl.lastElementChild;
    const useSVG = iconSVG.lastElementChild;
    btnEl.classList.toggle("is-selected");

    if (btnEl.classList.contains("is-selected")) {
        useSVG.href.baseVal = ACTIVE_ICON;
    }
    
    if (!btnEl.classList.contains("is-selected")) {
        useSVG.href.baseVal = INACTIVE_ICON;
    }
    
  
}
// ///////////////////////////////////////////////////////////////////////
const linkEl = document.querySelectorAll('.news-card__link');




const linkArr = Array.from(linkEl).forEach(link => {
    link.addEventListener("click", onReadАrticle);
})


function onReadАrticle(e) {
    const currentLink = e.target;
   
    const currentArticle = currentLink.closest("article");
    currentArticle.classList.add("is-hidden");
    
    
}


