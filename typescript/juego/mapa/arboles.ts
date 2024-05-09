import { Animacion } from "../../motor/animacion";
import { CasillasAnimaciones } from "../../motor/casillasAnimaciones";
import { Elemento } from "../../motor/elemento";
import type { Lienzo } from "../../motor/lienzo";
import { Medidas } from "../../motor/medidas";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";

export type EstadoArbol = "motion" | "attacked" | "felled";
export type EstadosArbol = {
    [key in EstadoArbol]: {
        animacion: Animacion;
        elemento: {
            indices: Plano;
        }
    };
};

export class Arboles extends CasillasAnimaciones {

    estados: EstadosArbol;

    constructor(
        mapa: Mapa,
        lienzo: Lienzo
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
                [true, false, false],
                [false, false, false]
            ],
            lienzo,
            "images/resources/tree.png",
            new Elemento(
                new Medidas(192, 192),
                new Plano(0, 0)
            ),
            new Animacion(4, 4)
        );
        this.estados = {
            motion: {
                animacion: new Animacion(4, 4),
                elemento: {
                    indices: new Plano(0, 0)
                }
            },
            attacked: {
                animacion: new Animacion(2, 2),
                elemento: {
                    indices: new Plano(0, 1)
                }
            },
            felled: {
                animacion: new Animacion(1, 1),
                elemento: {
                    indices: new Plano(0, 2)
                }
            }
        }
    }

    agregarArbol(
        indicesCasilla: Plano,
        nombreEstado: EstadoArbol
    ) {
        const estado = this.estados[nombreEstado];
        const indiceAnimaciones = this.agregarAnimaciones(indicesCasilla);
        if (indiceAnimaciones === "ya esta agregado")
            return "ya esta agregado";

        const animaciones = this.animaciones[indiceAnimaciones];
        if (animaciones === undefined)
            return undefined;

        animaciones.elemento.indices = new Plano(
            estado.elemento.indices.horizontal,
            estado.elemento.indices.vertical
        );
        animaciones.animacion = new Animacion(
            estado.animacion.cuadros,
            estado.animacion.cuadrosPorSegundo
        );
        return indiceAnimaciones;
    }

    dibujarArboles() {
        this.dibujarAnimaciones();
    }
}