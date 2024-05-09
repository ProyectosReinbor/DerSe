import { CasillasElementos } from "../../motor/casillasElementos";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export type EstadoEscaleras = "izquierda" | "centro" | "derecha" | "solo";
export type EstadoElementoIndicesEscaleras = {
    [key in EstadoEscaleras]: Plano;
};

export class Escaleras extends CasillasElementos {

    estadosElementoIndices: EstadoElementoIndicesEscaleras;

    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            mapa.izquierdaSuperior.x,
            mapa.izquierdaSuperior.y,
            new Medidas(
                mapa.mediasCasillas.ancho,
                mapa.mediasCasillas.alto
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
            izquierda: new Plano(0, 7),
            centro: new Plano(1, 7),
            derecha: new Plano(2, 7),
            solo: new Plano(3, 7)
        };
    }

    estadoSegunPosicion(indicesCasilla: Plano): EstadoEscaleras {
        const indicesCasillaIzquierda = new Plano(
            indicesCasilla.horizontal - 1,
            indicesCasilla.vertical
        );
        const indicesCasillaDerecha = new Plano(
            indicesCasilla.horizontal + 1,
            indicesCasilla.vertical
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

        const esSolo = !izquierda && !derecha;
        if (esSolo)
            return "solo";

        throw new Error("invalid element");
    }

    actualizarElementos() {
        this.elementos.forEach(elemento => {
            const indicesCasilla = this.obtenerIndicesCasilla(elemento.izquierdaSuperior);
            const nombreEstado = this.estadoSegunPosicion(indicesCasilla);
            const indices = this.estadosElementoIndices[nombreEstado];
            elemento.elemento.indices = new Plano(
                indices.horizontal,
                indices.vertical
            );
        });
    }

    agregarEscaleras(indicesCasilla: Plano) {
        const indiceElementos = this.agregarElementos(indicesCasilla);
        if (indiceElementos === "ya esta agregado")
            return "ya esta agregado";

        this.actualizarElementos();
        return indiceElementos;
    }

    dibujarEscaleras() {
        this.dibujarElementos();
    }
}