import type { Coordenadas } from "../../motor/coordenadas";
import { Imagen } from "../../motor/imagen";
import type { Lienzo } from "../../motor/lienzo";
import type { Medidas } from "../../motor/medidas";

export type EstadoCastillo = "construccion" | "listo" | "destruccion";
export type ColorCastillo = "azul" | "morado" | "rojo" | "amarillo";

export class Castillo extends Imagen {

    estado: EstadoCastillo = "construccion";
    color: ColorCastillo = "azul";

    constructor(
        superiorIzquierda: Coordenadas,
        medidas: Medidas,
        lienzo: Lienzo,
        estado: EstadoCastillo,
        color: ColorCastillo,
    ) {
        super(
            superiorIzquierda,
            medidas,
            lienzo,
            false,
        );
        this.imagenCastillo(
            estado,
            color
        );
    }

    imagenCastillo(
        nuevoEstado: EstadoCastillo,
        nuevoColor: ColorCastillo
    ) {
        this.estado = nuevoEstado;
        this.color = nuevoColor;
        let file: EstadoCastillo | ColorCastillo = this.estado;
        if (this.estado === "listo")
            file = this.color;

        this.ruta = `images/factions/knights/buildings/castle/${file}.png`;
    }
}