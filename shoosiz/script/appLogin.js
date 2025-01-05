const slides = document.querySelector('.slides');
const slideButtons = document.querySelectorAll('.navigation button');
const totalSlides = document.querySelectorAll('.slide').length;
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let moveX = 0;
let autoSlideInterval;


let loginStatuse = 'login'



function goToSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateNavButtons(index);
}

function updateNavButtons(index) {
    slideButtons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// دکمه‌های ناوبری را فعال و غیر فعال می‌کنیم
slideButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentIndex = index;
        goToSlide(currentIndex);
    });
});








function FEmousedownSlides(e) {
    slides.style.transition = 'none'; // غیرفعال کردن انیمیشن هنگام درگ
    clearInterval(autoSlideInterval)
    isDragging = true;
    startX = e.clientX??e.touches[0].clientX;
}


function FEmouseupSlides() {
    clearInterval(autoSlideInterval)
    autoSlide();
    if (!isDragging) return;
    isDragging = false;

    // اگر حرکت موس به اندازه کافی زیاد بود، اسلاید به جلو یا عقب می‌رود
    if (Math.abs(moveX) > 50) {
        if (moveX > 0 && currentIndex > 0) currentIndex--; // عقب رفتن
        else if (moveX < 0 && currentIndex < totalSlides - 1) currentIndex++; // جلو رفتن
    }
    slides.style.transition = "transform 0.5s ease-in-out";
    goToSlide(currentIndex); // اسلاید به مکان جدید برمی‌گردد
}


function FEmousemoveSlides(e) {
    if (!isDragging) return;
    moveX = (e.clientX ?? e.touches[0].clientX) - startX;
    slides.style.transform = `translateX(calc(-${currentIndex * 100}% + ${moveX}px))`; // اسلاید به موقعیت جدید کشیده می‌شود
}




// window.ontouchstart=()=>

slides.addEventListener('mousedown', FEmousedownSlides);
slides.addEventListener('touchstart', FEmousedownSlides);


slides.addEventListener('mousemove', FEmousemoveSlides);
slides.addEventListener('touchmove', FEmousemoveSlides);




slides.addEventListener('mouseup', FEmouseupSlides);
slides.addEventListener('touchend', FEmouseupSlides);

slides.addEventListener('mouseleave', FEmouseupSlides);


// راه‌اندازی خودکار اسلاید

function autoSlide() {
    slides.style.transition = "transform 1.5s ease-in-out"; // انیمیشن فعال می‌شود
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }, 5000);
}

autoSlide();






// section R



















let passwordFormBox = $.getElementById('passwordBox'),
    passwordFormBoxRemember = $.getElementById('passwordBoxRemember'),
    inputPasswordRemember = $.getElementById('inputPasswordRemember'),
    inputPassword = $.getElementById('inputPassword'),
    emailBox = $.getElementById('emailBox'),
    inputEmail = $.getElementById('inputEmail'),
    myCheckboxRemember = $.getElementById('myCheckboxRemember'),
    inputConfirmeitionFirstName = $.getElementById('inputConfirmeitionFirstName'),
    inputConfirmeitionLastName = $.getElementById('inputConfirmeitionLastName'),
    submitBtn = $.getElementById('submit')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^\S{8,16}$/;


let testEmail = inputEmail.value;
let testPassword = inputPassword.value;
let testPasswordRemember = inputPasswordRemember.value;


let btnLoginChoice = $.getElementById('btnLoginChoice'),
    btnSigninChoice = $.getElementById('btnSigninChoice'),
    form_toggleBGMover = $.getElementsByClassName('form_toggleBGMover')[0],
    form_footerLink = $.getElementById('form_footerLink'),
    form_groupSignin_content = $.getElementsByClassName('form_groupSignin_content')[0],
    form_footer = $.getElementsByClassName('form_footer')[0],
    form_toggle = $.getElementsByClassName('form_toggle')[0],
    unRemember_BackToLogin = $.getElementsByClassName('unRemember_BackToLogin')[0],
    checkbox_group = $.getElementsByClassName('checkbox_group')[0],
    inputbox_emailCode = $.getElementsByClassName('inputbox_emailCode')[0],
    emailCodebox_parent = $.getElementsByClassName('emailCodebox_parent')[0]


