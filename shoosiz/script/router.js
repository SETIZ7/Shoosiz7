export default function FrouterObject(myRout) {
    switch (myRout) {
        case './':
        case './index':
        case './index.html':
        return{
                title:' shoosiz ',
                rout:'./index.html'
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