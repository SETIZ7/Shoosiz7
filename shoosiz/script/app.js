
(function () {
  
  AOS.init();


  let scene111 = document.getElementById('main_content__boxHeaderCenterMover');
let parallax = new Parallax(scene111);

  
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
    new Swiper('.section_headerFooterSlider', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    slidesPerView: 1,
    
    autoplay: {
      delay: 4000,
    }
    // If we need pagination
    ,pagination: {
      el: '.swiper-pagination',
    },
    
      });  



  const swiper1 = new Swiper('.TopBrands_footerSlider2', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    slidesPerView: 5,
    autoplay: {
      delay: 10000,
    }
    // If we need pagination
    // ,pagination: {
    //   el: '.swiper-pagination',
    // },
    
    // Navigation arrows
    ,navigation: { 
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
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
              
              


              function FsetTimeRemainder(time,E1S,E2M,E3H) {

                E3H.innerHTML=Math.floor(time)
                time-=E3H.innerHTML
                E2M.innerHTML=Math.floor(time*=60)
                time-=E2M.innerHTML
                E1S.innerHTML=Math.floor(time*=60)
                // time-=E1S.innerHTML
                // console.log(Math.floor(time*1000))
              }



              function FgetTimeRemainder(time) {
               let timeBoxes = document.getElementsByClassName('SugestionOffer_Time')[0];
               let timeBox1S = timeBoxes.children[0]
               let timeBox2M = timeBoxes.children[2]
               let timeBox3H = timeBoxes.children[4]
                // console.log((time - new Date())/(60*60*1000))
                setInterval(()=>FsetTimeRemainder((time - new Date())/(60*60*1000),timeBox1S,timeBox2M,timeBox3H),1000)

              }

              FgetTimeRemainder(new Date(2025,0,24))






              let footer_ditails__RidingTextP = document.getElementsByClassName('footer_ditails__RidingTextP')[0]
              , TextBtnOpenedFooter = document.getElementById('TextBtnOpenedFooter')


              function Ffooter_ditails__RidingTextPClickHandler() {
              if(footer_ditails__RidingTextP.classList[1]){
                footer_ditails__RidingTextP.classList.remove('footer_ditails__RidingTextPActive')
                TextBtnOpenedFooter.querySelector('span').innerText = '  بیشتر ببین  ';
              }else{
                footer_ditails__RidingTextP.classList.add('footer_ditails__RidingTextPActive')
                TextBtnOpenedFooter.querySelector('span').innerText = '   کمتر ببین  ';
              }
                
              }


              TextBtnOpenedFooter.addEventListener('click',Ffooter_ditails__RidingTextPClickHandler)






              let section_headerMine = document.getElementsByClassName('section_headerMine')[0]
              let main_content__boxImg = section_headerMine.getElementsByClassName('main_content__boxImg')[0]
              let colorSvgAndTextSETImages = section_headerMine.getElementsByClassName('colorSvgAndText'),
              main_content__boxImgImages=[
                 {src:'./img/shooz/jordan(1).png',color1:'var(--colorBlack000)',color2:'var(--colorBlack000)',color3:'var(--colorBlack000)'}
                ,{src:'./img/shooz/jordan(2).png',color1:'var(--colorWhiteF)',color2:'var(--colorBlack000)',color3:'var(--colorBlack000)'}
                ,{src:'./img/shooz/jordan(3).png',color1:'var(--colorGreen1)',color2:'var(--colorWhiteF)',color3:'var(--colorWhiteF)'}
                ,{src:'./img/shooz/jordan(4).png',color1:'var(--colorGreen4)',color2:'var(--colorGreen1)',color3:'var(--colorPink)'}
                ,{src:'./img/shooz/jordan(5).png',color1:'var(--colorOreng2)',color2:'var(--colorRed1)',color3:'var(--colorYellow2)'}
                ,{src:'./img/shooz/jordan(6).png',color1:'var(--colorWhiteF)',color2:'var(--colorYellow1)',color3:'var(--colorYellow1)'}
                ,{src:'./img/shooz/jordan(7).png',color1:'var(--colorRed1)'  ,color2:'var(--colorGrey)'  ,color3:'var(--colorWhiteF)'}
                ,{src:'./img/shooz/jordan(8).png',color1:'var(--colorBlue1)' ,color2:'var(--colorGrey)'  ,color3:'var(--colorWhiteF)'}
              ],
              rundomNumberColorImgs=Math.floor(Math.random()*8)
              // rundomNumberColorImgs=0

              main_content__boxImg.src=main_content__boxImgImages[rundomNumberColorImgs].src
              

              colorSvgAndTextSETImages[0].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color1
              colorSvgAndTextSETImages[5].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color1

              colorSvgAndTextSETImages[1].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color2
              colorSvgAndTextSETImages[3].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color2

              colorSvgAndTextSETImages[2].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color3
              colorSvgAndTextSETImages[4].style.fill=main_content__boxImgImages[rundomNumberColorImgs].color3
                
              


              setInterval(()=>{
              //  main_content__boxImg.src=main_content__boxImgImages[Math.floor(Math.random()*8)]
              },500)
              setInterval(()=>{
              //  main_content__boxImg.src=main_content__boxImgImages[Math.floor(Math.random()*8)]
                section_headerMine.classList.remove('section_headerMineActive')
              },2500)







              const mySvgAnimation = document.getElementsByClassName('Svg_BGMoverSvg')[0];
              const mySvgAnimationPath1 = mySvgAnimation.getElementsByTagName('path')[0];
              const mySvgAnimation_PathLength1 = mySvgAnimationPath1.getTotalLength(); // طول کل مسیر
              mySvgAnimationPath1.style.strokeDashoffset = mySvgAnimation_PathLength1; // پنهان کردن کل مسیر
              mySvgAnimationPath1.style.strokeDasharray = mySvgAnimation_PathLength1; // تنظیم dasharray
              
          
              window.addEventListener('scroll', () => {
          
                const scrollTop = window.scrollY; // میزان اسکرول کاربر
                const docHeight = document.body.scrollHeight - window.innerHeight; // ارتفاع قابل اسکرول
                const progress = scrollTop / docHeight; // درصد پیشرفت اسکرول
          
                
          
                mySvgAnimationPath1.style.strokeDashoffset = mySvgAnimation_PathLength1 * (1 - progress); // تنظیم خط
          
                mySvgAnimation.style.top=`-${(docHeight * (progress))/(30000/window.innerWidth)}%`
                // console.log(-(docHeight * ( progress))/(50000/window.innerWidth))
              });




            })()