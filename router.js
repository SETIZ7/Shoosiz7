module.exports = (myRout) => {
  console.log(myRout)
    switch (myRout) {
      case '/':
      case '/index':
    //   case '/index.html':
        return {
          title: 'Shoosiz',
          rout:'./index.html'
        };
      case '/#CallToMeFooter':
      case '/:CallToMeFooter':
      case '/index#CallToMeFooter':
      case '/index:CallToMeFooter':
        return {
          title: 'Shoosiz',
          rout: 'index.html',
          id:'#CallToMeFooter'
        };
      case '/login':
      case 'login':
      // case '/login.html':
        return {
          title: 'Login Page with Slider',
          rout:'./login.html'

        };
        case '/shoop':
        case 'shoop':
              return{
                  title:' shoop | فروشگاه ',
                  rout:'./shoop.html'
              }
      case '/choicePageG':
        return {
          title: 'Shoosiz / انتخاب کفش',
          rout: 'choicePageG.html',
        };
      default:
        return {
          title: '404 Page Not Found | Shoosiz',
          rout: 'notfind404.html',
        };
    }
  };
  