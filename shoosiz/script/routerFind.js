import router from './router.js'
window.MyIp='192.168.64.250';
// window.MyIp='192.168.107.250';
// window.MyIp='192.168.249.1';
// window.MyIp='192.168.1.3'
// window.MyIp='192.168.1.5';
// window.MyIp='192.168.45.1'
// window.MyIp='192.168.193.250'



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

export function FmeineGetHTMLcodeSPR(urlName = '.' + /\/\w+(\.\w*|[^\/])$/.exec(location.pathname)[0],positionScrool=null) {
    // console.log(urlName)
    // console.log(router(urlName))

    if(urlName=='loguot'){
        localStorage.removeItem("token");
        FmeineGetHTMLcodeSPR('./index')
        
        // location.reload()
        return true
    }

    fetch(router(urlName).rout).then((e) => {
        e.text().then(ee => {
           
            window.document.head.parentElement.innerHTML = ee;

            // لود دوباره اسکریپت‌ها به ترتیب
            let scripts = document.querySelectorAll('script');
            loadScriptsSequentially(scripts, 0);

            if(positionScrool){
                // window.document.documentElement.style.transition='all 1s ease'
                // console.log(window.document.documentElement.scrollTop=window.document.documentElement.offsetHeight)

                setTimeout(() => {
                    
                    window.scrollTo({  
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'  // انیمیشن نرم  
                      });
                }, 100);
                // console.log(CallToMeFooter.offsetParent.offsetHeight,CallToMeFooter,CallToMeFooter.offsetParent.scrollHeight)
            }

            return ee;
        });
        return null;
    }).catch(e => {
        // console.log(e);
    });
    // console.log('first')
    // window.load()
    // window.onload('f')

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
    // console.log(document.querySelectorAll('.aOtherPage'))
    document.querySelectorAll('.aOtherPage').forEach(e=>{

    // console.log(e)


        e.addEventListener('click',ee=>{
            ee.preventDefault()
            if(e.getAttribute('href')!='loguot'){
                history.pushState({},'',e.href)
            }

            if(!e.classList.contains('aOtherPageLink'))
            FmeineGetHTMLcodeSPR(e.getAttribute('href'))
        else{
            e.getAttribute('href')
            FmeineGetHTMLcodeSPR(e.getAttribute('href'),100)
        }
        })

    }) 
}


FfixTagLinkA();
// [1,2].forEach

    window.onpopstate= async e=>{
        //         // e.preventDefault()
        await FmeineGetHTMLcodeSPR('.'+e.target.location.pathname)
        // window.onload()
    }

        
        fetch(window.location.href).then((e)=>{
          if(e.headers.get('X-Scroll-To-ID')=='#CallToMeFooter'){
            setTimeout(()=>{
                window.scrollTo({  
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'  // انیمیشن نرم  
                  });
            },100)
          }
         }
        )
// })
// FfixTagLinkA()
    // if ('caches' in window) {
    //     caches.keys().then(function(cacheNames) {
    //       cacheNames.forEach(function(cacheName) {
    //         caches.delete(cacheName);
    //       });
    //     });
    //   }

    

