import type { CoordenadaBidimensional } from "./coordenadaBidimensional";
import type { Lienzo } from "./lienzo";

export class Escena {

    lienzo: Lienzo;
    dibujar?: () => void;
    touchstart?: (toque: CoordenadaBidimensional) => void;
    touchmove?: (toque: CoordenadaBidimensional) => void;
    touchend?: (toque: CoordenadaBidimensional) => void;

    constructor(lienzo: Lienzo) {
        this.lienzo = lienzo;
    }

    empezar() {
        this.lienzo.empezar(this);
    }
}