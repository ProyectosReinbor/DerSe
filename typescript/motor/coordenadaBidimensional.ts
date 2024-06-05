export class CoordenadaBidimensional {

    x: number;
    y: number;

    constructor(
        x: number,
        y: number,
    ) {
        this.x = x;
        this.y = y;
    }

    igualA(
        objetivo?: CoordenadaBidimensional,
        x?: number,
        y?: number
    ) {
        if (objetivo === undefined) {
            if (x === undefined || y === undefined)
                throw new Error("x o y no definido");

            objetivo = new CoordenadaBidimensional(x, y);
        }
        return this.x === objetivo.x &&
            this.y === objetivo.y;
    }
}