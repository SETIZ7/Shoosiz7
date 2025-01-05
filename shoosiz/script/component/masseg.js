const srcReject='./svg/modul/277fe01c99e71acc081b275f6ca30c.svg'
const srcAcsept='./svg/modul/store-verified-shopping-svgrepo-com.svg';
let conter=0;
(function FmessegHandeler() {
    let myElm=`<div class="ComponentMyModul ComponentMyModulHide">
    <p>  عملیات موفقیت امیز بود ! </p>
    <div>
    <img src=${srcReject} alt="img">
    </div>
    </div>`

    document.body.insertAdjacentHTML('afterbegin',myElm)
})()

function FWindowClick(e) {
    window.removeEventListener('click',FWindowClick)
    if(e.target.classList[0]!='ComponentMyModul'){
        FhideModule()
    }
}

export function FshowModule(messeg='عملیات موفقیت امیز بود !',icon=true,time=3000) {
   let myElmFind = document.getElementsByClassName('ComponentMyModul')[0];
   myElmFind.getElementsByTagName('p')[0].innerText = messeg
   if(icon)
    myElmFind.getElementsByTagName('img')[0].src = srcAcsept
else
myElmFind.getElementsByTagName('img')[0].src = srcReject

    myElmFind.className='ComponentMyModul'
    setTimeout(()=>{
        window.addEventListener('click',FWindowClick)
    },1)
    setTimeout(()=>{
        FhideModule()
    },time)
}


export function FhideModule() {
   let myElmFind = document.getElementsByClassName('ComponentMyModul')[0];
    myElmFind.className='ComponentMyModul ComponentMyModulHide'
    window.removeEventListener('click',FWindowClick)
}






