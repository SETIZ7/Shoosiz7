import {FmeineGetHTMLcodeSPR} from './routerFind.js';
// console.log(MyIp + '  s  ')

          let section_main_BoxesBy=document.getElementsByClassName('section_main_Boxes')[0],
           cunteProByExistent=document.getElementById('cunteProByExistent'),
           cunteProByNotExistent=document.getElementById('cunteProByNotExistent')

           let myPro=[]
           ,myProNew

        let myTagSugestionBestseller_boxes = document.getElementsByClassName('myTagSugestionBestseller_boxes');



        particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#666666"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#666666","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":311.6883116883117,"size":55.94405594405595,"duration":10,"opacity":1,"speed":3},"repulse":{"distance":303.6963036963037,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":false});
        // var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute';
        //  stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;



        function FCreateElmByBox1(e) {
          for (const element of e) {
                
            // console.log(element)
            // console.log(element.productid)
            // console.log(element.namepro)
            // console.log(element.pricepro)
            // console.log((element.pricepro*(100-element.offerpro))/100)
            // console.log(element.offerpro)
            // console.log(element.pointpro)
            
            // console.log(element.images[0]?.backimg ?? './img/ChoicePageG/shoosh/p/Back.png')
            // console.log(element.images[0]?.rightimg ?? './img/ChoicePageG/shoosh/p/nnUp.png')
            // console.log(element.images[0]?.frontimg ?? './img/ChoicePageG/shoosh/p/JORDAN.png');
            section_main_BoxesBy.insertAdjacentHTML('beforeend',
              `<div  class="SugestionBestseller_boxes myTagSugestionBestseller_boxes" data-id-pro="${element.productid}" data-shoozname="${element.namepro}" 
              data-shooz-price-reale="${element.pricepro}" data-shooz-price-offer="${(element.pricepro*(100-element.offerpro))/100}"
               data-shooz-price-offer-persent="${element.offerpro}%" data-shooz-point="${element.pointpro}"
                data-srcImage1="${element.images[0]?.backimg ?? './img/ChoicePageG/shoosh/p/Back.png'}"
                data-srcImage2="${element.images[0]?.rightimg ?? './img/ChoicePageG/shoosh/p/nnUp.png'}"
                data-srcImage3="${element.images[0]?.frontimg ?? './img/ChoicePageG/shoosh/p/JORDAN.png'}"    ></div>`);

                
              }
        }
        function FCreateElmByBox2(ee) {
          
for (const element of ee.children) {
  element.innerHTML=`      
<div>
<div class="parentOfferBoxBayMain">
 <div class="parentBoxImagesOfferBoxBayMain">
     <div><img class="logoImg" src="./img/ChoicePageG/logo/logoo.png.svg" alt="logoImg"></div>
     <div class="slayderParentOfferBox">
         <div class="swiper-wrapper">
             <!-- Slides -->
             <div class="swiper-slide"><img src="${element.dataset.srcimage1??'./img/ChoicePageG/shoosh/p/JORDAN.png'}" alt="discord"></div>
             <div class="swiper-slide"><img src="${element.dataset.srcimage2??'./img/ChoicePageG/shoosh/p/Back.png'}" alt="discord"></div>
             <div class="swiper-slide"><img src="${element.dataset.srcimage3??'./img/ChoicePageG/shoosh/p/removebg.png'}" alt="discord"></div>
         </div>
         <!-- If we need pagination -->
           <!-- <div class="swiper-pagination"></div> -->
         
           <!-- If we need navigation buttons -->
           <!-- <div class="swiper-button-prev"></div> -->
           <!-- <div class="swiper-button-next"></div> -->
     </div>
     </div>
 </div>
 <div class="contentOfferBoxBay">
     <h3>
         ${element.dataset.shoozname??'کفش نایک مدل 12F32 کد 11'}
     </h3>
     <h5>
         ${((+element.dataset.shoozPriceReale)||2899000).toLocaleString('ar-SA')}
          
     </h5>

     <h4>
         <span>
             ${((+element.dataset.shoozPriceOffer)||2599000).toLocaleString()}
         </span>
             تومان
     </h4>

     <div class="starOfferBayBox">
         <button>
           ${((element.dataset.shoozPriceOfferPersent)||'25%')}
         </button>
         <button>
             <span>
                ${((element.dataset.shoozPoint)||'4.6')}
             </span>
             <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.1"><defs><style>.cls-1{fill:#ffd401;}</style></defs><title>star-symbol</title><path class="cls-1" d="M64.42,2,80.13,38.7,120,42.26a3.2,3.2,0,0,1,1.82,5.62h0L91.64,74.18l8.9,39A3.19,3.19,0,0,1,98.12,117a3.27,3.27,0,0,1-2.46-.46L61.41,96.1,27.07,116.64a3.18,3.18,0,0,1-4.38-1.09,3.14,3.14,0,0,1-.37-2.38h0l8.91-39L1.09,47.88a3.24,3.24,0,0,1-.32-4.52,3.32,3.32,0,0,1,2.29-1l39.72-3.56L58.49,2a3.24,3.24,0,0,1,5.93,0Z"/></svg>      
         </button>
     </div>
     <button class="btnBayBayBox">
         <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.43 122.88" xml:space="preserve"><g><path class="st0" d="M22.63,12.6h93.3c6.1,0,5.77,2.47,5.24,8.77l-3.47,44.23c-0.59,7.05-0.09,5.34-7.56,6.41l-68.62,8.73 l3.63,10.53c29.77,0,44.16,0,73.91,0c1,3.74,2.36,9.83,3.36,14h-12.28l-1.18-4.26c-24.8,0-34.25,0-59.06,0 c-13.55-0.23-12.19,3.44-15.44-8.27L11.18,8.11H0V0h19.61C20.52,3.41,21.78,9.15,22.63,12.6L22.63,12.6z M53.69,103.92 c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.24,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48C44.21,108.17,48.45,103.92,53.69,103.92 L53.69,103.92z M92.79,103.92c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.25,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48 C83.31,108.17,87.55,103.92,92.79,103.92L92.79,103.92z M30.8,43.07H45.9l-5.48-22.91c-5.4,0-10.72-0.01-15.93-0.01l1.84,6.86 L26.39,27L30.8,43.07L30.8,43.07L30.8,43.07z M48.31,20.17l5.48,22.9h14.54l-5.5-22.88L48.31,20.17L48.31,20.17L48.31,20.17z M70.74,20.2l5.5,22.87h13.91l-5.48-22.85L70.74,20.2L70.74,20.2L70.74,20.2z M92.58,20.23l5.48,22.85l13.92,0l1.54-18.36 c0.43-5.12,1.33-4.47-3.63-4.47C104.23,20.24,98.44,20.23,92.58,20.23L92.58,20.23L92.58,20.23z M111.49,48.89H99.45l3.97,16.56 l0.98-0.13c6.07-0.87,5.67,0.52,6.15-5.21L111.49,48.89L111.49,48.89z M95.77,66.5l-4.22-17.61h-13.9l4.67,19.44L95.77,66.5 L95.77,66.5L95.77,66.5z M74.66,69.37l-4.93-20.49l-14.55,0l5.37,22.41L74.66,69.37L74.66,69.37L74.66,69.37z M52.9,72.34 l-5.61-23.45H32.4l6.96,25.3L52.9,72.34L52.9,72.34z"/></g></svg>
     </button>
 </div>
</div>

</div>`


// console.log(element)
}
        }

        function FCreateElmByBox3() {
          for (const element of myTagSugestionBestseller_boxes) {
      
            element.querySelector('button.btnBayBayBox').onclick=(e)=>{
              history.pushState({},'','./choicePageG?'+element.dataset.idPro)
              FmeineGetHTMLcodeSPR('./choicePageG?'+element.dataset.idPro)
  
              // console.log(element.dataset.idPro)
            }
          }

          
    new Swiper('.slayderParentOfferBox', {
      // Optional parameters
      // direction: 'vertical',
      // loop: true,
      slidesPerView: 1,
      
      autoplay: {
        delay: 4000,
      }
      // If we need pagination
      // ,pagination: {
      //   el: '.swiper-pagination',
      // },
      
        }); 

        }


          fetch('http://'+MyIp+'/shooosiz/apis/getPro/getAllPro.php').then(ee=>{
            // console.log(ee)
            return ee.json();})
            .then(ee=>{
              console.log(ee)
              // console.log(ee.product.length)
              cunteProByExistent.innerText=ee.products.length
              cunteProByNotExistent.innerText= 24 - ee.products.length
              myPro = ee.products
              myProNew = [...myPro]
              myProNew = myProNew.reverse()
              FCreateElmByBox1(myPro)
                  return section_main_BoxesBy
                }).then(ee=>{
                  
                  // console.log(section_main_BoxesBy)
                  FCreateElmByBox2(ee)

                  FCreateElmByBox3()

// new Swiper('.section_headerMineSlayder', {
//   // Optional parameters
//   // direction: 'vertical',
//   loop: true,
//   slidesPerView: 1,
  
//   autoplay: {
//     delay: 4000,
//   }
//   // If we need pagination
//   ,pagination: {
//     el: '.swiper-pagination',
//   },
  
//     });  

    

            })

            






            let sqGeranBtn = document.getElementById('sqGeranBtn'),
             sqArzanBtn = document.getElementById('sqArzanBtn'),
             sqOfferBtn = document.getElementById('sqOfferBtn'),
             sqNewBtn = document.getElementById('sqNewBtn'),
             section_MineHeaderRightUl = document.getElementsByClassName('section_MineHeaderRight')[0].firstElementChild;


            //  Fsection_MineHeaderRightUlClick
            function Fsection_MineHeaderRightUlClick() {
              // console.log(this.id,myPro)
                section_MineHeaderRightUl.querySelector('.active').classList.remove('active')
              this.classList.add('active')

              switch (this.id) {
                case 'sqOfferBtn':
                  myProNew = myProNew.sort((a, b) => b.offerpro - a.offerpro);
                  // myProNew = myProNew.reverse()
                // console.log(myProNew)
                  break;
                case 'sqArzanBtn':
                   myProNew = myProNew.sort((a, b) => ((b.pricepro)*(100-b.offerpro))/100 - ((a.pricepro)*(100-a.offerpro))/100);
                   myProNew = myProNew.reverse()
                  // console.log(myProNew);

                  break;
                case 'sqGeranBtn':
                  myProNew = myProNew.sort((a, b) => ((b.pricepro)*(100-b.offerpro))/100 - ((a.pricepro)*(100-a.offerpro))/100);
                  // console.log(myProNew)
                  break;
                case 'sqNewBtn':
                default:
              myProNew = [...myPro]
              myProNew = myProNew.reverse()
                  // myProNew = myPro
                  // console.log(myProNew)
                  break;
              }
              // console.log(myPro,myProNew)
              section_main_BoxesBy.innerHTML=''
              FCreateElmByBox1(myProNew)
              FCreateElmByBox2(section_main_BoxesBy)
              FCreateElmByBox3()
            }

             for (const element of  section_MineHeaderRightUl.children) {
              element.addEventListener('click',Fsection_MineHeaderRightUlClick)
             }




