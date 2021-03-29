// import $ from 'jquery';

import '../index.html';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

function importAll(resolve) {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../../src/', true, /\.js$|\.scss$/));

const selector = $('.owl-carousel');

$('.my-next-button').click(() => {
  selector.trigger('next.owl.carousel');
});

$('.my-prev-button').click(() => {
  selector.trigger('prev.owl.carousel');
});

document.querySelectorAll('.button__text').forEach((buttonText) => buttonText.addEventListener('mousedown', () => {
  const extraBorder = document.querySelectorAll('.button__border');
  extraBorder.forEach((border) => border.classList.add('button__border_active'));
}));

document.querySelectorAll('.button__text').forEach((buttonText) => buttonText.addEventListener('mouseup', () => {
  const extraBorder = document.querySelectorAll('.button__border');
  extraBorder.forEach((border) => border.classList.remove('button__border_active'));
}));

document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('menu_show');
});

