import { Casillas, type CasillasOcupadas } from "./casillas";
import { Imagen, type RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import type { Plano } from "./plano";

export class CasillasImagenes extends Casillas {
    imagines: Imagen[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;

    constructor(
        x: number,
        y: number,
        medidasCasillas: Medidas,
        longitudCasillasOcupadas: Plano,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
    ) {
        super(
            x,
            y,
            medidasCasillas,
            longitudCasillasOcupadas,
            casillasOcupadas,
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
    }

    agregarImagen(indicesCasilla: Plano) {
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
        return true;
    }

    dibujarImagenes() {
        this.imagines.forEach(
            imagen => imagen.dibujarImagen()
        );
    }
}