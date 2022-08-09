var swiper = new Swiper(".movies-container", {
  slidesPerView: 4,
  spaceBetween: 15,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
    1500:{
      slidesPerView: 4,
    },
    1600:{
      slidesPerView: 5,
    }
  }
});

const change = element => {
  var elementPrev = element.parentNode.parentNode.parentNode.children[0];
  var imgChild = element.children[0];
  var blackChild = element.children[1];
  if(!(element.children[1].classList.contains('black-active'))){
    Array.from(document.querySelectorAll('.black')).forEach((el) => (el.style.opacity = 0, el.classList.remove('black-active')));
    blackChild.classList.add('black-active');
    elementPrev.src = imgChild.src;
    elementPrev.style.transition = "0s";
    elementPrev.style.opacity = 0;
    setTimeout(function(){
      elementPrev.style.transition = "1s";
      elementPrev.style.opacity = 1;
    }, 10);
    blackChild.style.opacity = 0.7;
  }
}
