
/* functionality to navbar ---------------------------------------------- */

const NAVBAR = document.querySelector('#navbar');

function navbarHandler(event) {
  if (event.target.tagName !== 'A') return;

  NAVBAR.querySelectorAll('li > a').forEach(elem => {
    elem.classList.remove('navbar__link--active');
  });

  event.target.classList.add('navbar__link--active');
}

NAVBAR.addEventListener('click', navbarHandler);


/* functionality to slider-list ---------------------------------------------- */

const SLIDER_LIST = document.querySelector('#slider-list');
const LEFT_CONTROL = document.querySelector('.slider__button.slider__button--left');
const RIGHT_CONTROL = document.querySelector('.slider__button.slider__button--right');

let items = SLIDER_LIST.querySelectorAll('.slider-list__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next',direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
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

LEFT_CONTROL.addEventListener('click', leftControlClickHandler);
RIGHT_CONTROL.addEventListener('click', rightControlClickHandler);

/* click on phones ----------------------------------------------------------- */

function sliderScreenClickHandler(event) {
  if (event.target.tagName !== 'IMG') return;

  if (event.target.className === 'iphone__shadow') return;

  let phone = event.target.closest('div');

  phone.querySelector('img.iphone__screen').classList.toggle('iphone__screen--off');
}

SLIDER_LIST.addEventListener('click', sliderScreenClickHandler);


/* functionality to images-list ---------------------------------------------- */

const IMAGES_LIST = document.querySelector('#images-list');

function imagesClickHandler(event) {
  if (event.target.tagName !== 'IMG') return;

  IMAGES_LIST.querySelectorAll('li').forEach(elem => {
    elem.classList.remove('images-list__item--active');
  });

  event.target.closest('li').classList.add('images-list__item--active');
}

IMAGES_LIST.addEventListener('click', imagesClickHandler);


/* functionality to tabs-list ---------------------------------------------- */

const TABS_LIST = document.querySelector('#tabs-list');

function getRandomInRange(max, min = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}

function tabsClickHandler(event) {
  if (event.target.tagName !== 'BUTTON') return;

  TABS_LIST.querySelectorAll('li > button').forEach(elem => {
    elem.classList.remove('portfolio-tab--active');
  });

  event.target.classList.add('portfolio-tab--active');

  const imagesList = [...IMAGES_LIST.querySelectorAll('li')];
  const random = getRandomInRange(imagesList.length);

  for (let i = 0; i < imagesList.length; i += 1) {
    if (i >= random) {
      IMAGES_LIST.prepend(imagesList[i]);
    }
  }
}

TABS_LIST.addEventListener('click', tabsClickHandler);


/* functionality to form ---------------------------------------------- */

const QUOTE_FORM = document.querySelector('#quote-form');
const MODAL = document.querySelector('#modal');
const MODAL_MESSAGE_BTN = document.querySelector('#message-btn');
let isModal = false;

function formSubmitHandler(event) {
  this.checkValidity();

  event.preventDefault();

  const subjectInput = QUOTE_FORM.querySelector('input.form__input--subject');
  const describeTextarea = QUOTE_FORM.querySelector('textarea.form__input--textarea');
  
  if (subjectInput.value.toString() !== '') {
    MODAL.querySelector('#message-subject').innerHTML = `Тема: ${subjectInput.value}`;
  } else {
    MODAL.querySelector('#message-subject').innerHTML = 'Без темы';
  }

  if (describeTextarea.value.toString() !== '') {
    MODAL.querySelector('#message-describe').innerHTML = `Описание: ${describeTextarea.value}`;
  } else {
    MODAL.querySelector('#message-describe').innerHTML = 'Без описания';
  }

  MODAL.className = 'modal--visible';
  isModal = true;
}

function modalMessageButtonHandler(event) {
  MODAL.className = 'modal--hidden';
  isModal = false;
}

QUOTE_FORM.addEventListener('submit', formSubmitHandler);
MODAL_MESSAGE_BTN.addEventListener('click', modalMessageButtonHandler);

document.addEventListener('keydown', (event) => {
  if (isModal) {
    event.preventDefault();
  }
});
