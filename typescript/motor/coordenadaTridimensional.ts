import { CoordenadaBidimensional } from "./coordenadaBidimensional";

export class CoordenadaTridimensional extends CoordenadaBidimensional {
    z: number;

    constructor(
        x: number,
        y: number,
        z: number,
    ) {
        super(x, y);
        this.z = z;
    }

    override igualA(
        objetivo?: CoordenadaTridimensional,
        x?: number,
        y?: number,
        z?: number
    ) {
        if (objetivo === undefined) {
            if (x === undefined || y === undefined || z === undefined)
                throw new Error("x, y o z no estan definidas");

            objetivo = new CoordenadaTridimensional(x, y, z);
        }
        return super.igualA(objetivo)
            && this.z === objetivo.z;
    }
}