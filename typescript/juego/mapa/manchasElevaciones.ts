import { CasillasElementos } from "../../motor/casillasElementos";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export type EstadoManchaElevacion = "pasto" | "arena";
export type EstadosElementoIndicesManchaElevacion = {
    [key in EstadoManchaElevacion]: Plano;
}

export class ManchasElevacion extends CasillasElementos {
    estadosElementoIndices: EstadosElementoIndicesManchaElevacion;
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

    agregarManchaElevacion(
        indicesCasilla: Plano,
        estado: EstadoManchaElevacion
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