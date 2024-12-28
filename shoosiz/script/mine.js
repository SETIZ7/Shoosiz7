const $=document;




let deg=-90
,animationId
,main_content__boxScale=1
,btnDif=$.getElementsByClassName('btn_dif')


/*    animation grdiant  */
function FAnimationBtnBgStart(p,num,panimationId) {
    
    // cancelAnimationFrame(panimationId)
    // console.log(num);
    // cancelAnimationFrame(animationId)
    // for (; deg >= 150; deg++) {
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
    // for (; deg <= -90; deg--) {
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






// event  navBtnSearch = $.getAnimations('navBtnSearch')



let navBtnSearch = $.getElementById('navBtnSearch')
, inputSearchBox = $.getElementById('inputSearchBox')
,searchBox_parent = $.getElementsByClassName('searchBox_parent')[0]

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


 let btnModeDurkLite = $.getElementsByClassName('navBtn_durkxLiteMode')[0]
 
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
        $.documentElement.style.setProperty('--mainColorW','#111')
        $.documentElement.style.setProperty('--btnColor','#bebebe')
        $.documentElement.style.setProperty('--mainColor','#fcfcfc')
        $.documentElement.style.setProperty('--svgColor','#101010')
        $.documentElement.style.setProperty('--mainColorWW','#333333')
        $.documentElement.style.setProperty('--mainColorWWW','#010')
        $.documentElement.style.setProperty('--btnColorB','#f3f3f3')
        $.documentElement.style.setProperty('--bgTColorOpacity','#dadada6e') 
        $.documentElement.style.setProperty('--mainColorYellow1','#c4b86e')
        $.documentElement.style.setProperty('--mainColorYellow2','#8b865a')
        $.documentElement.style.setProperty('--mainColorYellow3','#807500') 
        $.querySelector('.main_content__boxImg').style.setProperty('filter','brightness(0)')
    }
    else{
        
        $.documentElement.style.setProperty('--mainColorW','#666666')
        $.documentElement.style.setProperty('--btnColor','#292929')
        $.documentElement.style.setProperty('--mainColor','#101010')
        $.documentElement.style.setProperty('--svgColor','#c7c7c7')
        $.documentElement.style.setProperty('--mainColorWW','#bebebe')
        $.documentElement.style.setProperty('--mainColorWWW','#f3f3f3')
        $.documentElement.style.setProperty('--btnColorB','#1b1b1b')
        $.documentElement.style.setProperty('--bgTColorOpacity','#2928286e')
        $.documentElement.style.setProperty('--mainColorYellow1','#fff9c6')
        $.documentElement.style.setProperty('--mainColorYellow2','#fff6a7')
        $.documentElement.style.setProperty('--mainColorYellow3','#fff597')
        $.querySelector('.main_content__boxImg').style.setProperty('filter','brightness(1)')
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






// navBTnHambergery event and handel

let navBTnHambergery = $.getElementById('navBTnHambergery')
,flagNavBTnHambergery = true
,nav_RightSideUl = $.getElementsByClassName('nav_RightSideUl')[0]
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