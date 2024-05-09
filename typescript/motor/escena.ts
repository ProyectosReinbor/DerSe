import type { Lienzo } from "./lienzo";
import type { Coordenadas } from "./coordenadas";

export class Escena {

    lienzo: Lienzo;
    draw: () => void = () => { }
    touchstart: (touch: Coordenadas) => void = () => { }
    touchmove: (touch: Coordenadas) => void = () => { }
    touchend: (touch: Coordenadas) => void = () => { }

    constructor(lienzo: Lienzo) {
        this.lienzo = lienzo;
    }

    start(): void {
        this.lienzo.empezar(this);
    }
}