import router from './router.js'

// export function FmeineGetHTMLcodeSPR(urlName='.'+/(\/\w+(\.\w*|[^\/])$)/.exec(location.pathname)[0]) {
//     // console.log(router(urlName).rout)
//     fetch(router(urlName).rout).then((e)=>{
        
//         e.text().then(ee=>{

//             console.log(window.onpopstate)
//             // window.onpopstate=null
//             // console.log(window.onpopstate)
//             window.document.head.parentElement.innerHTML=ee
//             document.querySelectorAll('script').forEach(e=>{
//                 e.remove()
//                 // console.log(e)
//                 let newScript = document.createElement('script')
//                 newScript.src=e.getAttribute('src');
//                 if(e.innerHTML){
//                     newScript.src=''
//                     newScript.innerHTML=e.innerHTML;
//                 }
//             else{
//                 if(e.getAttribute('type'))
//                     newScript.setAttribute('type','module')
//             }
//             document.body.append(newScript)
//             })
//             return ee
//         })
//         return null
//     }).catch(e=>{
//         console.log(e)
//     })
// }

export function FmeineGetHTMLcodeSPR(urlName = '.' + /\/\w+(\.\w*|[^\/])$/.exec(location.pathname)[0]) {
    fetch(router(urlName).rout).then((e) => {
        e.text().then(ee => {
            // حذف HTML فعلی و جایگزینی با HTML جدید
            window.document.head.parentElement.innerHTML = ee;

            // لود دوباره اسکریپت‌ها به ترتیب
            let scripts = document.querySelectorAll('script');
            loadScriptsSequentially(scripts, 0);

            return ee;
        });
        return null;
    }).catch(e => {
        console.log(e);
    });
}
function loadScriptsSequentially(scripts, index) {
    if (index >= scripts.length) return;

    let oldScript = scripts[index];
    let newScript = document.createElement('script');
    newScript.src = oldScript.src ? oldScript.src + '?' + new Date().getTime() : '';
    if (oldScript.innerHTML) {
        newScript.src = '';
        newScript.innerHTML = oldScript.innerHTML;
    } else {
        if (oldScript.getAttribute('type'))
            newScript.setAttribute('type', 'module');
    }

    newScript.onload = () => {
        loadScriptsSequentially(scripts, index + 1);
    };

    newScript.onerror = () => {
        console.error(`Failed to load script: ${newScript.src}`);
        loadScriptsSequentially(scripts, index + 1);
    };

    document.body.appendChild(newScript);
    oldScript.remove();
}

// function loadScriptsSequentially(scripts, index) {
//     if (index >= scripts.length) return;

//     let oldScript = scripts[index];
//     let newScript = document.createElement('script');
//     newScript.src = oldScript.getAttribute('src');
//     if (oldScript.innerHTML) {
//         newScript.src = '';
//         newScript.innerHTML = oldScript.innerHTML;
//     } else {
//         if (oldScript.getAttribute('type'))
//             newScript.setAttribute('type', 'module');
//     }

//     newScript.onload = () => {
//         loadScriptsSequentially(scripts, index + 1);
//     };

//     newScript.onerror = (er) => {
//         console.error(`Failed to load script: ${newScript.src}`,er);
//         loadScriptsSequentially(scripts, index + 1);
//     };

//     document.body.appendChild(newScript);
//     oldScript.remove();
// }



export default function FfixTagLinkA() {
    console.log(document.querySelector('.aOtherPage').onclick)
    document.querySelectorAll('.aOtherPage').forEach(e=>{
        e.addEventListener('click',ee=>{
            ee.preventDefault()
            history.pushState({},'',e.href)
            FmeineGetHTMLcodeSPR(e.getAttribute('href'))
        })

    }) 
}


FfixTagLinkA();
[1,2].forEach

    window.onpopstate=e=>{
        //     console.log('first1')
        //         // e.preventDefault()
        FmeineGetHTMLcodeSPR('.'+/(\/\w+(\.\w*|[^\/])$)/.exec(e.target.location.pathname)[0].slice(0,-5),e.target.location.href)
        }
// })
// FfixTagLinkA()
    // if ('caches' in window) {
    //     caches.keys().then(function(cacheNames) {
    //       cacheNames.forEach(function(cacheName) {
    //         caches.delete(cacheName);
    //       });
    //     });
    //   }

    

