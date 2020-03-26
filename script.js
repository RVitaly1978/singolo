
window.addEventListener('load', () => {
  doNavigation();
  doSlider();
  doPortfolioAction();
  doFormAction();
});

function doNavigation() {
  document.addEventListener('scroll', scrollHandler);

  const HEADER_NAVBAR = document.querySelector('#navbar');
  addHeaderNavbarHandlers();
  
  const HEADER_HAMBURGER = document.querySelector('#header-hamburger');
  addHamburgerHandlers();
  
  const ASIDE_MENU = document.querySelector('#aside-menu');
  addAsideMenuHandlers();

  let isNavLinksClick = false;
  let isAsideEnable = true;

  function addHeaderNavbarHandlers() {
    HEADER_NAVBAR.addEventListener('click', headerNavbarClickHandler);
  }
  
  function headerNavbarClickHandler(event) {
    if (event.target.tagName !== 'A') return;

    isNavLinksClick = true;
    navLinksClickHandler(event);
    removeFlagAfterScrollEnd(event);
  }

  function navLinksClickHandler(event) {
    if (event.target.tagName !== 'A') return;

    const navbar = event.target.closest('ul');
  
    navbar.querySelectorAll('a').forEach(elem => {
      removeClassName(elem, 'navbar__link--active');
    });
  
    addClassName(event.target, 'navbar__link--active');
  }
  
  function removeFlagAfterScrollEnd(event) {
    let timeout;

    document.addEventListener('scroll', () => {
      if (timeout !== false) {
        clearTimeout(timeout);
      }
    
      timeout = setTimeout(function() {
        const headerHeight = document.querySelector('header').offsetHeight;
        const blockID = event.target.getAttribute('href').substr(1);
        const elem = document.querySelector(`#${blockID}`);
  
        if (elem.getBoundingClientRect().top <= headerHeight + 1) {
          isNavLinksClick = false;
        }
      }, 100);
    });
  }
  
  function addHamburgerHandlers() {
    HEADER_HAMBURGER.addEventListener('click', hamburgerClickHandler);
    HEADER_HAMBURGER.addEventListener('touchstart', hamburgerClickHandler);
  }
  
  function addAsideMenuHandlers() {
    ASIDE_MENU.addEventListener('click', asideMenuClickHandler);
  }

  function asideMenuClickHandler(event) {
    if (event.target.closest('ul')) {
      asideNavLinksClickHandler(event);
    }

    if (event.target.id !== 'aside-menu') return;

    disableAsideMenu();
  }

  function asideNavLinksClickHandler(event) {
    if (event.target.tagName !== 'A') return;
  
    navLinksClickHandler(event);
    disableAsideMenu();
  }

  function hamburgerClickHandler(event) {
    if (isAsideEnable) {
      if (event.target.closest('BUTTON').classList.contains('hamburger--active')) {
        disableAsideMenu();
      } else {
        enableAsideMenu();
      }
    }
  }

  function disableAsideMenu() {
    removeClassName(HEADER_HAMBURGER, 'hamburger--active');
    hideAsideMenu();
  }

  function enableAsideMenu() {
    addClassName(HEADER_HAMBURGER, 'hamburger--active');
    showAsideMenu();
  }

  function showAsideMenu() {
    const asideMenuContent = ASIDE_MENU.firstElementChild;

    removeClassName(ASIDE_MENU, 'side-menu--hidden');
    addClassName(asideMenuContent, 'from-left');
    isAsideEnable = false;
    
    asideMenuContent.addEventListener('animationend', function () {
      removeClassName(this, 'from-left');
      isAsideEnable = true;
    }, { once: true });
  }

  function hideAsideMenu() {
    const asideMenuContent = ASIDE_MENU.firstElementChild;

    addClassName(asideMenuContent, 'to-left');
    isAsideEnable = false;
    
    asideMenuContent.addEventListener('animationend', function () {
      addClassName(ASIDE_MENU, 'side-menu--hidden');
      removeClassName(this, 'to-left');
      isAsideEnable = true;
    }, { once: true });
  }

  function scrollHandler() {
    if (isNavLinksClick) return;
  
    const headerHeight = document.querySelector('header').offsetHeight;
    const anchors = document.querySelectorAll('a.navbar__link');
    
    anchors.forEach((anchor) => {
      const blockID = anchor.getAttribute('href').substr(1);
      const elem = document.querySelector(`#${blockID}`);
    
      if ((elem.getBoundingClientRect().top <= headerHeight + 1)
        && (elem.getBoundingClientRect().bottom >= headerHeight + 1)) {
        if (!anchor.classList.contains('navbar__link--active')) {
          addClassName(anchor, 'navbar__link--active');
        }
      };
    
      if ((elem.getBoundingClientRect().top > headerHeight + 1)
        || (elem.getBoundingClientRect().bottom < headerHeight + 1)) {
        removeClassName(anchor, 'navbar__link--active');
      };
    })
  }
}

