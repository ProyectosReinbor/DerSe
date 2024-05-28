import { Animacion } from "../motor/animacion";
import { Elemento } from "../motor/elemento";
import type { Lienzo } from "../motor/lienzo";
import { Personaje } from "../motor/personaje";
import { Direccion } from "../motor/personaje/direccion";
import { BarraUsuario } from "./barraUsuario";
import type { Mapa } from "./mapa";

export type ColorPeon = "blue" | "purple" | "red" | "yellow";

export class Peon extends Personaje {

    mapa: Mapa;
    apodo: string;
    barraUsuario: BarraUsuario;

    constructor(
        izquierdaSuperior: Coordenadas,
        mapa: Mapa,
        lienzo: Lienzo,
        color: ColorPeon,
        apodo: string,
    ) {
        super(
            izquierdaSuperior,
            new Medidas(
                mapa.medidasCasilla.ancho,
                mapa.medidasCasilla.alto
            ),
            lienzo,
            "#fff",
            false,
            0,
            new Medidas(3, 3),
            {
                ruta: `images/factions/knights/troops/pawn/${color}.png`,
                elemento: new Elemento(
                    new Medidas(192, 192),
                    new Plano(6, 6)
                ),
                animacion: new Animacion(6, 6),
            },
            new Coordenadas(2, 2),
            new Direccion("centro", "centro"),
        );
        this.mapa = mapa;
        this.apodo = apodo;
        this.barraUsuario = new BarraUsuario(this, new Medidas(0, 0), lienzo, false, apodo);
    }

    dibujarPeon() {
        this.dibujarPersonaje();
        this.barraUsuario.dibujarBarraUsuario();
    }
}