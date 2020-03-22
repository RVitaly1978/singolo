
window.addEventListener('load', () => {
  const NAVBAR = document.querySelector('#navbar');
  addNavLinksClickHandler(NAVBAR);

  const LEFT_CONTROL = document.querySelector('.slider__button.slider__button--left');
  const RIGHT_CONTROL = document.querySelector('.slider__button.slider__button--right');
  addSliderControlsClickHandler(LEFT_CONTROL, RIGHT_CONTROL);

  const SLIDER_LIST = document.querySelector('#slider-list');
  addPhonesScreenClickHandler(SLIDER_LIST);
  
  const IMAGES_LIST = document.querySelector('#images-list');
  addImagesListClickHandler(IMAGES_LIST);
  
  const TABS_LIST = document.querySelector('#tabs-list');
  addTabsImagesClickHandler(TABS_LIST, IMAGES_LIST);
  
  const QUOTE_FORM = document.querySelector('#quote-form');
  const MODAL_MESSAGE_BTN = document.querySelector('#message-btn');
  addFormSubmitHandler(QUOTE_FORM, MODAL_MESSAGE_BTN);
});

function addNavLinksClickHandler(navbar) {
  navbar.addEventListener('click', navbarHandler);
  document.addEventListener('scroll', scrollHandler);

  isNavLinksClick = false;

  function navbarHandler(event) {
    if (event.target.tagName !== 'A') return;
    isNavLinksClick = true;
  
    this.querySelectorAll('a').forEach(elem => {
      elem.classList.remove('navbar__link--active');
    });
  
    event.target.classList.add('navbar__link--active');

    removeFlagAfterScrollEnd(event);
  }
  
  function removeFlagAfterScrollEnd(event) {
    let timeout;

    document.addEventListener('scroll', () => {
      if (timeout !== false) {
        clearTimeout(timeout);
      }
    
      timeout = setTimeout(function() {
        const headerHeight = document.querySelector('header').getBoundingClientRect().height;
        const blockID = event.target.getAttribute('href').substr(1);
        const elem = document.querySelector(`#${blockID}`);
  
        if (elem.getBoundingClientRect().top <= headerHeight + 1) {
          isNavLinksClick = false;
        }
      }, 100);
    });
  }

  function scrollHandler() {
    if (isNavLinksClick) return;

    const headerHeight = document.querySelector('header').getBoundingClientRect().height;
    const anchors = document.querySelectorAll('a.navbar__link');
    
    anchors.forEach((anchor) => {
      const blockID = anchor.getAttribute('href').substr(1);
      const elem = document.querySelector(`#${blockID}`);
    
      if ((elem.getBoundingClientRect().top <= headerHeight + 1)
        && (elem.getBoundingClientRect().bottom >= headerHeight + 1)) {
        if (!anchor.classList.contains('navbar__link--active')) {
          anchor.classList.add('navbar__link--active');
        }
      };
    
      if ((elem.getBoundingClientRect().top > headerHeight + 1)
        || (elem.getBoundingClientRect().bottom < headerHeight + 1)) {
          anchor.classList.remove('navbar__link--active');
      };
    })
  }
}

function addSliderControlsClickHandler(prevButton, nextButton) {
  prevButton.addEventListener('click', leftControlClickHandler);
  nextButton.addEventListener('click', rightControlClickHandler);

  const SLIDER_LIST = document.querySelector('#slider-list');
  const items = SLIDER_LIST.querySelectorAll('.slider-list__item');
  let currentItem = 0;
  let isEnabled = true;

  function leftControlClickHandler() {
    if (isEnabled) {
      previousItem(currentItem);
    }
  }
  
  function rightControlClickHandler() {
    if (isEnabled) {
      nextItem(currentItem);
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
    });
  }

  function showItem(direction) {
    items[currentItem].classList.add('slider--next', direction);
    setBackgroundToSliderSection(items[currentItem].dataset.bg_style);
    items[currentItem].addEventListener('animationend', function() {
      this.classList.remove('slider--next', direction);
      this.classList.add('slider--active');
      isEnabled = true;
    });
  }

  function setBackgroundToSliderSection(style) {
    const SLIDER_SECTION = document.querySelector('#slider');
    SLIDER_SECTION.className = 'slider';
    SLIDER_SECTION.classList.add(style);
  }
}

function addPhonesScreenClickHandler(sliderList) {
  sliderList.addEventListener('click', sliderScreenClickHandler);

  function sliderScreenClickHandler(event) {
    if (event.target.tagName !== 'IMG') return;
    if (event.target.classList.contains('phone__shadow')) return;
  
    const phone = event.target.closest('div');
  
    phone.querySelector('img.phone__display').classList.toggle('phone__display--off');
  }
}

function addImagesListClickHandler(imagesList) {
  imagesList.addEventListener('click', imagesClickHandler);

  function imagesClickHandler(event) {
    if (event.target.tagName !== 'IMG') return;
  
    this.querySelectorAll('li').forEach(elem => {
      elem.classList.remove('images-list__item--active');
    });
  
    event.target.closest('li').classList.add('images-list__item--active');
  }
}

function addTabsImagesClickHandler(tabsList, images) {
  tabsList.addEventListener('click', tabsClickHandler);

  function tabsClickHandler(event) {
    if (event.target.tagName !== 'BUTTON') return;
  
    this.querySelectorAll('button').forEach(elem => {
      elem.classList.remove('portfolio-tab--active');
    });
  
    event.target.classList.add('portfolio-tab--active');
  
    const imagesList = [...images.querySelectorAll('li')];
    const random = getRandomInRange(imagesList.length);
  
    for (let i = 0; i < imagesList.length; i += 1) {
      if (i >= random) {
        images.prepend(imagesList[i]);
      }
    }
  }

  function getRandomInRange(max, min = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

function addFormSubmitHandler(form, modalButton) {
  form.addEventListener('submit', formSubmitHandler);
  modalButton.addEventListener('click', modalMessageButtonHandler);
  
  const MODAL = document.querySelector('#modal');
  MODAL.addEventListener('click', modalClickHandler);

  let isModal = false;

  function formSubmitHandler(event) {
    this.checkValidity();
    event.preventDefault();
  
    const subjectInput = this.querySelector('#input-subject');
    const describeTextarea = this.querySelector('#input-description');
    
    if (subjectInput.value.toString() !== '') {
      MODAL.querySelector('#message-subject').innerText = `Тема: ${subjectInput.value}`;
    } else {
      MODAL.querySelector('#message-subject').innerText = 'Без темы';
    }
  
    if (describeTextarea.value.toString() !== '') {
      MODAL.querySelector('#message-describe').innerText = `Описание: ${describeTextarea.value}`;
    } else {
      MODAL.querySelector('#message-describe').innerText = 'Без описания';
    }
  
    MODAL.className = 'modal--visible';
    isModal = true;
    removeScrollInBody();
    modalButton.focus();

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

  function modalClickHandler(event) {
    if (event.target.id !== 'modal') return;
    modalMessageButtonHandler();
  }
  
  function modalMessageButtonHandler() {
    MODAL.className = 'modal--hidden';
    isModal = false;
    addScrollInBody();
    clearFormData();
  }

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

  function clearFormData() {
    form.reset();
    // form.querySelectorAll('input, textarea').forEach((elem) => {
    //   if ((elem.getAttribute('type') !== 'submit')
    //     || (elem.tagName === 'TEXTAREA')) {
    //     elem.value = '';
    //   }
    // });
  }
}
