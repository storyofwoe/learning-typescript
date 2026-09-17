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
//pt.x = "0"; //Error
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

