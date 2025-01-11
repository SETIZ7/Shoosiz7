
const swiper = new Swiper('.content_footerSlider', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

      autoplay: {
        delay: 5000,
      }
  // If we need pagination
  ,pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  // navigation: { 
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});  
// const swiper = new Swiper('.slider', {
//     // autoplay: {
//     //     delay: 5000,
//     //   }
//     //   ,
//       direction:'virtual'
//     ,speed: 400
//     // ,spaceBetween: 100
//     ,loop:true
//     ,    pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: { 
//       nextEl: '.swiper_button_next',
//       prevEl: '.swiper_button_prev',
//     }
//   });
