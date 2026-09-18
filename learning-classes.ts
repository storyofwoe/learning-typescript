// class Point {} //Empty class

//Fields - creates a public writeable property on a class
// class Point {
//     x: number;
//     constructor(x: number, public y: number) {
//         this.x = x;
//     }
// }

class Point {
    x: number = 0;
    y: number = 0;
}

const pt = new Point();
//pt.x = "0"; //Type Error
console.log(`(${pt.x}, ${pt.y})`);

// Can also do:
class Point2 {
    x: number;
    y: number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }
}
const pt2 = new Point2();
console.log(`(${pt2.x}, ${pt2.y})`);

//read only fields
class Greeter {
    readonly name: string = "world"; //readonly prevents assignments outside of the constructor

    constructor(otherName?: string) {
        if (otherName !== undefined) {
            this.name = otherName;
        }
    }
}

const g = new Greeter();
//g.name = "Error";
console.log(g.name);
const g2 = new Greeter("Hello");
console.log(g2.name);

//super calls
class Base {
    k: number = 4;
}

class Derived extends Base {
    constructor() {
        super();
        console.log(this.k);
    }
}

const d = new Derived(); //output: 4

// methods
class Point3 {
    x = 10;
    y = 10;

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}

let pt3 = new Point3;
pt3.scale(2);
console.log(`(${pt3.x}, ${pt3.y})`);