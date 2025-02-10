import {
    FshowModule,
    FhideModule
} from './component/masseg.js'

(function async ()  {

let sabadKharidFuce = JSON.parse(localStorage.getItem('sabadKharid')) ?? []
let sabadKharid

let arratForGetDetailsProUploded=[]
,detailsBayBox = document.getElementById('detailsBayBox'),
boxBtnBayFooter = document.getElementById('boxBtnBayFooter'),
cartContainer = document.getElementById('cartContainer')

// window.addEventListener('dblclick',()=>{
    
    

    
    // fetch('http://'+window.MyIp+'/shooosiz/apis/loginpart/protected.php', {
        //     method: 'GET',
        //     headers: {
            //       // ...(token && { 'Authorization': 'Bearer ' + token }),
            //       "Authorization": `Bearer ${localStorage.getItem("token")}`,  
            //       'Content-Type': 'application/json'
            //     }
            // })
            // .then(response => response.json())
            // .then(data => {
                //     console.log(data)
                // })
                // .catch(error => console.error('Error:', error));
 



     

// })





    let priceAllElm = document.getElementsByClassName('priceProAll')[0],
    priceAll = priceAllElm.innerHTML
    ,offerAllPro = 0




    function FgetPrduct(){
        //  sabadKharid = JSON.parse(localStorage.getItem('sabadKharid')) ?? []
        sabadKharid=[]
        for (const key of sabadKharidFuce) {
            if(key.user_id == window.user_id){
                sabadKharid.push(key)
            }
            // console.log('sabadKharid')
}

    return sabadKharid
    }



function FgetPriceAll(){
    let cart_items = document.getElementsByClassName('cart_items')[0]
    let conteProAll = document.getElementsByClassName('conteProAll')[0]
    priceAll=0

    conteProAll.innerHTML=cart_items.children.length
    for (const iterator of cart_items.children) {
                priceAll+=(Number(iterator.querySelector('.pricePro').innerHTML.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/٬/g, "")))
                 * +iterator.querySelector('.contePro').innerHTML

                // console.log( priceAll, parseInt((iterator.querySelector('.pricePro').innerHTML).replace(/٬/g, ""), 10), +iterator.querySelector('.contePro').innerHTML)
                // console.log(iterator.querySelector('.pricePro').innerHTML,)
}
priceAllElm.innerHTML= ((priceAll*(100-offerAllPro))/100).toLocaleString()
}





function FnewBTNElmfigureMQty(e) {
    let i = 0

    for (const iterator of sabadKharidFuce) {
        
        for (const element of sabadKharid) {
            if(iterator.user_id==element.user_id && iterator.id == this.parentElement.dataset.productid){

                if(iterator.conte<=1){
                    sabadKharidFuce.splice(i,1)
                    this.parentElement.parentElement.parentElement.remove()
                }else{
                    iterator.conte--
                }
                this.parentElement.querySelector('.contePro').innerHTML=iterator.conte

            localStorage.setItem('sabadKharid',JSON.stringify(sabadKharidFuce))
                    break
                }
        }
   i++ 
}
    FgetPrduct()
    FgetPriceAll()
}

function FnewBTNElmfigurePQty(e) {

    for (const iterator of sabadKharidFuce) {
        
        for (const element of sabadKharid) {
            if(iterator.user_id==element.user_id && iterator.id == this.parentElement.dataset.productid){

                    iterator.conte++
                
                this.parentElement.querySelector('.contePro').innerHTML=iterator.conte

            localStorage.setItem('sabadKharid',JSON.stringify(sabadKharidFuce))
                    break
                }
        }
}
    FgetPrduct()
    FgetPriceAll()
}


    
    // window.onload=()=>{
         sabadKharidFuce = JSON.parse(localStorage.getItem('sabadKharid')) ?? []
        sabadKharid = sabadKharidFuce

        // console.log(FgetPrduct())
        // console.log('sss')
        fetch('http://'+window.MyIp+'/shooosiz/apis/getPro/getAllPro.php?id='+FgetPrduct().map(e=> e.id).toLocaleString())
        .then(response => response.json())
        .then(data => {
           let cart_items = document.getElementsByClassName('cart_items')[0]
           cart_items.innerHTML=''
            sabadKharid.forEach(element => {
                data.products.find(ee=>{

                    if(ee.productid==element.id){
                        cart_items.insertAdjacentHTML('beforeend',`
                             <div class="cart_item flex-col ssm:flex-row text-center ssm:text-right text-xl sm:text-2xl leading-8 sm:leading-12" 
                             data-productid="${ee.productid}">

                <img src="${ee.images[0].frontimg}" alt="کفش نایک" class="product_image h-16 object-cover">

                <div class="product_info justify-center ssm:justify-end  flex-auto leading-10">

                    <h3 class="font-['PeydaB'] font-bold sm:text-3xl"> ${ee.namepro} </h3>

                    <p class=" font-['PeydaL']"> تومان  <span class="pricePro"> ${((((+ee.pricepro)||2899000)*(100-ee.offerpro))/100).toLocaleString('ar-SA')} </span> </p>

                    <div class="quantity_control justify-center ssm:justify-start h-10" data-productid="${ee.productid}">
                        <button class="conteProMinez size-10 active:text-4xl transition-all  hover:bg-[var(--mainColorWW)]"> - </button>
                        <span class="contePro p-6 font-['PeydaB']" > ${element.conte} </span>
                        <button class=" conteProPlus size-10 active:text-4xl transition-all  hover:bg-[var(--mainColorWW)]" > + </button>
                    </div>
                    
                </div>

                <span class="discount font-['PeydaB']"> <span class="offerPersenPro"> ${ee.offerpro} </span> % </span>

            </div>
                            `)
                        // console.log(ee,element)
                        return true
                    }

                })
            });

            cart_items.querySelectorAll('.conteProMinez').forEach(e=>{
                e.addEventListener('click',FnewBTNElmfigureMQty)
                // onclick="FnewBTNElmfigurePQty"
            })
            cart_items.querySelectorAll('.conteProPlus').forEach(e=>{
                e.addEventListener('click',FnewBTNElmfigurePQty)
                // onclick="FnewBTNElmfigurePQty"
            })
            FgetPrduct()
            FgetPriceAll()
        
        })
        .catch(error => console.error('Error:', error));
    // }





    let offerBtnAcsept = document.getElementById('offerBtnAcsept');
    let offerInputAcsept = document.getElementById('offerInputAcsept')
    let offerPersenProAll = document.getElementsByClassName('offerPersenProAll')[0]

    offerBtnAcsept.onclick=()=>{
        fetch('http://'+window.MyIp+'/shooosiz/apis/checkOffer/checkOffer.php?discount_code='+offerInputAcsept.value)
        .then(response => response.json())
        .then(data => {
            if(data.success){

                FshowModule( ' کد با موفقیت اعمال شد ' , data.success, 5000)
                offerInputAcsept.value=''
                offerAllPro = data.Offerpersen
                offerPersenProAll.innerHTML=data.Offerpersen
            FgetPriceAll()
            }
        else{
            FshowModule( ' کد اعمال نشد ' , data.success, 3000)
            offerInputAcsept.value=''
            offerAllPro = 0
            offerPersenProAll.innerHTML=0
        FgetPriceAll()

        }
            
            // console.log(data)
        })
        .catch(error => console.error('Error:', error));
    
    }








let byAllProBtn = document.getElementById('byAllProBtn')

byAllProBtn.addEventListener('click',()=>{
    // console.log(cart_items)
    let newSabadForData1 = []
    fetch('http://'+window.MyIp+'/shooosiz/apis/getPro/getAllPro.php?id='+FgetPrduct().map(e=> e.id).toLocaleString())
    .then(response => response.json())
    .then(data1 => {
        let i=0
        // console.log(sabadKharid)
        data1.products.forEach(ee=>{
            // console.log(ee,)
            newSabadForData1.push({productid:ee.productid,orderconte:sabadKharid[i].conte,statos:0,orderOffer:ee.offerpro})
            i++
        })
        
        // console.log()
        
        fetch('http://'+window.MyIp+'/shooosiz/apis/setPro/setPro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: sabadKharid[0].user_id,
            products:newSabadForData1
            // products: [
            //     { productid: 3, ordername: "اولین خرید", orderconte: 1, statos: 0, orderOffer: 10 },
            //     { productid: 6, ordername: "دومین خرید", orderconte: 2, statos: 0, orderOffer: 5 }
            // ]
        })
    })
    .then(response => response.json())
    .then(data => {
let cart_items = document.getElementsByClassName('cart_items')[0]
        FshowModule( data.message , data.success, 3000)
        if(data.success){
           let sabadKharidForRemove=[]
            for (const key of sabadKharidFuce) {
                if(key.user_id != window.user_id){
                    sabadKharidForRemove.push(key)
                }
    }

    localStorage.setItem('sabadKharid',JSON.stringify(sabadKharidForRemove))
    cart_items.innerHTML=''
    offerPersenProAll.innerHTML=0
    FgetPrduct()
    FgetPriceAll()
        }
        
    })
    .catch(error => console.error('Error:', error));
    
    })
})
    



    let beforBayingBtn = document.getElementById('beforBayingBtn'),
    nawBayingBtn = document.getElementById('nawBayingBtn')





    beforBayingBtn.addEventListener('click',e=>{
        // console.log(document.documentElement.classList.contains('active'))
    let cart_items = document.getElementsByClassName('cart_items')[0]
        cart_items.innerHTML=''


        if(!e.target.classList.contains('active')){

            cart_items.classList.add('lg:w-full')
            detailsBayBox.classList.remove('lg:w-1/4')
            detailsBayBox.classList.add('lg:w-0')
            cartContainer.classList.remove('gap-10')
            cartContainer.classList.add('justify-center')
            

            boxBtnBayFooter.classList.add('scale-0')    
            detailsBayBox.classList.add('scale-0')


            e.target.classList.add('active')
            nawBayingBtn.classList.remove('active')



            if(window.user_id && window.MyIp){

                fetch('http://'+window.MyIp+'/shooosiz/apis/backitemboxby/backitemboxby.php', {
                    method: 'GET',
                    headers: {
                      // ...(token && { 'Authorization': 'Bearer ' + token }),
                      "Authorization": `${window.user_id}`,  
                      'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
        cart_items.innerHTML=''

                    if(data.success){
                        // console.log(data.products)
                        
                        data.products.forEach(ee => {
                            // data.products.find(ee=>{
            
                                // if(ee.productid==element.id){
                                    cart_items.insertAdjacentHTML('beforeend',`
                                         <div class="cart_item flex-col ssm:flex-row text-center ssm:text-right text-xl sm:text-2xl leading-8 sm:leading-12 bg-[var(--btnColorB)]" 
                                         data-productid="${ee.productid}">
            
                            <img src="${ee.images[0].frontimg}" alt="کفش نایک" class="product_image h-16 object-cover">
            
                            <div class="product_info justify-center ssm:justify-end  flex-auto leading-10">
            
                                <h3 class="font-['PeydaB'] font-bold sm:text-3xl"> ${ee.namepro} </h3>
            
                                <p class=" font-['PeydaL']"> تومان  <span class="pricePro"> ${((((+ee.pricepro)||2899000)*(100-ee.offerpro))/100).toLocaleString('ar-SA')} </span> </p>
            
                                <div class="quantity_control justify-center ssm:justify-start h-10" data-productid="${ee.productid}">
                                   <p>تعداد :<span class="contePro p-6 font-['PeydaB']" >${ee.orderconte}</span></p>
                                </div>
                                
                            </div>
            
                            <span class="discount font-['PeydaB']"> <span class="offerPersenPro"> ${ee.offerpro} </span> % </span>
            
                        </div>
                                        `)
                                    // console.log(ee,element)
                                    // return true
                                // }
            
                            // })
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
                }
            

        }

    })
    nawBayingBtn.addEventListener('click',e=>{
        // let cart_items = document.getElementsByClassName('cart_items')[0]
        let cart_items = document.getElementsByClassName('cart_items')[0]
        cart_items.innerHTML=''

        if(!e.target.classList.contains('active')){
            // cart_items.classList.remove('lg:w-full')


            cart_items.classList.remove('lg:w-full')
            detailsBayBox.classList.add('lg:w-1/4')
            detailsBayBox.classList.remove('lg:w-0')
            cartContainer.classList.add('gap-10')
            cartContainer.classList.remove('justify-center')



            e.target.classList.add('active')
            beforBayingBtn.classList.remove('active')

            detailsBayBox.classList.remove('scale-0')
            boxBtnBayFooter.classList.remove('scale-0')
    


            fetch('http://'+window.MyIp+'/shooosiz/apis/getPro/getAllPro.php?id='+FgetPrduct().map(e=> e.id).toLocaleString())
            .then(response => response.json())
            .then(data => {
        cart_items.innerHTML=''

                sabadKharid.forEach(element => {
                    data.products.find(ee=>{
    
                        if(ee.productid==element.id){
                            cart_items.insertAdjacentHTML('beforeend',`
                                 <div class="cart_item flex-col ssm:flex-row text-center ssm:text-right text-xl sm:text-2xl leading-8 sm:leading-12" 
                                 data-productid="${ee.productid}">
    
                    <img src="${ee.images[0].frontimg}" alt="کفش نایک" class="product_image h-16 object-cover">
    
                    <div class="product_info justify-center ssm:justify-end  flex-auto leading-10">
    
                        <h3 class="font-['PeydaB'] font-bold sm:text-3xl"> ${ee.namepro} </h3>
    
                        <p class=" font-['PeydaL']"> تومان  <span class="pricePro"> ${((((+ee.pricepro)||2899000)*(100-ee.offerpro))/100).toLocaleString('ar-SA')} </span> </p>
    
                        <div class="quantity_control justify-center ssm:justify-start h-10" data-productid="${ee.productid}">
                            <button class="conteProMinez size-10 active:text-4xl transition-all  hover:bg-[var(--mainColorWW)]"> - </button>
                            <span class="contePro p-6 font-['PeydaB']" > ${element.conte} </span>
                            <button class=" conteProPlus size-10 active:text-4xl transition-all  hover:bg-[var(--mainColorWW)]" > + </button>
                        </div>
                        
                    </div>
    
                    <span class="discount font-['PeydaB']"> <span class="offerPersenPro"> ${ee.offerpro} </span> % </span>
    
                </div>
                                `)
                            // console.log(ee,element)
                            return true
                        }
    
                    })
                });
    
                cart_items.querySelectorAll('.conteProMinez').forEach(e=>{
                    e.addEventListener('click',FnewBTNElmfigureMQty)
                    // onclick="FnewBTNElmfigurePQty"
                })
                cart_items.querySelectorAll('.conteProPlus').forEach(e=>{
                    e.addEventListener('click',FnewBTNElmfigurePQty)
                    // onclick="FnewBTNElmfigurePQty"
                })
                FgetPrduct()
                FgetPriceAll()
            
            })
            .catch(error => console.error('Error:', error));

        }
    })

})()