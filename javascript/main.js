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
      slidesPerView: 1 ,
    },
    520: {
      slidesPerView: 2
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