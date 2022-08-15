var up_swiper = new Swiper(".card-systems", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 1,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var filmsSwiper = new Swiper('.card-effect', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  initialSlide: 2,
  coverflowEffect: {
    rotate: 0,
    stretch: 100,
    depth: 70,
    modifier: 1,
  }

});

var trendSwiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 15,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});