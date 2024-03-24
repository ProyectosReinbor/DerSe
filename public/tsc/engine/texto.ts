import type { FillStyle, StrokeStyle } from "./context";
import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Texto extends Posicion {

    lienzo: Lienzo;
    valor: string;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    dungeonFont: boolean;

    constructor(parametros: {
        lienzo: Lienzo;
        izquierdaSuperior: Coordenada;
        medidas: Medidas;
        valor: string;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        dungeonFont: boolean;
    }) {
        super(parametros);
        this.lienzo = parametros.lienzo;
        this.valor = parametros.valor;
        this.fillStyle = parametros.fillStyle;
        this.strokeStyle = parametros.strokeStyle;
        this.dungeonFont = parametros.dungeonFont;
    }

    get font() {
        let font = `${this.medidas.alto}px`;
        if (this.dungeonFont === true)
            font.concat(" Dungeon,");

        return font.concat("sans - serif, arial");
    }

    dibujarTexto() {
        if (this.valor.length === 0) return;

        const posicionEnCanvas = this.lienzo.posicionEnCanvas(this);
        if (posicionEnCanvas === false)
            return;

        this.lienzo.contexto.font = this.font;
        this.lienzo.contexto.textAlign = "left";
        this.lienzo.contexto.textBaseline = "top";

        posicionEnCanvas.medidas.ancho = this.lienzo.contexto.measureText(this.valor).width;
        posicionEnCanvas.izquierdaSuperior.x += this.medidas.ancho / 2;
        posicionEnCanvas.izquierdaSuperior.x -= posicionEnCanvas.medidas.ancho / 2;

        if (this.fillStyle !== false) {
            this.lienzo.contexto.fillStyle = this.fillStyle;
            this.lienzo.contexto.fillText(
                this.valor,
                posicionEnCanvas.izquierdaSuperior.x,
                posicionEnCanvas.izquierdaSuperior.y,
            );
        }

        if (this.strokeStyle !== false) {
            this.lienzo.contexto.strokeStyle = this.strokeStyle;
            this.lienzo.contexto.strokeText(
                this.valor,
                posicionEnCanvas.izquierdaSuperior.x,
                posicionEnCanvas.izquierdaSuperior.y
            );
        }
    }
}