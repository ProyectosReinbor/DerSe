import { Casillas, type CasillasOcupadas } from "./casillas";
import { Elemento } from "./elemento";
import { Elementos } from "./elementos";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import type { Plano } from "./plano";

export class CasillasElementos extends Casillas {

    elementos: Elementos[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;
    elemento: Elemento;

    constructor(
        x: number,
        y: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Plano,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
        elemento: Elemento,
    ) {
        super(
            x,
            y,
            medidasCasilla,
            longitudCasillasOcupadas,
            casillasOcupadas
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
        this.elemento = elemento;
    }

    agregarElementos(indicesCasilla: Plano) {
        const objeto = this.nuevoObjeto(indicesCasilla);
        const elemento = new Elemento(
            new Meidas(
                this.element.size.width,
                this.element.size.height
            ),
            new Plane_ENGINE(
                this.element.getIndices().horizontal,
                this.element.getIndices().vertical
            )
        )
        const elementos = new Elementos(
            objeto.izquierdaSuperior,
            objeto.medidas,
            this.lienzo,
            this.ruta,

        );

        const indexReference = this.referencesPush(
            boxIndices,
            reference
        );
        if (indexReference === undefined)
            return undefined;

        return this.references[indexReference];
    }

    drawElements() {
        this.references.forEach(
            elements => elements.drawElement()
        );
    }
}