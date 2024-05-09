import type { Lienzo } from "../../motor/lienzo";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";
import { Terreno } from "./terreno";

export class Elevaciones extends Terreno {
    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            mapa,
            lienzo,
            "images/terrain/ground/elevation.png",
            {
                izquierdaSuperior: new Plano(0, 0),
                superior: new Plano(1, 0),
                derechaSuperior: new Plano(2, 0),
                izquierda: new Plano(0, 1),
                centro: new Plano(1, 1),
                derecha: new Plano(2, 1),
                izquierdaInferior: new Plano(0, 2),
                inferior: new Plano(1, 2),
                derechaInferior: new Plano(2, 2),
                horizontalIzquierda: new Plano(0, 4),
                horizontalCentro: new Plano(1, 4),
                horizontalDerecha: new Plano(2, 4),
                verticalSuperior: new Plano(3, 0),
                verticalCentro: new Plano(3, 1),
                verticalInferior: new Plano(3, 2),
                solo: new Plano(3, 4)
            }
        );
    }

    agregarElevacion(indicesCasilla: Plano) {
        this.agregarTerreno(indicesCasilla);
    }

    dibujarElevaciones() {
        this.dibujarTerreno();
    }
}
