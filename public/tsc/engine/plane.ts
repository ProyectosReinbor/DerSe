export class Plane_ENGINE {

    horizontal: number;
    vertical: number;

    constructor(parametros: {
        horizontal: number;
        vertical: number;
    }) {
        this.horizontal = parametros.horizontal;
        this.vertical = parametros.vertical;
    }
}