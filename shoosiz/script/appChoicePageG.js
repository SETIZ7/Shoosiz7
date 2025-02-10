// import  FfixTagLinkA  from './routerFind.js';
// console.log(FfixTagLinkA);
import {
    FshowModule,
    FhideModule
} from './component/masseg.js'


let angle_imgBox=document.querySelectorAll('.angle_imgBox')
,main_content__box=document.querySelector('.main_content__box')
,move_imgCenterZoom=document.querySelector('.move_imgCenterZoom')
,main_content__boxScale=1


 let sabadKharid = JSON.parse(localStorage.getItem('sabadKharid'))??[]


//  rotate numbers



let btn_iconSize=document.getElementsByClassName('btn_iconSize')
,iconSizeBox=document.querySelector('.main_iconSize__box')
,lestElmNumber=null


function FfindSWClassNumber(key) {
    switch (key) {
        case '-4': return 'btn_iconSize btn_iconSizeTHH'; 
        break;
        case '-3': return 'btn_iconSize btn_iconSizeTH'; 
        break;
        case '-2': return 'btn_iconSize btn_iconSizeTT'; 
        break;
        case '-1': return 'btn_iconSize btn_iconSizeTR'; 
        break;
        case '0': return 'btn_iconSize btn_iconSizeCR'; 
        break;
        case '1': return 'btn_iconSize btn_iconSizeBR'; 
        break;
        case '2': return 'btn_iconSize btn_iconSizeBB'; 
        break;
        case '3': return 'btn_iconSize btn_iconSizeBH'; 
        break;
        case '4': return 'btn_iconSize btn_iconSizeBHH'; 
        break;
    
        default:
            return null
            break;
    }
}



function FmoveAllElmNumber(paramNum,Elm) {
//    main_content__box.style.transition=`all 300ms`
   main_content__box.style.transform=`translate(-50% ,-50%) scale(${main_content__boxScale})`
    if(!(lestElmNumber>=32 && lestElmNumber<=51)){

        return
    }
    
    
    if (paramNum>0) {
        iconSizeBox.insertAdjacentHTML('beforeend',Elm)
        iconSizeBox.firstElementChild.remove()
        for (const element of iconSizeBox.children) {
            element.dataset.id--
            // console.log(element);
            if(FfindSWClassNumber(element.dataset.id))
            element.className=FfindSWClassNumber(element.dataset.id)
        }
        main_content__boxScale-=0.02
        FaddEventToBtn_iconSize()

    }
    else{
        iconSizeBox.insertAdjacentHTML('afterbegin',Elm)
        iconSizeBox.lastElementChild.remove()
        for (const element of iconSizeBox.children) {
            element.dataset.id++
            // console.log(element);
            if(FfindSWClassNumber(element.dataset.id))
             element.className=FfindSWClassNumber(element.dataset.id)
        }
        main_content__boxScale+=0.02
        FaddEventToBtn_iconSize()
    }

}


function FcreateElmMoveNumber(paramsNumber,paramsInnerHTML) {
    // iconSizeBox
    if(paramsNumber>0){

        return `<div class="btn_iconSize btn_iconSizeBHH" data-id="5">${paramsInnerHTML-=1}</div>`
       }else{

        return `<div class="btn_iconSize btn_iconSizeTHH" data-id="-5">${paramsInnerHTML=+paramsInnerHTML+1}</div>`
       }

}

function FElmMoveNumber(params) {
    
    if(params>0){
         lestElmNumber=iconSizeBox.lastElementChild.innerHTML
        FmoveAllElmNumber(params,FcreateElmMoveNumber(params,lestElmNumber))

    }else{
         lestElmNumber=iconSizeBox.firstElementChild.innerHTML
        FmoveAllElmNumber(params,FcreateElmMoveNumber(params,lestElmNumber))
    }

}


function FmoveNumber(e) {
    let Nloc=0
    Nloc=e.target.dataset.id
    for (let index=0; index < Math.abs(Nloc); index++) {
         FElmMoveNumber(Nloc)
    }
    // if(Nloc>0){
    // for (let index=0; index < Nloc; index++) {
    // FElmMoveNumber(Nloc)
    // }
        // for (const element of btn_iconSize) {
            // element.dataset.id-=Nloc
            // console.log('object');
        // }
    // }else if(Nloc<0){
        // for (const element of btn_iconSize) {
            
        //     console.log('object');
        //     element.dataset.id=Number.parseInt(element.dataset.id)+Number.parseInt(Nloc)

        // }
    // }
    // else{}

    // console.log(Nloc);
}


function FaddEventToBtn_iconSize() {
    
    for (const element of btn_iconSize) {
        element.onclick=FmoveNumber
    }
}

FaddEventToBtn_iconSize()











// FfindNumberRundom

function FfindNumberRundom(x=new Number(0),y=new Number(1)) {
    if(y<x){
        x[0]=x;x[1]=y;y=x[0];x=x[1]
    }
   return Math.random() * (x-=y)+y

}






