import { CasillasElementos } from "../../motor/casillasElementos";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";


export type EstadoParedElevaciones = "izquierda" | "centro" | "derecha" | "solo";

export type EstadosElementoIndicesParedElevaciones = {
    [key in EstadoParedElevaciones]: Plano;
};

export class ParedElevaciones extends CasillasElementos {

    estadosElementoIndices: EstadosElementoIndicesParedElevaciones;

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
            "images/terrain/ground/elevation.png",
            new Elemento(
                new Medidas(64, 64),
                new Plano(0, 0)
            )
        );
        this.estadosElementoIndices = {
            izquierda: new Plano(0, 3),
            centro: new Plano(1, 3),
            derecha: new Plano(2, 3),
            solo: new Plano(3, 5)
        };
    }

    estadoConPosicion(indicesCasilla: Plano): EstadoParedElevaciones {
        const indicesCasillaIzquierda = new Plano(
            indicesCasilla.horizontal - 1,
            indicesCasilla.vertical,
        );
        const indicesCasillaDerecha = new Plano(
            indicesCasilla.horizontal + 1,
            indicesCasilla.vertical,
        );
        const izquierda = this.obtenerCasilla(indicesCasillaIzquierda) !== undefined;
        const derecha = this.obtenerCasilla(indicesCasillaDerecha) !== undefined;

        const esIzquierda = !izquierda && derecha;
        if (esIzquierda)
            return "izquierda";

        const esCentro = izquierda && derecha;
        if (esCentro)
            return "centro";

        const esDerecha = izquierda && !derecha;
        if (esDerecha)
            return "derecha";

        const esVertical = !izquierda && !derecha;
        if (esVertical)
            return "solo";

        throw new Error("invalid element");
    }

    actualizarElementos() {
        this.elementos.forEach(elementos => {
            const indicesCasilla = this.obtenerIndicesCasilla(elementos.izquierdaSuperior);
            const estado = this.estadoConPosicion(indicesCasilla);
            const indices = this.estadosElementoIndices[estado];
            elementos.elemento.indices = new Plano(
                indices.horizontal,
                indices.vertical
            );
        });
    }

    agregarParedElevaciones(indicesCasilla: Plano) {
        const indiceElementos = this.agregarElementos(indicesCasilla);
        if (indiceElementos === "ya esta agregado")
            return "ya esta agregado";

        const elementos = this.elementos[indiceElementos];
        if (elementos === undefined)
            return undefined;

        this.actualizarElementos();
        return indiceElementos;
    }

    dibujarParedElevaciones() {
        this.dibujarElementos();
    }
} 