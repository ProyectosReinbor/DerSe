import { CasillasImagenes } from "../../motor/casillasImagenes";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export class Agua extends CasillasImagenes {
    constructor(
        mapa: Mapa,
        lienzo: Lienzo
    ) {
        super(
            mapa.izquierdaSuperior.x,
            mapa.izquierdaSuperior.y,
            new Medidas(
                mapa.medidasCasilla.ancho,
                mapa.medidasCasilla.alto
            ),
            new Plano(1, 1),
            true,
            lienzo,
            "images/terrain/water/water.png",
        );
    }

    agregarAgua(indicesCasilla: Plano) {
        return this.agregarImagen(indicesCasilla);
    }

    dibujarAgua() {
        this.dibujarImagenes();
    }
}  