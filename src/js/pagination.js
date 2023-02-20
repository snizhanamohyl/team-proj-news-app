import {  } from './search-news'



const refs = {
  pg: document.getElementById('pagination'),
  btnNextPg: document.querySelector('.next-page'),
  btnPrevPg: document.querySelector('.prev-page'),
  pageContainer: document.querySelector('.pagination-container'),
};


const res = [{
  title: "Cat1",
},
{
  title: "Dog1",
},
{
  title: "Mouse1",
},
{
  title: "Cat2",
},
{
  title: "Dog2",
},
{
  title: "Mouse2",
},
{
  title: "Cat3",
},
{
  title: "Dog3",
},
{
  title: "Mouse3",
},
{
  title: "Cat4",
},
{
  title: "Dog4",
},
{
  title: "Mouse4",
},
{
  title: "Cat5",
},
{
  title: "Dog5",
},
{
  title: "Mouse5",
},
];

let itemsPerPage = 0;
let totalItem = res.length;


// if(window.innerWidth < 768) {
//     itemsPerPage = 4;
// }
// if(window.innerWidth > 768 && window.innerWidth < 1280) {
//     itemsPerPage = 7;
// }
// if(window.innerWidth >= 1280) {
//     itemsPerPage = 8;
// }

const valuePage =  {
  curPage: 1,
  numLinksTwoSide: 1,
};

let totalPages = Math.ceil(totalItem / itemsPerPage);
// console.log("totalPage: ", totalPages);


showPage(res);
console.log("showPage(res): ", showPage(res));
pagination();


function showPage(data) {
  const startIndex = (valuePage.curPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // console.log("Обрізаний масив: ", value.slice(startIndex, endIndex))
  return data.slice(startIndex, endIndex);
};



console.log("window.innerWidth: ", window.innerWidth);
console.log("itemsPerPage: ", itemsPerPage);


refs.pg.addEventListener('click', e => {
    const elem = e.target;
  
    if (elem.dataset.page) {
      const pageNumber = parseInt(elem.dataset.page, 10);
  
      valuePage.curPage = pageNumber;
      pagination(valuePage);
      // console.log(valuePage);
      handleButtonLeft();
      handleButtonRight();
    }
  });

refs.pageContainer.addEventListener('click', function (e) {

  handleButton(e.target, res);
});

// DYNAMIC PAGINATION

  function pagination() {
    const { curPage, numLinksTwoSide: delta } = valuePage;
  
    const range = delta + 4; // use for handle visible number of links left side
  
    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pg-item-dot"><a class="pg-link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side
  
    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;
  
    let active = '';
    for (let pos = 1; pos <= totalPages; pos+=1) {
      active = pos === curPage ? 'active' : '';
  
      // truncate
      if (totalPages >= 2 * range - 1) {
        if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
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
  
  function handleButton(element, data) {
    if (element.classList.contains('prev-page')) {
      valuePage.curPage-=1;
      handleButtonLeft();
      refs.btnNextPg.disabled = false;
      //  btnLastPg.disabled = false;
    } else if (element.classList.contains('next-page')) {
      valuePage.curPage+=1;
      handleButtonRight();
      refs.btnPrevPg.disabled = false;
      //  btnFirstPg.disabled = false;
    }
    showPage(data);
    console.log("showPage(data): ", showPage(data));
    pagination();
  }

  function handleButtonLeft() {
    if (valuePage.curPage === 1) {
      refs.btnPrevPg.disabled = true;
      //  btnFirstPg.disabled = true;
    } else {
      refs.btnPrevPg.disabled = false;
      //  btnFirstPg.disabled = false;
    }
  }

  function handleButtonRight() {
    if (valuePage.curPage === totalPages) {
    //   console.log(valuePage.curPage);
    refs.btnNextPg.disabled = true;
      //  btnLastPg.disabled = true;
    } else {
      refs.btnNextPg.disabled = false;
      //  btnLastPg.disabled = false;
    }
  };


export {  };