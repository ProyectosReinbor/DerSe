import { CasillasElementos } from "../../motor/casillasElementos";
import { Elemento } from "../../motor/elemento";
import type { RutaImagen } from "../../motor/imagen";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export type EstadoTerreno = "izquierdaSuperior" | "superior" | "derechaSuperior" |
    "izquierda" | "centro" | "derecha" |
    "izquierdaInferior" | "inferior" | "derechaInferior" |
    "horizontalIzquierda" | "horizontalCentro" | "horizontalDerecha" |
    "verticalSuperior" | "verticalCentro" | "verticalInferior" |
    "solo";

export type EstadosElementoIndicesTerreno = {
    [key in EstadoTerreno]: Plano;
};

export class Terreno extends CasillasElementos {

    estadosElementoIndices: EstadosElementoIndicesTerreno;

    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
        estadosElementoIndices: EstadosElementoIndicesTerreno,
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
            ruta,
            new Elemento(
                new Medidas(64, 64),
                new Plano(0, 0)
            )
        );
        this.estadosElementoIndices = estadosElementoIndices;
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

    agregarTerreno(indicesCasilla: Plano) {
        const indiceElementos = this.agregarElementos(indicesCasilla);
        if (indiceElementos === "ya esta agregado")
            return "ya esta agregado";

        this.actualizarElementos();
        return indiceElementos;
    }

    estadoSegunPosicion(indicesCasilla: Plano): EstadoTerreno {
        const indicesCasillaIzquierda = new Plano(
            indicesCasilla.horizontal - 1,
            indicesCasilla.vertical
        );
        const indicesCasillaDerecha = new Plano(
            indicesCasilla.horizontal + 1,
            indicesCasilla.vertical
        );
        const indicesCasillaSuperior = new Plano(
            indicesCasilla.horizontal,
            indicesCasilla.vertical - 1
        );
        const indicesCasillaInferior = new Plano(
            indicesCasilla.horizontal,
            indicesCasilla.vertical + 1
        );
        const izquierda = this.obtenerCasilla(indicesCasillaIzquierda) !== undefined;
        const derecha = this.obtenerCasilla(indicesCasillaDerecha) !== undefined;
        const superior = this.obtenerCasilla(indicesCasillaSuperior) !== undefined;
        const inferior = this.obtenerCasilla(indicesCasillaInferior) !== undefined;

        const esIzquierdaSuperior = !superior && inferior && !izquierda && derecha;
        if (esIzquierdaSuperior)
            return "izquierdaSuperior";

        const esSuperior = !superior && inferior && izquierda && derecha;
        if (esSuperior)
            return "superior";

        const esDerechaSuperior = !superior && inferior && izquierda && !derecha;
        if (esDerechaSuperior)
            return "derechaSuperior";

        const esIzquierda = superior && inferior && !izquierda && derecha;
        if (esIzquierda)
            return "izquierda";

        const esCentro = superior && inferior && izquierda && derecha;
        if (esCentro)
            return "centro";

        const esDerecha = superior && inferior && izquierda && !derecha;
        if (esDerecha)
            return "derecha";

        const esIzquierdaInferior = superior && !inferior && !izquierda && derecha;
        if (esIzquierdaInferior)
            return "izquierdaInferior";

        const esInferior = superior && !inferior && izquierda && derecha;
        if (esInferior)
            return "inferior";

        const esDerechaInferior = superior && !inferior && izquierda && !derecha;
        if (esDerechaInferior)
            return "derechaInferior";

        const esHorizontalIzquierda = !superior && !inferior && !izquierda && derecha;
        if (esHorizontalIzquierda)
            return "horizontalIzquierda";

        const esHorizontalCentro = !superior && !inferior && izquierda && derecha;
        if (esHorizontalCentro)
            return "horizontalCentro";

        const esHorizontalDerecha = !superior && !inferior && izquierda && !derecha;
        if (esHorizontalDerecha)
            return "horizontalDerecha";

        const esVerticalSuperior = !superior && inferior && !izquierda && !derecha;
        if (esVerticalSuperior)
            return "verticalSuperior";

        const esVerticalCentro = superior && inferior && !izquierda && !derecha;
        if (esVerticalCentro)
            return "verticalCentro";

        const esVerticalInferior = superior && !inferior && !izquierda && !derecha;
        if (esVerticalInferior)
            return "verticalInferior";

        return "solo";
    }

    dibujarTerreno() {
        this.dibujarElementos();
    }
}  