let intervalSubmitBTN


// document.body.addEventListener('click',(e)=>{
// e.preventDefault()
// })

function FpasswordFormBoxChangeSvgMode(e) {

    if (e.target.parentElement.classList[2] == 'password_formOn') {

        e.target.parentElement.classList.add('password_formOff');
        e.target.parentElement.classList.remove('password_formOn');


    } else {
        e.target.parentElement.classList.remove('password_formOff');
        e.target.parentElement.classList.add('password_formOn');
    }

}


passwordFormBox.firstElementChild.addEventListener('click', FpasswordFormBoxChangeSvgMode)

passwordFormBoxRemember.firstElementChild.addEventListener('click', FpasswordFormBoxChangeSvgMode)







import {
    FshowModule,
    FhideModule
} from './component/masseg.js'
import FrundomCreate from './component/rundom.js'


let inputCodeSend=FrundomCreate(5);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    testEmail = inputEmail.value;
    testPassword = inputPassword.value;
    testPasswordRemember = inputPasswordRemember.value;
    let inputCode=''
    for (const element of inputbox_emailCode.children) {
        inputCode+=element.firstElementChild.value
    }
    
    // console.log(emailRegex.test(testEmail)); // true
    // console.log(passwordRegex.test(testPassword)); // true
    // console.log(myCheckboxRemember.value); // true
    if (loginStatuse != 'unRemember' && loginStatuse != 'unRememberPassword') {
        if (emailRegex.test(testEmail) && passwordRegex.test(testPassword))
            FshowModule(' اطلاعات موفقیت آمیز بود ', true, 5000)
        else if (emailRegex.test(testEmail))
            FshowModule(' رمز عبور باید 8 تا 16 کاراکتر باشد !', false, 5000)
    } else if (loginStatuse == 'unRemember') {
        if (emailRegex.test(testEmail)){
            FshowModule(' کد به ایمیل شما ارسال شد', true, 3000)
            FmoveLoginSigninBtnHandler({target:{id:'unRememberPassword'},preventDefault:()=>{}})
        }else{
            FshowModule(' ایمیل شما معتبر نیست ! ', false, 3000)
        }
    }
    else{
        if(passwordRegex.test(testPassword) && passwordRegex.test(testPasswordRemember)){
            if(testPassword!==testPasswordRemember){
            FshowModule(' رمز عبور باید با رمز عبور مجدد یکی باشد!', false, 3000)
            }else if(inputCode==inputCodeSend){
            FshowModule(' رمز عبور با موفقیت تغییر کرد!', true, 3000)
            }else{
            FshowModule(' کد شما نا معتبر است !', false, 3000)
            }
        }else{
            FshowModule(' رمز عبور باید 8 تا 16 کاراکتر باشد !', false, 3000)
        }
    }
})





function FEchangeInputEmail(e) {
    if (!emailRegex.test(e.target.value)) {
        inputEmail.style.border = 'solid 0.1vw #ff000096'
        inputEmail.style.boxShadow = '0 0 1vw #ff000096'
    } else {
        inputEmail.style.border = 'solid 0.1vw #ff000000'
        inputEmail.style.boxShadow = '0 0 1vw #ff000000'
    }
}

function FEchangeInputPassword(e) {
    
    if (!passwordRegex.test(e.target.value) && e.target.value) {
        inputPassword.style.border = 'solid 0.1vw #ff000096'
        inputPassword.style.boxShadow = '0 0 1vw #ff000096'
    } else {
        inputPassword.style.border = 'solid 0.1vw #ff000000'
        inputPassword.style.boxShadow = '0 0 1vw #ff000000'
    }
}






inputEmail.addEventListener('change',FEchangeInputEmail)
inputPassword.addEventListener('change',FEchangeInputPassword)
inputPasswordRemember.addEventListener('change',FEchangeInputPassword)


inputEmail.addEventListener('keydown', e =>{
    if(e.key=='Enter' && loginStatuse!=='unRemember') inputPassword.focus()
    })

