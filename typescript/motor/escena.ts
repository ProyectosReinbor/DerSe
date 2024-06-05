import type { CoordenadaBidimensional } from "./coordenadaBidimensional";
import type { Lienzo } from "./lienzo";

export class Escena {

    lienzo: Lienzo;
    draw: () => void = () => { }
    touchstart: (touch: CoordenadaBidimensional) => void = () => { }
    touchmove: (touch: CoordenadaBidimensional) => void = () => { }
    touchend: (touch: CoordenadaBidimensional) => void = () => { }

    constructor(lienzo: Lienzo) {
        this.lienzo = lienzo;
    }

    start() {
        this.lienzo.empezar(this);
    }
}