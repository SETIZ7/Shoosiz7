export default function FrouterObject(myRout) {
    console.log(myRout)
    switch (myRout) {
        case './':
        case './index':
        case './index.html':
        return{
                title:' shoosiz ',
                rout:'./index.html'
            }
        case './#CallToMeFooter':
        case './:CallToMeFooter':
        case './index#CallToMeFooter':
        case './index:CallToMeFooter':
        return{
                title:' shoosiz ',
                rout:'./index.html#CallToMeFooter'
            }
            break;
        case './login':
        case './login.html':
            return{
                title:' Login Page with Slider ',
                rout:'./login.html'
            }
            break;
        case './choicePageG':
        case './choicePageG.html':
            return{
                title:' shoosiz / انتخواب کفش ',
                rout:'./choicePageG.html'
            }
            break;
    
        default:
            return{
                title:' 404 page not find | Shoosiz',
                rout:'./notfind404.html'
            }
            break;
    }
}