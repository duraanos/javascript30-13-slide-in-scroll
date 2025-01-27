'use strict';

const sliderImages = document.querySelectorAll('img');

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const checkSlide = function () {
  sliderImages.forEach(sliderImage => {
    // Half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;

    // Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isScorelledPast = window.scrollY > imageBottom;
    if (isHalfShown && !isScorelledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', debounce(checkSlide));
