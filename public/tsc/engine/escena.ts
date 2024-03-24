import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";

export class Escena {

    lienzo: Lienzo;
    dibujar: () => void = () => { }
    empezarToque: (toque: Coordenada) => void = () => { }
    moverToque: (toque: Coordenada) => void = () => { }
    terminarToque: (toque: Coordenada) => void = () => { }

    constructor(parametros: {
        lienzo: Lienzo;
    }) {
        this.lienzo = parametros.lienzo;
    }

    async empezar() {
        await this.lienzo.empezar(
            () => this.dibujar(),
            (toque: Coordenada) => this.empezarToque(toque),
            (toque: Coordenada) => this.moverToque(toque),
            (toque: Coordenada) => this.terminarToque(toque),
        );
    }
}