import { CoordenadaBidimensional } from "./coordenadaBidimensional";

export type CoordenadaTridimensionalArgumentos = [number, number, number];
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

    igualACoordenadaTridimensional(objetivoArgumentos: CoordenadaTridimensional | CoordenadaTridimensionalArgumentos) {
        const objetivo = (objetivoArgumentos instanceof CoordenadaTridimensional)
            ? objetivoArgumentos
            : new CoordenadaTridimensional(...objetivoArgumentos);

        return this.igualACoordenadaBidimensional(objetivo)
            && this.z === objetivo.z;
    }
}