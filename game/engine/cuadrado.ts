import type { Lienzo } from "./lienzo";
import type { FillStyle, StrokeStyle } from "./contexto";
import { Objeto } from "./objeto";
import type { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";

export class Cuadrado extends Objeto {

    lienzo: Lienzo;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;

    constructor(
        izquierdaSuperior: Coordenadas,
        medidas: Medidas,
        lienzo: Lienzo,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
    ) {
        super(
            izquierdaSuperior,
            medidas,
        );
        this.lienzo = lienzo;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    dibujarCuadrado() {
        const posicionEnLienzo = this.lienzo.objetoEnLienzo(this);
        if (posicionEnLienzo === false)
            return;

        this.lienzo.contexto.beginPath();
        this.lienzo.contexto.rect(
            posicionEnLienzo.izquierdaSuperior.x,
            posicionEnLienzo.izquierdaSuperior.y,
            posicionEnLienzo.medidas.ancho,
            posicionEnLienzo.medidas.alto
        );

        if (this.fillStyle !== false) {
            this.lienzo.contexto.fillStyle = this.fillStyle;
            this.lienzo.contexto.fill();
        }

        if (this.strokeStyle !== false) {
            this.lienzo.contexto.strokeStyle = this.strokeStyle;
            this.lienzo.contexto.lineWidth = this.lineWidth;
            this.lienzo.contexto.stroke();
        }

        this.lienzo.contexto.closePath();
    }
}   