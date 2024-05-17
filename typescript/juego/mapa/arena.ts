import type { Lienzo } from "../../motor/lienzo";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";
import { Terreno } from "./terreno";


export class Arena extends Terreno {
    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            mapa,
            lienzo,
            "images/terrain/ground/flat.png",
            {
                izquierdaSuperior: new Plano(5, 0),
                superior: new Plano(6, 0),
                derechaSuperior: new Plano(7, 0),
                izquierda: new Plano(5, 1),
                centro: new Plano(6, 1),
                derecha: new Plano(7, 1),
                izquierdaInferior: new Plano(5, 2),
                inferior: new Plano(6, 2),
                derechaInferior: new Plano(7, 2),
                horizontalIzquierda: new Plano(5, 3),
                horizontalCentro: new Plano(6, 3),
                horizontalDerecha: new Plano(7, 3),
                verticalSuperior: new Plano(8, 0),
                verticalCentro: new Plano(8, 1),
                verticalInferior: new Plano(8, 2),
                solo: new Plano(8, 3)
            }
        );
    }

    agregarArena(indicesCasilla: Plano) {
        return this.agregarTerreno(indicesCasilla);
    }

    dibujarArena() {
        this.dibujarTerreno();
    }
}  