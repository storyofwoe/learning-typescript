namespace Geometry {
    export class Point {
        x: number = 0;

        constructor(x: number = 0, public y: number = 0) {
            this.x = x;
        }

        dist(): number { return Math.sqrt(this.x ** 2 + this.y ** 2) }

        static origin = new Point(0, 0);
    }

    export class Point3D extends Point {
        constructor(x: number = 0, y: number = 0, public z: number = 0) {
            super(x, y);
        }

        dist(): number {
            let d = super.dist();
            return Math.sqrt(d ** 2 + this.z ** 2);
        }
    }

    export class Square {
        constructor(public sideLength: number = 0) {
        }

        area(): number {
            return Math.pow(this.sideLength, 2);
        }
    }
}

let s1 = new Geometry.Square(5);
let p1 = new Geometry.Point() //defaults to 0, 0
import G = Geometry;
let s2 = new G.Square(10);
let p2 = new G.Point3D(5, 10, 15);

console.log(`A square with side length ${s2.sideLength} has area ${s2.area()}`);
console.log(`The Euclidean distance of the point (${p2.x}, ${p2.y}, ${p2.z}) is: ${p2.dist()}`);
