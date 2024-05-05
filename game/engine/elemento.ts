import { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";
import { Plano } from "./plano";

export class Elemento extends Objeto {
    constructor(
        medidas: Medidas,
        indices: Plano,
    ) {
        super(
            new Coordenadas(0, 0),
            medidas,
        );
        this.indices = indices;
    }

    set indices(valor: Plano) {
        this.izquierdaSuperior.x = this.medidas.ancho * valor.horizontal;
        this.izquierdaSuperior.y = this.medidas.alto * valor.vertical;
    }

    get indices(): Plano {
        return new Plano(
            this.izquierdaSuperior.x / this.medidas.ancho,
            this.izquierdaSuperior.y / this.medidas.alto,
        );
    }

    siguienteCuadro(cuadros: number) {
        this.indices = new Plano(
            this.indices.horizontal + 1,
            this.indices.vertical
        )
        if (this.indices.horizontal >= cuadros)
            this.indices = new Plano(
                0,
                this.indices.vertical
            );
    }
}