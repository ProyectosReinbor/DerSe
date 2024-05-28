import { Casillas, type CasillasOcupadas } from "./casillas";
import { Coordenadas } from "./coordenadas";
import { Elemento } from "./elemento";
import { Elementos } from "./elementos";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";

export class CasillasElementos extends Casillas {

    elementos: Elementos[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;
    elemento: Elemento;

    constructor(
        x: number,
        y: number,
        z: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Coordenadas,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
        elemento: Elemento,
    ) {
        super(
            x,
            y,
            z,
            medidasCasilla,
            longitudCasillasOcupadas,
            casillasOcupadas
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
        this.elemento = elemento;
    }

    agregarElementos(indicesCasilla: Coordenadas) {
        const objeto = this.nuevoObjeto(indicesCasilla);
        const elemento = new Elemento(
            new Medidas(
                this.elemento.medidas.ancho,
                this.elemento.medidas.alto,
                this.elemento.medidas.profundidad
            ),
            new Coordenadas(
                this.elemento.indices.horizontal,
                this.elemento.indices.vertical,
                0
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