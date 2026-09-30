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

//===================
//READ ONLY

interface Person2 {
    readonly name: string;
    readonly age: number;
}

let p1: Person2 = { name: "Penny", age: 18 };
p1.age = 23; //Error !

let pe2 = { name: "John", age: 60 };
let pe3: Person2 = pe2;

pe3.age = 35; // Error, read only
pe2.age = 25; // Okay, but updates pe3 because of aliasing
console.log(pe3.age);// Output: 25

// ======================
// Tagged Union Types
type State =
    | { type: "loading" } // Note: this is the same as doing something like number | string
    | { type: "success", value: number }
    | { type: "error", message: string }

declare const state: State; //use of declare here is to avoid errors because state has not been given any values
// if ( state.type === "success" ) {
//     console.log(state.value);
// } else if ( state.type === "error" ) {
//     console.error(state.message);
// }

// ========================
// Template Literal Types
type OrderSize = "regular" | "large";
type OrderItem = "espresso" | "hot chocolate"
type Order = `A ${OrderSize} ${OrderItem}`;

let order1: Order = "A regular espresso";
let order2: Order = "A large hot chocolate";
let order3: Order = "A small espresso"; // Error!

// Iterators
// for...of statement
const arrayOfAnyType: Array<any> = [1, "string", true];
for ( const val of arrayOfAnyType ) {
    console.log(val);
};

//for...in statement
for ( const i in arrayOfAnyType ) {
    console.log(i);
};

// Type assertion
const bar = {};
// bar.foo = 123; //Error ! property foo does not exist. can get around this with interfaces

interface Foo {
    bar: number;
    baz: string;
}

const foo = {} as Foo;
console.log(foo);

foo.bar = 123;
foo.baz = "Hello, world!";

console.log(foo);