import type { FillStyle, StrokeStyle } from "./context";
import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Cuadrado extends Posicion {

    lienzo: Lienzo;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;

    constructor(parametros: {
        lienzo: Lienzo;
        izquierdaSuperior: Coordenada;
        medidas: Medidas;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
    }) {
        super(parametros);
        this.lienzo = parametros.lienzo;
        this.fillStyle = parametros.fillStyle;
        this.strokeStyle = parametros.strokeStyle;
    }

    dibujarCuadrado() {
        const posicionEnCanvas = this.lienzo.posicionEnLienzo(this);
        if (posicionEnCanvas === false)
            return;

        this.lienzo.contexto.beginPath();
        this.lienzo.contexto.rect(
            posicionEnCanvas.izquierdaSuperior.x,
            posicionEnCanvas.izquierdaSuperior.y,
            posicionEnCanvas.medidas.ancho,
            posicionEnCanvas.medidas.alto
        );

        if (this.fillStyle !== false) {
            this.lienzo.contexto.fillStyle = this.fillStyle;
            this.lienzo.contexto.fill();
        }

        if (this.strokeStyle !== false) {
            this.lienzo.contexto.strokeStyle = this.strokeStyle;
            this.lienzo.contexto.stroke();
        }

        this.lienzo.contexto.closePath();
    }
}  