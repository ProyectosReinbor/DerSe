export type CoordenadaBidimensionalArgumentos = [number, number];

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

    igualACoordenadaBidimensional(objetivoArgumentos: CoordenadaBidimensional | CoordenadaBidimensionalArgumentos) {
        const objetivo: CoordenadaBidimensional = (objetivoArgumentos instanceof CoordenadaBidimensional)
            ? objetivoArgumentos
            : new CoordenadaBidimensional(...objetivoArgumentos);

        return this.x === objetivo.x &&
            this.y === objetivo.y;
    }
}