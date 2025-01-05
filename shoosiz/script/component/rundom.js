export default function FrundomCreate(indexConter=6) {
    let myPoints=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
        'p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']
    ,myCode='';
    for (let index = 0; index < indexConter; index++) {
        myCode+=myPoints[Math.round(Math.random()*(myPoints.length-1))]
    }
    return myCode
}