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

    igualACoordenadaBidimensional(objetivo: CoordenadaBidimensional) {
        return this.x === objetivo.x &&
            this.y === objetivo.y;
    }
}