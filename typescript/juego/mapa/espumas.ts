import { Animacion } from "../../motor/animacion";
import { CasillasAnimaciones } from "../../motor/casillasAnimaciones";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export class Espumas extends CasillasAnimaciones {
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
            new Plano(3, 3),
            [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            lienzo,
            "images/terrain/water/foam.png",
            new Elemento(
                new Medidas(192, 192),
                new Plano(0, 0)
            ),
            new Animacion(8, 8)
        );
    }

    agregarEspuma(indicesCasilla: Plano) {
        const indiceAnimaciones = this.agregarAnimaciones(indicesCasilla);
        if (indiceAnimaciones === "ya esta agregado")
            return "ya esta agregado";

        const animaciones = this.animaciones[indiceAnimaciones];
        if (animaciones === undefined)
            return undefined;

        animaciones.izquierdaSuperior.x -= this.medidasCasilla.ancho;
        animaciones.izquierdaSuperior.y -= this.medidasCasilla.alto;
        return indiceAnimaciones;
    }

    dibujarEspumas() {
        this.dibujarAnimaciones();
    }
}