function doSlider() {
  const SLIDER = document.querySelector('#slider-container');
  addSliderHandlers();
  
  const items = SLIDER.querySelectorAll('.slider-list__item');

  let currentItem = 0;
  let isEnabled = true;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 100;
  let restraint = 100;
  let allowedTime = 500;

  function addSliderHandlers() {
    SLIDER.addEventListener('click', sliderClickHandler);
    SLIDER.addEventListener('mousedown', sliderMouseDownHandler);
    SLIDER.addEventListener('mouseup', sliderMouseUpHandler);
    SLIDER.addEventListener('touchstart', sliderTouchStartHandler);
    SLIDER.addEventListener('touchend', sliderTouchEndHandler);
  }

  function sliderClickHandler(e) {
    if (e.target.tagName === 'BUTTON') {
      sliderControlClickHandler(e);
    }

    if ((e.target.tagName === 'IMG')
      && (!e.target.classList.contains('phone__shadow'))) {
      phonesDisplayClickHandler(e);
    }
  }

  function sliderMouseDownHandler(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    
    // e.preventDefault();
  }

  function sliderMouseUpHandler(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime){
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    // e.preventDefault();
  }

  function sliderTouchStartHandler(e) {
    if (e.target.tagName === 'BUTTON') {
      sliderControlClickHandler(e);
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();

    // e.preventDefault();
  }

  function sliderTouchEndHandler(e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime){
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    // e.preventDefault();
  }
  
  function sliderControlClickHandler(e) {
    if (e.target.tagName !== 'BUTTON') return;

    if (e.target.classList.contains('slider__button--left')) {
      if (isEnabled) {
        previousItem(currentItem);
      }
    } else {
      if (isEnabled) {
        nextItem(currentItem);
      }
    }
  }

  function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
  }
  
  function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
  }

  function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
  }
  
  function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);

    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slider--active', direction);
    }, { once: true });
  }

  function showItem(direction) {
    items[currentItem].classList.add('slider--next', direction);
    setBackgroundToSliderSection(items[currentItem].dataset.bg_style);

    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slider--next', direction);
      this.classList.add('slider--active');
      isEnabled = true;
    }, { once: true });
  }

  function setBackgroundToSliderSection(style) {
    const SLIDER_SECTION = document.querySelector('#slider');
    SLIDER_SECTION.className = 'slider';
    SLIDER_SECTION.classList.add(style);
  }

  function phonesDisplayClickHandler(event) {
    if (event.target.tagName !== 'IMG') return;
    if (event.target.classList.contains('phone__shadow')) return;
  
    const phone = event.target.closest('div');
    phone.querySelector('img.phone__display').classList.toggle('phone__display--off');
  }
}

