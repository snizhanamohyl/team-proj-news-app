import {  } from './search-news'

import SearchNews from './api';
import { createMarkup, createMostPopularMarkup } from './markup-function';

const refs = {
  pg: document.getElementById('pagination'),
  btnNextPg: document.querySelector('.next-page'),
  btnPrevPg: document.querySelector('.prev-page'),
  pageContainer: document.querySelector('.pagination-container'),
};


// const res = [{
//   title: "Cat1",
// },
// {
//   title: "Dog1",
// },
// {
//   title: "Mouse1",
// },
// {
//   title: "Cat2",
// },
// {
//   title: "Dog2",
// },
// {
//   title: "Mouse2",
// },
// {
//   title: "Cat3",
// },
// {
//   title: "Dog3",
// },
// {
//   title: "Mouse3",
// },
// {
//   title: "Cat4",
// },
// {
//   title: "Dog4",
// },
// {
//   title: "Mouse4",
// },
// {
//   title: "Cat5",
// },
// {
//   title: "Dog5",
// },
// {
//   title: "Mouse5",
// },
// ];

let itemsPerPage = 0;
// let totalItem = res.length;


if(window.innerWidth < 768) {
    itemsPerPage = 4;
}
if(window.innerWidth >= 768 && window.innerWidth < 1280) {
    itemsPerPage = 7;
}
if(window.innerWidth >= 1280) {
    itemsPerPage = 8;
}


const valuePage =  {
  curPage: 1,
  numLinksTwoSide: 1,
  // totalPages: Math.ceil(totalItem / itemsPerPage),
};

let totalPages = 0;



const form = document.getElementById('form-field');
const imageNoResults = document.getElementById('img-noresults');

const searchNews = new SearchNews();

searchNews
  .mostPopularNews()
  .then(res => {
    console.log("itemsPerPage: ", itemsPerPage);

    const articles = res.data.results;
    totalItem = articles.length;
    totalPages = Math.ceil(totalItem / itemsPerPage);
    let arrToPopularMarkup = showPage(articles);
    // console.log("arrToPopularMarkup: ", arrToPopularMarkup);
    // console.log("articles: ", articles);
    const gallery = document.getElementById('news-list');

    let markup = createMostPopularMarkup(arrToPopularMarkup);
    gallery.innerHTML = markup;
    pagination();
    refs.pg.addEventListener('click', e => {
      const elem = e.target;
    
      if (elem.dataset.page) {
        const pageNumber = parseInt(elem.dataset.page, 10);
    
        valuePage.curPage = pageNumber;
        arrToPopularMarkup = showPage(articles);
        markup = createMostPopularMarkup(arrToPopularMarkup);
        gallery.innerHTML = markup;


        pagination(valuePage);
        // console.log(valuePage);
        handleButtonLeft();
        handleButtonRight();
      }
    });
    refs.pageContainer.addEventListener('click', function (e) {
      handleButton(e.target);
      arrToPopularMarkup = showPage(articles);
      markup = createMostPopularMarkup(arrToPopularMarkup);
      gallery.innerHTML = markup;
    });
  })
  .catch(console.log);




form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  imageNoResults.style.display = 'none';
  valuePage.curPage = 1;

  const form = e.currentTarget;
  searchNews.searchQuery = form.elements.searchQuery.value.trim();

  findNews();

  async function findNews() {
    let gallery = document.getElementById('news-list');
    try {
      const newSearch = await searchNews.searchNews();
      // console.log("newSearch: ", newSearch);
      if (newSearch.data.response.docs.length === 0) {
        throw new Error('no results');
      }
      const articles = newSearch.data.response.docs;
      // console.log("articles: ", articles);

      totalItem = articles.length;
      totalPages = 20;
      

      let arrToMarkup = showPage(articles);
      let markup = createMarkup(arrToMarkup);

      gallery.innerHTML = markup;

      pagination();

      refs.pg.addEventListener('click', e => {
        const elem = e.target;
      
        if (elem.dataset.page) {
          const pageNumber = parseInt(elem.dataset.page, 10);

          valuePage.curPage = pageNumber;
          arrToMarkup = showPage(articles);
          markup = createMarkup(arrToMarkup);
          gallery.innerHTML = markup;
  
  
          pagination(valuePage);
          // console.log(valuePage);
          handleButtonLeft();
          handleButtonRight();
        }
      });


      refs.pageContainer.addEventListener('click', function (e) {
        handleButton(e.target);
        arrToMarkup = showPage(articles);
        markup = createMarkup(arrToMarkup);
        gallery.innerHTML = markup;
        console.log("valuePage.curPage: ", valuePage.curPage);
      });

    } catch (err) {
      console.log('ERROR', err);
      gallery.innerHTML = '';
      imageNoResults.style.display = 'block';
    } finally {
      form.reset();
    }
  }
}






















