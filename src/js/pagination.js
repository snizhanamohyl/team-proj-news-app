const refs = {
  pg: document.getElementById('pagination'),
  btnNextPg: document.querySelector('.next-page'),
  btnPrevPg: document.querySelector('.prev-page'),
  pageContainer: document.querySelector('.pagination-container'),
};

const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 10,
};

pagination();


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

refs.pageContainer.addEventListener('click', function (e) {handleButton(e.target)});

// DYNAMIC PAGINATION

  function pagination() {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;
  
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
  
  function handleButton(element) {
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
    if (valuePage.curPage === valuePage.totalPages) {
    //   console.log(valuePage.curPage);
    refs.btnNextPg.disabled = true;
      //  btnLastPg.disabled = true;
    } else {
      refs.btnNextPg.disabled = false;
      //  btnLastPg.disabled = false;
    }
  }