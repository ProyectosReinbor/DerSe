import { CasillasImagenes } from "../../motor/casillasImagenes";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export class Sombras extends CasillasImagenes {
    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            mapa.izquierdaSuperior.x,
            mapa.izquierdaSuperior.y,
            new Medidas(
                mapa.medidasCasilla.ancho,
                mapa.medidasCasilla.alto
            ),
            new Plano(3, 3),
            [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            lienzo,
            "images/terrain/ground/shadows.png",
        );
    }

    agregarSombra(indicesCasilla: Plano) {
        const indiceImagen = this.agregarImagen(indicesCasilla);
        if (indiceImagen === "ya esta agregado")
            return "ya esta agregado";

        const sombra = this.imagines[indiceImagen];
        if (sombra === undefined)
            return undefined;

        sombra.izquierdaSuperior.x -= this.medidasCasilla.ancho;
        sombra.izquierdaSuperior.y -= this.medidasCasilla.ancho;
        return indiceImagen;
    }

    dibujarSombras() {
        this.dibujarImagenes();
    }
}           