inputPassword.addEventListener('keydown', e =>{

    if(e.key=='Enter' && loginStatuse==='unRememberPassword'){
        inputPasswordRemember.focus()
    }
    else{
        submitBtn.click()
    }
    
})

inputPasswordRemember.addEventListener('keydown', e =>{
    if(e.key=='Enter' && loginStatuse=='unRememberPassword')
       inputbox_emailCode.firstElementChild.firstElementChild.focus()
})

inputbox_emailCode.lastElementChild.firstElementChild.addEventListener('keydown', e =>{
    if(e.key=='Enter')
        submitBtn.click()
})

















function FmoveLoginSigninBtnHandler(e) {
    e.preventDefault()
    clearInterval(intervalSubmitBTN)
    inputConfirmeitionFirstName.setAttribute('disabled','')
    inputConfirmeitionLastName.setAttribute('disabled','')
    inputPassword.value=null
    FEchangeInputPassword({target:{value:inputPassword.value}})
    inputPasswordRemember.value=null
    FEchangeInputPassword({target:{value:inputPasswordRemember.value}})
    if (e.target.id == 'btnSigninChoice' && loginStatuse == 'login') {
        loginStatuse = 'signin';
        btnLoginChoice.className = ''
        btnSigninChoice.classList = 'active'
        form_toggleBGMover.style.left = 0
        form_groupSignin_content.classList.remove('form_groupSignin_contentHide')
        inputConfirmeitionFirstName.removeAttribute('disabled')
        inputConfirmeitionLastName.removeAttribute('disabled')

        form_footer.classList.add('form_groupSignin_contentHide1')

        let submitBtnP = submitBtn.getElementsByTagName('p')[0];
        // submitBtnP.innerHTML='ورود';


        let flagSubmit = true,
            firstText = 'ثبت',
            lastText = ''

        intervalSubmitBTN = setInterval(() => {
            if (submitBtnP.innerHTML.length && flagSubmit) {
                submitBtnP.innerHTML = submitBtnP.innerHTML.slice(0, -1)
            } else {
                flagSubmit = false
                if (firstText.length) {
                    lastText += firstText[0];
                    firstText = firstText.substring(1);
                    submitBtnP.innerHTML = lastText
                } else
                    clearInterval(intervalSubmitBTN)
            }
        }, 200)



    } else if (e.target.id == 'btnLoginChoice' && loginStatuse == 'signin') {
        loginStatuse = 'login';
        btnSigninChoice.classList = ''
        btnLoginChoice.className = 'active'
        form_toggleBGMover.style.left = null
        form_groupSignin_content.classList.add('form_groupSignin_contentHide')
        form_footer.classList.remove('form_groupSignin_contentHide1')


        let submitBtnP = submitBtn.getElementsByTagName('p')[0];
        //    submitBtnP.innerHTML='ثبت'

        let flagSubmit = true,
            firstText = 'ورود',
            lastText = ''

        intervalSubmitBTN = setInterval(() => {
            if (submitBtnP.innerHTML.length && flagSubmit) {
                submitBtnP.innerHTML = submitBtnP.innerHTML.slice(0, -1)
            } else {
                flagSubmit = false
                if (firstText.length) {
                    lastText += firstText[0];
                    firstText = firstText.substring(1);
                    submitBtnP.innerHTML = lastText
                } else
                    clearInterval(intervalSubmitBTN)
            }
        }, 200)
    } else if (e.target.id == 'form_footerLink') {

        loginStatuse = 'unRemember'
        form_toggle.classList.add('form_groupSignin_contentHide3')
        unRemember_BackToLogin.classList.remove('form_groupSignin_contentHide')
        passwordFormBox.classList.add('form_groupSignin_contentHide2')
        checkbox_group.classList.add('form_groupSignin_contentHide2')
        form_footer.classList.add('form_groupSignin_contentHide1')


        let submitBtnP = submitBtn.getElementsByTagName('p')[0];
        let flagSubmit = true,
            firstText = 'ورود',
            lastText = ''

        intervalSubmitBTN = setInterval(() => {
            if (submitBtnP.innerHTML.length && flagSubmit) {
                submitBtnP.innerHTML = submitBtnP.innerHTML.slice(0, -1)
            } else {
                flagSubmit = false
                if (firstText.length) {
                    lastText += firstText[0];
                    firstText = firstText.substring(1);
                    submitBtnP.innerHTML = lastText
                } else
                    clearInterval(intervalSubmitBTN)
            }
        }, 200)
    } else {
        console.log(inputCodeSend);
        loginStatuse = 'unRememberPassword'
        passwordFormBox.classList.remove('form_groupSignin_contentHide2')
        emailBox.classList.add('form_groupSignin_contentHide2')
        passwordFormBoxRemember.classList.remove('form_groupSignin_contentHide2')
        emailCodebox_parent.classList.remove('form_groupSignin_contentHide3')
        unRemember_BackToLogin.getElementsByTagName('h3')[0].innerHTML='لطفا رمز عبور جدید خود را وارد کنید:'
    }

}

