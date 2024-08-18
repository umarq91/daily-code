function runAfter3Sec(fn: () => void) {

    setTimeout(fn, 3000);
}

runAfter3Sec(() => console.log('Hello'));

// function that takes user as Input 
interface User{
    name:string,
    age:number,
    email:string
}

function isLegal(user:User){
   if(user.age>18){
        console.log("Legal");
   }
}
const obj = {
    name:"Umer",
    age:40,
    email:"Umer@gmail.com"
}
isLegal(obj)

