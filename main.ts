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