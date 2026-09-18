// 3 basic types in TypeScript
let isDone: boolean = false;
let lines: number = 42;
let myName: string = "Anders";

console.log(`${isDone}, ${lines}, ${myName}`)

// you can omit the types if it's clear from the definition
let isDone2 = false;
let lines2 = 42
let myName2 = "Anders";

//when it's impossible to know, there is the "any" type
let notSure: any = 4;
notSure = "maybe I'm a string"
notSure = false; //nevermind, I'm a boolean

//use const for constants
const numLivesForCat = 9;
//numLivesForCat = 1; //Error

//typed arrays
let list: number[] = [1, 2, 3];
//generic array
let list2: Array<number> = [1, 2, 3];

//enumerations
enum Colour { Red, Green, Blue };
let c: Colour = Colour.Green;
console.log(Colour[c]); // "Green"

//"void" is used when a function returns nothing
function bigHorribleAlert(): void {
    alert("I'm a little annoying box!");
}
//we can't run this function using node because it's not running in a browser

//the following functions are equivalent
let f1 = function (i: number): number { return i * i; }
let f2 = function (i: number) { return i *i; } //return type inferred
let f3 = (i: number): number => { return i*i; } //fat arrow syntax
let f4 = (i: number) => { return i*i; }//fat arrow syntax with return type inferred
let f5 = (i: number) => i * i; //fat arrow syntax, return type inferred, braceless means no return keyword needed

let a: number = 5;
console.log(`${f1(a)}, ${f2(a)}, ${f3(a)}, ${f4(a)}, ${f5(a)}`)

//functions can accept more than one type
function f6(i: string | number): void {
    console.log("The value was " + i)
};
f6(5);
f6("5");

//interfaces
interface Person {
    name: string;
    age?: number; //optional properties, if it does exist it better be this type!
    move(): void;
}

function greet(person: Person) {
    return `Hello ${person.name}`;
}

//this is identical to
function greet2(person: { name: string; move: () => {} }) {
    return `Hello ${person.name}`;
}

let p: Person = { name: "Bobby", move: () => {} };
console.log(greet(p));
let p2: Person = { name: "Ruby", age: 30, move: () => {} };
// let pInvalid: Person = { name: "Bobby", age: 42 }

let halfAge = (person: Person): number => { return person.age / 2; } //warning that it might be undefined!
console.log(halfAge(p));
console.log(halfAge(p2));

//interfaces can also describe a function type
interface searchFunc {
    (source: string, subString: string): boolean;
}
//only the parameters' types are important, names are not
let mySearch: searchFunc;
mySearch = function (src: string, sub: string) {
    return src.search(sub) != -1;
}
