import { CasillasImagenes } from "../../motor/casillasImagenes";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";
import { Castillo, type ColorCastillo, type EstadoCastillo } from "./castillo";

export class Castillos extends CasillasImagenes {

    override imagines: Castillo[] = [];

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
            new Plano(4, 3),
            true,
            lienzo,
            false
        );
    }

    agregarCastillo(
        indicesCasilla: Plano,
        estado: EstadoCastillo,
        color: ColorCastillo,
    ) {
        const indiceImagen = this.agregarImagen(indicesCasilla);
        if (indiceImagen === "ya esta agregado")
            return "ya esta agregado";

        const imagen = this.imagines[indiceImagen];
        if (imagen === undefined)
            return undefined;

        this.imagines[indiceImagen] = new Castillo(
            imagen.izquierdaSuperior,
            imagen.medidas,
            this.lienzo,
            estado,
            color
        );
        return indiceImagen;
    }

    dibujarCastillos() {
        this.dibujarImagenes();
    }
}