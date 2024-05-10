import { CasillasElementos } from "../../motor/casillasElementos";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export type EstadoManchasElevaciones = "pasto" | "arena";
export type EstadosElementoIndicesManchasElevaciones = {
    [key in EstadoManchasElevaciones]: Plano;
}

export class ManchasElevaciones extends CasillasElementos {
    estadosElementoIndices: EstadosElementoIndicesManchasElevaciones;
    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            mapa.izquierdaSuperior.x,
            mapa.izquierdaSuperior.y,
            new Medidas(
                mapa.medidasCasillas.ancho,
                mapa.medidasCasillas.alto
            ),
            new Plano(1, 1),
            true,
            lienzo,
            "images/terrain/ground/flat.png",
            new Elemento(
                new Medidas(64, 64),
                new Plano(0, 0)
            )
        );
        this.estadosElementoIndices = {
            pasto: new Plano(4, 0),
            arena: new Plano(9, 0)
        };
    }

    agregarManchasElevaciones(
        indicesCasilla: Plano,
        estado: EstadoManchasElevaciones
    ) {
        const elementoIndices = this.estadosElementoIndices[estado];
        this.elemento.indices = new Plano(
            elementoIndices.horizontal,
            elementoIndices.vertical
        );
        const indiceElementos = this.agregarElementos(indicesCasilla);
        if (indiceElementos === "ya esta agregado")
            return "ya esta agregado";

        const elementos = this.elementos[indiceElementos];
        if (elementos === undefined)
            return undefined;

        elementos.elemento.indices = new Plano(
            elementoIndices.horizontal,
            elementoIndices.vertical
        );
        return indiceElementos;
    }

    dibujarManchasElevaciones() {
        this.dibujarElementos();
    }
}           