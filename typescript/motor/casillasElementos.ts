import { Casillas, type CasillasOcupadas } from "./casillas";
import { Elemento } from "./elemento";
import { Elementos } from "./elementos";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Plano } from "./plano";

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
            new Medidas(
                this.elemento.medidas.ancho,
                this.elemento.medidas.alto
            ),
            new Plano(
                this.elemento.indices.horizontal,
                this.elemento.indices.vertical
            )
        )
        const elementos = new Elementos(
            objeto.izquierdaSuperior,
            objeto.medidas,
            this.lienzo,
            this.ruta,
            elemento
        );

        const indiceElementos = this.elementos.length;
        const agregado = this.agregarObjeto(
            indicesCasilla,
            indiceElementos
        );
        if (agregado === "ya esta agregado")
            return "ya esta agregado";

        this.elementos[indiceElementos] = elementos;
        return indiceElementos;
    }

    dibujarElementos() {
        this.elementos.forEach(
            elemento => elemento.dibujarElemento()
        );
    }
}