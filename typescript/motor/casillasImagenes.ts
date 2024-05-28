import { Casillas, type CasillasOcupadas } from "./casillas";
import type { Coordenadas } from "./coordenadas";
import { Imagen, type RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";

export class CasillasImagenes extends Casillas {
    imagines: Imagen[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;

    constructor(
        x: number,
        y: number,
        z: number,
        medidasCasillas: Medidas,
        longitudCasillasOcupadas: Coordenadas,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
    ) {
        super(
            x,
            y,
            z,
            medidasCasillas,
            longitudCasillasOcupadas,
            casillasOcupadas,
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
    }

    agregarImagen(indicesCasilla: Coordenadas) {
        const objeto = this.nuevoObjeto(indicesCasilla);
        const imagen = new Imagen(
            objeto.izquierdaSuperior,
            objeto.medidas,
            this.lienzo,
            this.ruta,
        );
        const indiceImagen = this.imagines.length;
        const agregado = this.agregarObjeto(
            indicesCasilla,
            indiceImagen
        );
        if (agregado === "ya esta agregado")
            return "ya esta agregado";

        this.imagines[indiceImagen] = imagen;
        return indiceImagen;
    }

    dibujarImagenes() {
        this.imagines.forEach(
            imagen => imagen.dibujarImagen()
        );
    }
}