function doPortfolioAction() {
  const IMAGES_LIST = document.querySelector('#images-list');
  const TABS_LIST = document.querySelector('#tabs-list');
  addPortfolioHandlers();

  function addPortfolioHandlers() {
    const section = document.querySelector('#portfolio');

    section.addEventListener('click', (e) => {
      if (e.target.closest('.tabs-list')) {
        tabsClickHandler(e);
      }

      if (e.target.closest('.images-list')) {
        imagesClickHandler(e);
      }
    });
  }

  function imagesClickHandler(event) {
    if (event.target.tagName !== 'IMG') return;
  
    IMAGES_LIST.querySelectorAll('li').forEach(elem => {
      removeClassName(elem, 'images-list__item--active');
    });
  
    event.target.closest('li').classList.add('images-list__item--active');
  }

  function tabsClickHandler(event) {
    if (event.target.tagName !== 'BUTTON') return;
  
    TABS_LIST.querySelectorAll('button').forEach(elem => {
      removeClassName(elem, 'portfolio-tab--active');
    });
  
    addClassName(event.target, 'portfolio-tab--active');

    sortImages();
  }

  function sortImages() {
    const imagesList = [...IMAGES_LIST.querySelectorAll('li')];
    const random = getRandomInRange(imagesList.length);
  
    for (let i = 0; i < imagesList.length; i += 1) {
      if (i >= random) {
        IMAGES_LIST.prepend(imagesList[i]);
      }
    }
  }

  function getRandomInRange(max, min = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

function doFormAction() {
  const QUOTE_FORM = document.querySelector('#quote-form');
  const MODAL = document.querySelector('#modal');
  const MODAL_MESSAGE_BTN = document.querySelector('#message-btn');
  addFormHandlers();

  let isModal = false;

  function addFormHandlers() {
    QUOTE_FORM.addEventListener('submit', formSubmitHandler);
    MODAL.addEventListener('click', modalClickHandler);
    MODAL.addEventListener('touchmove', modalTouchMoveHandler);

    document.addEventListener('keydown', (event) => {
      if (isModal) {
        if ((event.key === 'Enter')
          || (event.key === 'Escape')) {
          modalMessageButtonHandler();
        }
  
        event.preventDefault();
      }
    });
  }
  
  function modalTouchMoveHandler(e) {
    if (event.target.classList.contains('message__text--limit-height')) {
      return;
    }

    e.preventDefault();
  }

  function formSubmitHandler(event) {
    this.checkValidity();
    event.preventDefault();
  
    const subjectInput = this.querySelector('#input-subject');
    const describeTextarea = this.querySelector('#input-description');
    
    if (subjectInput.value.toString() !== '') {
      MODAL.querySelector('#message-subject').innerText = `Тема: ${subjectInput.value.toString()}`;
    } else {
      MODAL.querySelector('#message-subject').innerText = 'Без темы';
    }
  
    if (describeTextarea.value.toString() !== '') {
      MODAL.querySelector('#message-describe-empty').innerText = `Описание:`;
      MODAL.querySelector('#message-describe').innerText = `${describeTextarea.value.toString()}`;
    } else {
      MODAL.querySelector('#message-describe-empty').innerText = 'Без описания';
      MODAL.querySelector('#message-describe').innerText = '';
    }
  
    MODAL.className = 'modal--visible';
    isModal = true;
    removeScrollInBody();
    MODAL_MESSAGE_BTN.focus();
  }

  function modalClickHandler(event) {
    if (event.target.id === 'modal') {
      modalMessageButtonHandler();
    }

    if (event.target.id === 'message-btn') {
      modalMessageButtonHandler();
    }
  }
  
  function modalMessageButtonHandler() {
    MODAL.className = 'modal--hidden';
    isModal = false;
    addScrollInBody();
    clearFormData();
  }

  function clearFormData() {
    QUOTE_FORM.reset();
  }
}

// Common ------------------------------------------------------

function removeScrollInBody() {
  const bodyClientWidthBefore = document.body.clientWidth;
  document.body.style.overflow = 'hidden';
  const bodyClientWidthAfter = document.body.clientWidth;

  if (bodyClientWidthAfter - bodyClientWidthBefore) {
    document.body.style.paddingRight = `${bodyClientWidthAfter - bodyClientWidthBefore}px`;
  }
}

function addScrollInBody() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '0';
}

function removeClassName(elem, className) {
  elem.classList.remove(className);
}

function addClassName(elem, className) {
  elem.classList.add(className);
}
