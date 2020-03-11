
const NAVBAR = document.querySelector('#navbar');

function navbarHandler(event) {
  if (event.target.tagName !== 'A') return;

  NAVBAR.querySelectorAll('li > a').forEach(elem => {
    elem.classList.remove('navbar__link--active');
  });

  event.target.classList.add('navbar__link--active');
}

NAVBAR.addEventListener('click', navbarHandler);