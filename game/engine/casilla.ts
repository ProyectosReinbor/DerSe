import type { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Casilla extends Objeto {

    indiceObjeto: number;

    constructor(
        leftUp: Coordenadas,
        size: Medidas,
        indiceObjeto: number,
    ) {
        super(
            leftUp,
            size,
        );
        this.indiceObjeto = indiceObjeto;
    }
}