import type { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Box_ENGINE extends Objeto {

    indice: number;

    constructor(
        leftUp: Coordenadas,
        size: Medidas,
        indice: number,
    ) {
        super(
            leftUp,
            size,
        );
        this.indice = indice;
    }
}