// start angle_imgBox 
let imgElm=document.createElement('img')
,imgElmScale=3
,imgElmSize=15


move_imgCenterZoom.innerHTML=''
// console.log();
imgElm.style.cssText=`
    pointer-events:none;
    position:absolute;
    width: 100%;
    left:0%;
    top:0%;
    transform:  scale(2) translate(0% , 0%) ;
`
imgElm.src=main_content__box.firstElementChild.src
move_imgCenterZoom.append(imgElm)
move_imgCenterZoom.style.visibility='visible'
move_imgCenterZoom.style.transform='scale(0)'




angle_imgBox.forEach((ee)=>{
    ee.addEventListener('click',(e)=>{
        
        main_content__box.firstElementChild.animate([
            {
                transform: `scale(0) translateX(${FfindNumberRundom(-1000,1000)}px)`
            },
            {
                transform: `scale(1.2) translateX(${FfindNumberRundom(-100,100)}px)`
            },{
                transform: `scale(1) translateX(0px)`
            }
        ], {
            duration: 1000,
            easing:'cubic-bezier(0.3, 0, 0.1, 0.7)'
            // iterations: Infinity
        })
main_content__box.firstElementChild.src=e.target.src

        move_imgCenterZoom.innerHTML=''
        imgElm.style.cssText=`
            pointer-events:none;
            position:absolute;
            width: 100%;
            left:0%;
            top:0%;
            transform:  scale(2) translate(0% , 0%) ;
        `
        move_imgCenterZoom.style.visibility='visible'
        
        imgElm.src=main_content__box.firstElementChild.src
        move_imgCenterZoom.append(imgElm)
    });
})


function Fmain_content__boxMousemove(e) {
    move_imgCenterZoom.style.left=e.pageX-(Number.parseInt(getComputedStyle(move_imgCenterZoom).width)/2)+'px'
    move_imgCenterZoom.style.top=e.pageY-(Number.parseInt(getComputedStyle(move_imgCenterZoom).height)/2)+'px'
    imgElm.style.transform=`scale(${imgElmScale}) translate(${-(e.layerX)/2}px, ${-(e.layerY)/2}px)`;

}




// addEventListener main_content__box

main_content__box.addEventListener('mousemove',Fmain_content__boxMousemove)
// main_content__box.addEventListener('kaydown')
document.onkeydown=(e)=>{
    // e.preventDefault()
    if(e.ctrlKey){
        if(e.key=='ArrowRight')
        imgElmScale+=0.25
        else if(e.key=='ArrowLeft')
        imgElmScale-=0.25
    
        if(imgElmScale>=10 || imgElmScale<=0)
        imgElmScale=3

        if(e.key=='ArrowUp')
            imgElmSize+=2
        else if(e.key=='ArrowDown')
        imgElmSize-=2

        if(imgElmSize>=25 || imgElmSize<=5)
            imgElmSize=15

        move_imgCenterZoom.style.width=imgElmSize+'vw'
        move_imgCenterZoom.style.height=imgElmSize+'vw'
        imgElm.style.transform=`scale(${imgElmScale}) translate(${-(window.screenY)/2}px, ${-(window.screenX)/2}px)`;
    }
    // console.log(e.pageX,e.layerX,e.clientX,e.offsetX);
}




main_content__box.addEventListener('mouseenter',(e)=>{
    move_imgCenterZoom.style.transform='scale(1)'
    move_imgCenterZoom.style.transition=' all 300ms ease'
    setTimeout(()=>{
        move_imgCenterZoom.style.transition='all 0ms ease'

    },20)

})


main_content__box.addEventListener('mouseleave',(e)=>{
    move_imgCenterZoom.style.transition=' all 300ms ease'
    move_imgCenterZoom.style.transform='scale(0)'
})







let ModuleSectionPropertis = document.getElementById('ModuleSectionPropertis')
, btnPropertisFooter = document.getElementById('btnPropertisFooter')





function FeventKeyEscModule(e) {
    if(e.key=='Escape'){
        FModuleSectionPropertisClick({target:{id:'ModuleSectionPropertis'}})
    }
}





function FModuleSectionPropertisClick(e) {
    if(e.target.id==='ModuleSectionPropertis'){
    // document.body.className=null
    ModuleSectionPropertis.style.transform=' translateX(-50%) scale(0)'
    ModuleSectionPropertis.style.opacity='0'
    // ModuleSectionPropertis.style.top='25%'
        window.removeEventListener('click',FeventKeyEscModule)
    }
}




function FbtnPropertisFooterClick(e) {
    // console.log();
    // if(e.target.id==='ModuleSectionPropertis'){
    // document.body.className=null
    ModuleSectionPropertis.style.transform=' translateX(-50%) scale(1)'
    ModuleSectionPropertis.style.opacity='1'
    // ModuleSectionPropertis.style.top='25%'

    window.addEventListener('keydown',FeventKeyEscModule)

    // }
}
// console.log(ModuleSectionPropertis);
ModuleSectionPropertis.addEventListener('click',FModuleSectionPropertisClick)
btnPropertisFooter.addEventListener('click',FbtnPropertisFooterClick)





