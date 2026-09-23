namespace Geometry {
    export class Point {
        x: number;

        constructor(x: number, public y: number = 0) {
            this.x = x;
        }

        dist(): number { return Math.sqrt(this.x ** 2 + this.y ** 2) }

        static origin = new Point(0, 0);
    }

    export class Point3D extends Point {
        constructor(x: number, y: number, public z: number = 0) {
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

        area() {
            return Math.pow(this.sideLength, 2);
        }
    }
}