// console.log("totalPages: ", valuePage.totalPages);
// showPage(res);
// pagination();



function showPage(data) {
  const startIndex = (valuePage.curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // console.log("Обрізаний масив: ", value.slice(startIndex, endIndex))
  return data.slice(startIndex, endIndex);
};



// console.log("window.innerWidth: ", window.innerWidth);
// console.log("itemsPerPage: ", itemsPerPage);


// refs.pg.addEventListener('click', e => {
//     const elem = e.target;
  
//     if (elem.dataset.page) {
//       const pageNumber = parseInt(elem.dataset.page, 10);
  
//       valuePage.curPage = pageNumber;
//       pagination(valuePage);
//       showPage(res);
//       // console.log(valuePage);
//       handleButtonLeft();
//       handleButtonRight();
//     }
//   });



// refs.pageContainer.addEventListener('click', function (e) {
//   handleButton(e.target, res);
// });

// DYNAMIC PAGINATION

  function pagination() {
    const { curPage, numLinksTwoSide: delta } = valuePage;
    let range = delta + 2;

    let numberTruncateLeft;
    let numberTruncateRight;

    if(window.innerWidth < 768) {
      numberTruncateLeft = curPage;
      numberTruncateRight = curPage;
    };
    if(window.innerWidth >= 768) {
      range = delta + 4;
      numberTruncateRight = curPage + delta;
      numberTruncateLeft = curPage - delta;
    };

    // const range = delta; // use for handle visible number of links left side
  
    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pg-item-dot"><a class="pg-link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side
  
    // use for truncate two side
    // const numberTruncateLeft = curPage;
    // const numberTruncateRight = curPage;
  
    let active = '';
    for (let pos = 1; pos <= totalPages; pos+=1) {
      active = pos === curPage ? 'active' : '';
  
      // truncate
      if (totalPages >= 2 * range - 1) {
        if (numberTruncateLeft > 2 && numberTruncateRight < totalPages - 2 + 1) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide += renderPage(pos, active);
          }
        } else {
          // truncate left side or right side
          if (
            (curPage < range && pos <= range) ||
            (curPage > totalPages - range && pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render += renderPage(pos, active);
          } else {
            countTruncate++;
            if (countTruncate === 1) render += dot;
          }
        }
      } else {
        // not truncate
        render += renderPage(pos, active);
      }
    }
  
    if (renderTwoSide) {
      renderTwoSide =
        renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
      refs.pg.innerHTML = renderTwoSide;
    } else {
      refs.pg.innerHTML = render;
    }
  }
  
  function renderPage(index, active = '') {
    return ` 
      <li class="pg-item ${active}" data-page="${index}">
          <a class="pg-link" href="#">${index}</a>
      </li>
    `;
  }
  
  function handleButton(element) {
    if (element.classList.contains('prev-page')) {
      valuePage.curPage-=1;
      handleButtonLeft();
      handleButtonRight();
      // refs.btnNextPg.disabled = false;
      //  btnLastPg.disabled = false;
    } else if (element.classList.contains('next-page')) {
      valuePage.curPage+=1;
      handleButtonRight();
      handleButtonLeft();
      // refs.btnPrevPg.disabled = false;
      //  btnFirstPg.disabled = false;
    }
    pagination();
  }

  function handleButtonLeft() {
    if (valuePage.curPage === 1) {
      console.log("valuePage.curPage: ", valuePage.curPage);
      refs.btnPrevPg.disabled = true;
      //  btnFirstPg.disabled = true;
    } else {
      refs.btnPrevPg.disabled = false;
      //  btnFirstPg.disabled = false;
    }
  }

  function handleButtonRight() {
    if (valuePage.curPage === totalPages) {
      console.log("valuePage.curPage: ", valuePage.curPage);
    //   console.log(valuePage.curPage);
    refs.btnNextPg.disabled = true;
      //  btnLastPg.disabled = true;
    } else {
      refs.btnNextPg.disabled = false;
      //  btnLastPg.disabled = false;
    }
  };


export {  };