

(function () {
    

let mydeg=-90
,animationId
,main_content__boxScale=1
,btnDif=document.getElementsByClassName('btn_dif')


/*    animation grdiant  */
function FAnimationBtnBgStart(p,num,panimationId) {
    
    // cancelAnimationFrame(panimationId)
    // console.log(num);
    // cancelAnimationFrame(animationId)
    // for (; mydeg >= 150; mydeg++) {
    function Fanimation() {
        
        p.style.setProperty('background-image',`linear-gradient(${num}deg, var(--mainColor)  , var(--mainColorWWW) 70%)`)
        if(num <= 90)
            animationId = requestAnimationFrame(Fanimation)
        num =+num+5
    }
    animationId = requestAnimationFrame(Fanimation)
    //    }
    //    document.body.style.setProperty
    }


function FAnimationBtnBgEnd(p,num,panimationId) {
    cancelAnimationFrame(panimationId)
    // FAnimationBtnBgEnd(p,num,panimationId)

    // cancelAnimationFrame(animationId)
    // p.onmouseenter=null
    // for (; mydeg <= -90; mydeg--) {
        function Fanimation() {
        
            p.style.setProperty('background-image',`linear-gradient(${num}deg, var(--mainColor)  , var(--mainColorWWW) 70%)`)
            if(num >= -90)
                animationId = requestAnimationFrame(Fanimation)
            num-=5

        }
        animationId = requestAnimationFrame(Fanimation)
        // }
    }



function FAnimationBtnBg() {

    
    for (const element of btnDif) {
        element.onmouseenter=e=>{ FAnimationBtnBgStart(e.target,(getComputedStyle(element).backgroundImage).match(/-?\d+(?=deg)/g)[0],animationId) 

            
        }
        element.onmouseleave=e=>{ FAnimationBtnBgEnd(e.target,(getComputedStyle(element).backgroundImage).match(/-?\d+(?=deg)/g)[0],animationId) }
    }
}


for (const styleSheet0cssR of document.styleSheets[0].cssRules) {
    
    if(styleSheet0cssR.selectorText==='.btn_dif'){
        FAnimationBtnBg(styleSheet0cssR);
    }
}






// event  navBtnSearch = document.getAnimations('navBtnSearch')



let navBtnSearch = document.getElementById('navBtnSearch')
, inputSearchBox = document.getElementById('inputSearchBox')
,searchBox_parent = document.getElementsByClassName('searchBox_parent')[0]

navBtnSearch.addEventListener('click',(e)=>{
    if(inputSearchBox.hasAttribute('hidden')){
        inputSearchBox.removeAttribute('hidden')
        searchBox_parent.className='searchBox_parent'
    }
    // console.log(inputSearchBox.hasAttribute('hidden'));
})

searchBox_parent.addEventListener('click',(e)=>{
    if(e.target.classList[0]=='searchBox_parent'){
        inputSearchBox.setAttribute('hidden','')
        searchBox_parent.className='searchBox_parent searchBox_parent__hidde'
        
        // console.log(searchBox_parent.className);
        // searchBox_parent.classList
    }
})








// event  btnLiteDurkMode

 /* function FgetAnimate({name='null',duration=2000,timing_function='ease-in-out',delay=0,iteration_count=1,direction='alternate',fill_mode='forwards'}) {
      console.log(direction);
   }
 FgetAnimate({name:'naa'})
 */


 let btnModeDurkLite = document.getElementsByClassName('navBtn_durkxLiteMode')[0]
 
 /*
 ,animationKeyFrimDurkMOde=[
     {
         transform:' rotate(0deg) scale(1) '
     }
     ,{
         transform:' rotate(1800deg) scale(0)'
     }
 ]
*/

function FsetPropertyRootColor(params) {

    if(params=='lite'){
        document.documentElement.style.setProperty('--mainColorW','#111')
        document.documentElement.style.setProperty('--btnColor','#bebebe')
        document.documentElement.style.setProperty('--mainColor','#fcfcfc')
        document.documentElement.style.setProperty('--svgColor','#101010')
        document.documentElement.style.setProperty('--mainColorWW','#333333')
        document.documentElement.style.setProperty('--mainColorWWW','#010')
        document.documentElement.style.setProperty('--btnColorB','#f3f3f3')
        document.documentElement.style.setProperty('--bgTColorOpacity','#dadada6e') 
        document.documentElement.style.setProperty('--mainColorYellow1','#c4b86e')
        document.documentElement.style.setProperty('--mainColorYellow2','#8b865a')
        document.documentElement.style.setProperty('--mainColorYellow3','#807500') 
        // document.querySelector('.main_content__boxImg').style.setProperty('filter','brightness(0)')
        // document.querySelector('.main_content__boxImgActive')?.style.setProperty('filter','brightness(0)')
        for (const element of document.querySelectorAll('.logoImg')) {
            console.log(element?.style.setProperty('filter','brightness(0)'))
        }
    }
    else{
        
        document.documentElement.style.setProperty('--mainColorW','#666666')
        document.documentElement.style.setProperty('--btnColor','#292929')
        document.documentElement.style.setProperty('--mainColor','#101010')
        document.documentElement.style.setProperty('--svgColor','#c7c7c7')
        document.documentElement.style.setProperty('--mainColorWW','#bebebe')
        document.documentElement.style.setProperty('--mainColorWWW','#f3f3f3')
        document.documentElement.style.setProperty('--btnColorB','#1b1b1b')
        document.documentElement.style.setProperty('--bgTColorOpacity','#2928286e')
        document.documentElement.style.setProperty('--mainColorYellow1','#fff9c6')
        document.documentElement.style.setProperty('--mainColorYellow2','#fff6a7')
        document.documentElement.style.setProperty('--mainColorYellow3','#fff597')
        // document.querySelector('.main_content__boxImg').style.setProperty('filter','brightness(1)')
        // document.querySelector('.main_content__boxImgActive')?.style.setProperty('filter','brightness(1)')
        for (const element of document.querySelectorAll('.logoImg')) {
            console.log(element?.style.setProperty('filter','brightness(1)'))
        }
    }
}


btnModeDurkLite.addEventListener('click',(e)=>{
    if(e.target.classList[2]=='navBtn_durkMode'){
        e.target.className = 'btn_dif navBtn_durkxLiteMode navBtn_liteMode';
       
        FsetPropertyRootColor('lite')

         localStorage.setItem('TemShoosiz','lite')

        
    }else{
        e.target.className = 'btn_dif navBtn_durkxLiteMode navBtn_durkMode';

        FsetPropertyRootColor('durk')

        localStorage.setItem('TemShoosiz','durk')


    }
})




window.addEventListener('load',()=>{
    if(localStorage.getItem('TemShoosiz')=='durk'){
        btnModeDurkLite.className='btn_dif navBtn_durkxLiteMode navBtn_durkMode'
        FsetPropertyRootColor('durk')
      }
      else{
      btnModeDurkLite.className='btn_dif navBtn_durkxLiteMode navBtn_liteMode'
      FsetPropertyRootColor('lite')
      }
})


setTimeout(()=>{
    if(localStorage.getItem('TemShoosiz')=='durk'){
        btnModeDurkLite.className='btn_dif navBtn_durkxLiteMode navBtn_durkMode'
        FsetPropertyRootColor('durk')
      }
      else{
      btnModeDurkLite.className='btn_dif navBtn_durkxLiteMode navBtn_liteMode'
      FsetPropertyRootColor('lite')
      }
},1000)




// navBTnHambergery event and handel

let navBTnHambergery = document.getElementById('navBTnHambergery')
,flagNavBTnHambergery = true
,nav_RightSideUl = document.getElementsByClassName('nav_RightSideUl')[0]
,isMouseInNav_RightSideUl=false


function FwindowClockNav_RightSideUl() {
    // console.log(Math.random())
    if(nav_RightSideUl.style.transform){
    navBTnHambergery.className='CnavBTnHambergery'
    nav_RightSideUl.style.transform='scaleY(1) translateX(-150%)'
    flagNavBTnHambergery=true
    window.removeEventListener('click',FwindowClockNav_RightSideUl)
    }
}


// event for exit in the nev bar

nav_RightSideUl.addEventListener('mouseenter',()=>{
    window.removeEventListener('click',FwindowClockNav_RightSideUl)
})

nav_RightSideUl.addEventListener('mouseleave',()=>{
    window.addEventListener('click',FwindowClockNav_RightSideUl)
})



function FnavBTnHambergeryClick (){
    // console.log('first')
    if(flagNavBTnHambergery){
        navBTnHambergery.className='CnavBTnHambergery navBTnHambergery_children'
        nav_RightSideUl.style.transform='scaleY(1) translateX(0%)'
        flagNavBTnHambergery=false
    window.removeEventListener('click',FwindowClockNav_RightSideUl)
        setTimeout(()=>{
            window.addEventListener('click',FwindowClockNav_RightSideUl)
        },100)
    }else{
        navBTnHambergery.className='CnavBTnHambergery'
        // nav_RightSideUl.style.opacity=1
        nav_RightSideUl.style.transform='scaleY(1) translateX(-150%)'

        flagNavBTnHambergery=true
        
    }

}


navBTnHambergery.addEventListener('click',FnavBTnHambergeryClick)




window.addEventListener('resize',(e)=>{
    if(e.target.innerWidth<800){
        if(flagNavBTnHambergery){
        nav_RightSideUl.style.transform='scaleY(0) translateX(-150%)'
        }else{
        
        nav_RightSideUl.style.transform='scaleY(1) translateX(0%)'
    }
}else{
        nav_RightSideUl.style.transform=''

    }
})



// custom Elemnt boxBayieing Index
// class MyCustomElmBoxBayIndex extends HTMLElement {
//     constructor() {
//       super();
//       const shadow = this.attachShadow({ mode: "open" });
  
//       const divParent = document.createElement("div");
//         divParent.className='SugestionBestseller_boxes'
//       divParent.innerHTML =
  
//       shadow.appendChild(divParent);
//     }
//   }
  
//   customElements.define("my-element", MyCustomElmBoxBayIndex);
  let x = 10
  console.log(x.toLocaleString('ar-SA'))
for (const element of document.getElementsByClassName('myTagSugestionBestseller_boxes')) {
    //  console.log()
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
       
                 </div>

                 `
 } 

  // استفاده در HTML
//   document.body.innerHTML = `
//   <my-element text="Hello Custom" color="red" fontSize="18px"></my-element>
//   `;
  





})()
