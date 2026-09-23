class Point {
    x: number;

    constructor(x: number, public y: number = 0) {
        this.x = x;
    }

    //functions
    dist(): number { return Math.sqrt(this.x ** 2 + this.y ** 2) }

    //static members
    static origin = new Point(0, 0);
}
let p1 = new Point(10, 20);
let p2 = new Point(25) // y will be 0
console.log(p1.dist());
console.log(p2.dist());


//inheritance
class Point3D extends Point {
    constructor(x: number, y: number, public z: number = 0) {
        super(x, y);
    }

    //Overwriting
    dist(): number {
        let d = super.dist();
        return Math.sqrt(d ** 2 + this.z ** 2)
    }
}