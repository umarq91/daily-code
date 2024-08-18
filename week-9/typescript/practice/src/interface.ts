// simple interface 
interface Person {
    name: string;
    age: number;
}

type Person2 = {
    name: string;
    age: number;
}
// type lets you define Unioson  
type Person3  = {
    name : string;
    done :string | boolean;
}
interface Person4{
    name:string | boolean;
}