function FbackToLoginSigninBtn() {
    clearInterval(intervalSubmitBTN)
    loginStatuse = 'login'
    form_toggle.classList.remove('form_groupSignin_contentHide3')
    unRemember_BackToLogin.classList.add('form_groupSignin_contentHide')
    passwordFormBox.classList.remove('form_groupSignin_contentHide2')
    checkbox_group.classList.remove('form_groupSignin_contentHide2')
    form_footer.classList.remove('form_groupSignin_contentHide1')
    emailBox.classList.remove('form_groupSignin_contentHide2')
    passwordFormBoxRemember.classList.add('form_groupSignin_contentHide2')
    emailCodebox_parent.classList.add('form_groupSignin_contentHide3')

    unRemember_BackToLogin.getElementsByTagName('h3')[0].innerHTML='با ایمیلی که ثبت نام کردین وارد شوید!'



    let submitBtnP = submitBtn.getElementsByTagName('p')[0];
    let flagSubmit = true,
        firstText = 'ورود',
        lastText = ''

    intervalSubmitBTN = setInterval(() => {
        if (submitBtnP.innerHTML.length && flagSubmit) {
            submitBtnP.innerHTML = submitBtnP.innerHTML.slice(0, -1)
        } else {
            flagSubmit = false
            if (firstText.length) {
                lastText += firstText[0];
                firstText = firstText.substring(1);
                submitBtnP.innerHTML = lastText
            } else
                clearInterval(intervalSubmitBTN)
        }
    }, 200)
}



function Finputbox_emailCodeEventKeydown(e) {
    e.preventDefault()
    if (e.key == 'Backspace') {
        e.target.value = ''
        if (e.target.parentElement.previousElementSibling)
            e.target.parentElement.previousElementSibling.firstElementChild.focus();
    } else if (/^[a-zA-Z0-9]$/.test(e.key)) {
        e.target.value = e.key

        if (e.target.parentElement.nextElementSibling)
            e.target.parentElement.nextElementSibling.firstElementChild.focus()

    } else {
        switch (e.key) {
            case 'ArrowRight':
                if (e.target.parentElement.nextElementSibling)
                    e.target.parentElement.nextElementSibling.firstElementChild.focus()
                break;
            case 'ArrowLeft':
                if (e.target.parentElement.previousElementSibling)
                    e.target.parentElement.previousElementSibling.firstElementChild.focus();
                break;

            case 'Tab':
                if (e.target.parentElement.nextElementSibling)
                    e.target.parentElement.nextElementSibling.firstElementChild.focus()
                break;

            default:
                break;
        }
    }



}




unRemember_BackToLogin.firstElementChild.addEventListener('click', FbackToLoginSigninBtn)
btnLoginChoice.addEventListener('click', FmoveLoginSigninBtnHandler)
btnSigninChoice.addEventListener('click', FmoveLoginSigninBtnHandler)
form_footerLink.addEventListener('click', FmoveLoginSigninBtnHandler)


for (const element of inputbox_emailCode.children) {
    element.firstElementChild.addEventListener('keydown', Finputbox_emailCodeEventKeydown)
}