setTimeout(()=>{

    document.body.classList.remove('form_groupSignin_contentHideTUp')
    
},200)


// FfixTagLinkA()



    let rightimgBy = document.getElementById('rightimgBy'),
        rightimg2By = document.getElementById('rightimg2By'),
        backimgBy = document.getElementById('backimgBy'),
        frontimgBy = document.getElementById('frontimgBy'),
        topimgBy = document.getElementById('topimgBy'),
        PraiceFooterBy = document.getElementById('PraiceFooterBy'),
        typeBy = document.getElementById('typeBy'),
        typecuminBy = document.getElementById('typecuminBy'),
        propertisBy = document.getElementById('propertisBy')    

// console.log(location.search.slice(1))
                            fetch('http://'+MyIp+'/shooosiz/apis/getPro/getPro.php',{
                                    method: 'POST',
                                         headers: {
                                           'Content-Type': 'application/json', 
                                         },
                                         body: JSON.stringify({
                                            id:location.search.slice(1),                             
                                         }),
                                            credentials: 'include'
                                }).then(ee=>{
                                    // console.log(ee)
                                    return ee.json();
                                }).then(ee=>{
                                    // FshowModule(ee.message, ee.success, 5000)
                                    // console.log(ee.product[0])
                                    // console.log(PraiceFooterBy.innerHTML)
                                    rightimgBy.src=ee.product[0].rightimg??'./img/ChoicePageG/shoosh/p/JORDAN.png'
                                    rightimg2By.src=ee.product[0].rightimg??'./img/ChoicePageG/shoosh/p/JORDAN.png'
                                    backimgBy.src=ee.product[0].backimg??'./img/ChoicePageG/shoosh/p/Back.png'
                                    frontimgBy.src=ee.product[0].frontimg??'./img/ChoicePageG/shoosh/p/removebg.png'
                                    topimgBy.src=ee.product[0].topimg??'./img/ChoicePageG/shoosh/p/nnUp.png'
                                    imgElm.src=main_content__box.firstElementChild.src
                                    
                                    PraiceFooterBy.innerHTML=ee.product[0].pricepro
                                    typeBy.innerHTML=ee.product[0].type
                                    typecuminBy.innerHTML=ee.product[0].typecumin
                                    propertisBy.innerText=ee.product[0].propertis
                                    // console.log(ee.product[0].propertis,propertisBy.innerHTML)
                                }).catch(ee=>{
                                    // console.log(ee)
                                // FshowModule(' اطلاعات ارسال نشد ', false, 5000)
                                })







                                let foterMain_AddProduct = document.getElementsByClassName('foterMain_AddProduct')[0]
                                // console.log(window.MyIp,window.user_id)
                                foterMain_AddProduct.addEventListener('click',(e)=>{
                                    sabadKharid = JSON.parse(localStorage.getItem('sabadKharid'))??[]
                                    if(window.user_id){
                                    if(sabadKharid.length>=1){
                                       if(!sabadKharid.find(element=>{
                                            if(element.id==location.search.slice(1) && window.user_id == element.user_id){
                                        element.conte++
                                FshowModule(  '  محصول در سبد خرید وجود داشت و تعداد آن افزایش یافت ! ' , true , 5000)

                                                return true
                                            }})){
                      sabadKharid.push({id:location.search.slice(1),conte:1,user_id : window.user_id})
                FshowModule(  '  محصول با موفقیت به سبد خرید اضافه شد ! ' , true , 5000)

                                        }}

                                    // for (const element of sabadKharid) {
                                // console.log(element)
                                        // if(element.id==location.search.slice(1) && window.user_id == element.user_id){

                                            // element.conte++
            // FshowModule(  '  محصول در سبد خرید وجود داشت و تعداد آن افزایش یافت ! ' , true , 5000)
                                        //  break
                                        // }
                                        // else if( window.user_id == element.user_id){

                                            // sabadKharid.push({id:location.search.slice(1),conte:1,user_id : window.user_id})
            // FshowModule(  '  محصول با موفقیت به سبد خرید اضافه شد ! ' , true , 5000)
            // break
                                        // }
                                    // console.log(sabadKharid)

                                    
                                    else{
                                        sabadKharid.push({id:location.search.slice(1),conte:1,user_id : window.user_id})
                                        FshowModule(  '  محصول با موفقیت به سبد خرید اضافه شد ! ' , true , 5000)
                            
                                    }
            localStorage.setItem('sabadKharid',JSON.stringify(sabadKharid))
                                }
                                else{
                                    FshowModule(  '  برای خرید اول وارد شوید ! ' , false , 5000)
                                }
                                    // console.log(location.search.slice(1))
                                })





                                