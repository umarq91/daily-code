interface User {
  firstname: string,
  lastname: string,
  age: number,
  email?: string // optional
};

function isLegal(user: User) {
  if( user.age > 18){
    return true;
  }
  return false;
}
function greet1(user: User) {
  return `Hello ${user.firstname} ${user.lastname} ${user.age} ${user.email}`;
}

console.log(isLegal({
  firstname: 'Chandan',
  lastname: 'Kushwaha',
  age: 19
}));

console.log(greet1({
  firstname: 'Chandan',
  lastname: 'Kushwaha',
  age: 19,
  email: 'ch@gmail.com'
}));

// you can create a class which implements interface

interface Person{
  name:string,
  age:number,
  greet(phase:string):void
}

class Employe implements Person{
  name:string;
  age: number

constructor(a:number,n:string){
this.age=a;
this.name=n;
}

greet(phase: string): void {
  console.log(`${phase} by ${this.name} ` );
  
}
}