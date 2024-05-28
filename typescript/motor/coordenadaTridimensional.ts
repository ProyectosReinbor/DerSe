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

    igualACoordenadaTridimensional(objetivo: CoordenadaTridimensional) {
        return this.igualACoordenadaBidimensional(objetivo)
            && this.z === objetivo.z;
    }
}