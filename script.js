
const NAVBAR = document.querySelector('#navbar');
const IMAGES_LIST = document.querySelector('#images-list');
const TABS_LIST = document.querySelector('#tabs-list');
const SLAIDER_LIST = document.querySelector('#slider-list');

/* functionality to navbar ---------------------------------------------- */

function navbarHandler(event) {
  if (event.target.tagName !== 'A') return;

  NAVBAR.querySelectorAll('li > a').forEach(elem => {
    elem.classList.remove('navbar__link--active');
  });

  event.target.classList.add('navbar__link--active');
}

NAVBAR.addEventListener('click', navbarHandler);


/* functionality to slider-list ---------------------------------------------- */

function sliderListHandler(event) {
  if (event.target.tagName !== 'IMG') return;

  if (event.target.className === 'iphone__shadow') return;

  let PHONE = event.target.closest('div');

  PHONE.querySelector('img.iphone__screen').classList.toggle('iphone__screen--off');
}

SLAIDER_LIST.addEventListener('click', sliderListHandler);


/* functionality to images-list ---------------------------------------------- */

function imagesListHandler(event) {
  if (event.target.tagName !== 'IMG') return;

  IMAGES_LIST.querySelectorAll('li').forEach(elem => {
    elem.classList.remove('images-list__item--active');
  });

  event.target.closest('li').classList.add('images-list__item--active');
}

IMAGES_LIST.addEventListener('click', imagesListHandler);


/* functionality to tabs-list ---------------------------------------------- */

function tabsListHandler(event) {
  if (event.target.tagName !== 'BUTTON') return;

  TABS_LIST.querySelectorAll('li > button').forEach(elem => {
    elem.classList.remove('portfolio-tab--active');
  });

  event.target.classList.add('portfolio-tab--active');
}

TABS_LIST.addEventListener('click', tabsListHandler);
