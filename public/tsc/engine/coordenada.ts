export class Coordenada {
    x: number;
    y: number;
    constructor(parametros: {
        x: number;
        y: number;
    }) {
        this.x = parametros.x;
        this.y = parametros.y;
    }

    esIgual(coordenada: Coordenada) {
        return this.x === coordenada.x &&
            this.y === coordenada.y;
    }
}