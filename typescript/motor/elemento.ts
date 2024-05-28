import { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Elemento extends Objeto {
    constructor(
        medidas: Medidas,
        indices: Coordenadas,
    ) {
        super(
            new Coordenadas(0, 0, 0),
            medidas,
        );
        this.indices = indices;
    }

    set indices(indices: Coordenadas) {
        this.izquierdaSuperior.x = this.medidas.ancho * indices.x;
        this.izquierdaSuperior.y = this.medidas.alto * indices.y;
        this.izquierdaSuperior.z = this.medidas.profundidad * indices.z;
    }

    get indices() {
        return new Coordenadas(
            this.izquierdaSuperior.x / this.medidas.ancho,
            this.izquierdaSuperior.y / this.medidas.alto,
            this.izquierdaSuperior.z / this.medidas.profundidad,
        );
    }

    siguienteCuadro(cuadros: number) {
        this.indices = new Coordenadas(
            this.indices.x + 1,
            this.indices.y,
            this.indices.z
        )
        if (this.indices.x >= cuadros)
            this.indices = new Coordenadas(
                0,
                this.indices.y,
                this.indices.z
            );
    }
}