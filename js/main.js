const change = (element, text) => {
  var active = document.getElementById('active1');
  active.removeAttribute('id')
  element.setAttribute('id', 'active1')
  // element.parentNode.parentNode.style.transition = "background-image 0.3s"
  element.parentNode.parentNode.style.backgroundImage = 
  `url(${element.children[0].src})`;
  element.parentNode.parentNode.children[0].children[0].innerHTML = text
}


var swiper = new Swiper(".cont", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#first-next",
    prevEl: "#first-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 2,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1000:{
      slidesPerView: 4,
      spaceBetween: 10,
    },

    1200:{
      slidesPerView: 3,
      spaceBetween:10,
    },
    1500:{
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper(".trend", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#second-next",
    prevEl: "#second-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 1,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 2,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper(".sugg", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#third-next",
    prevEl: "#third-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 2,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1000:{
      slidesPerView: 4,
      spaceBetween: 10,
    },

    1200:{
      slidesPerView: 3,
      spaceBetween:10,
    },
    1500:{
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper(".act", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#fourth-next",
    prevEl: "#fourth-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 2,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1000:{
      slidesPerView: 4,
      spaceBetween: 10,
    },

    1200:{
      slidesPerView: 3,
      spaceBetween:10,
    },
    1500:{
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper(".com", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#fifth-next",
    prevEl: "#fifth-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 2,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1000:{
      slidesPerView: 4,
      spaceBetween: 10,
    },

    1200:{
      slidesPerView: 3,
      spaceBetween:10,
    },
    1500:{
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper(".sci", {
  slidesPerView: 1,
  spaceBetween: 10,
  centerSlide: true,
  navigation: {
    nextEl: "#sixth-next",
    prevEl: "#sixth-prev",
  },
  breakpoints: {
    280:{
      slidesPerView: 2,
      spaceBetween: 10,
    },

    800:{
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1000:{
      slidesPerView: 4,
      spaceBetween: 10,
    },

    1200:{
      slidesPerView: 3,
      spaceBetween:10,
    },
    1500:{
      slidesPerView: 4,
      spaceBetween: 10,
    }
  }
});



//Mouse Slider


// let isPressedDown = false;
// let cursorXspace;

// const containers = document.querySelectorAll(".slider-container");
// containers.forEach(el => {
//   var slider;
//   slider = el.children[0].children[1];
//   el.addEventListener("mousedown", (e) =>{
//     isPressedDown = true;
//     cursorXspace = e.offsetX - slider.offsetLeft;
//   })
//   document.addEventListener("mouseup", () => {
//     isPressedDown = false;
//     boundsCards();
//   })
//   el.addEventListener("mousemove", (e) => {
//     if(!isPressedDown) {
//       return;
//     }
//     e.preventDefault();
//     slider.style.left = `${e.offsetX - cursorXspace}px`;
//     boundsCards();
//   })
//   function boundsCards() {
//     const container_rect = el.getBoundingClientRect();
//     const slider_rect = slider.getBoundingClientRect();

//     if(parseInt(slider.style.left) > 10){
//       slider.style.left = '10px';
//     }
//     if (slider_rect.right < container_rect.right){
//       slider.style.left = `-${slider_rect.width - container_rect.width}px`
//     }
//   }
// })

