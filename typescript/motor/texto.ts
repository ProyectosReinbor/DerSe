import type { Lienzo } from "./lienzo";
import type { FillStyle, StrokeStyle } from "./contexto";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";
import type { Coordenadas3 } from "./coordenadas3";

export class Texto extends Objeto {

    lienzo: Lienzo;
    valor: string;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    dungeonFont: boolean;

    get font() {
        const font = `${this.medidas.alto}px`;
        if (this.dungeonFont === true)
            font.concat(" Dungeon,");

        return font.concat(" sans - serif, arial");
    }

    constructor(
        izquierdaSuperior: Coordenadas3,
        medidas: Medidas,
        lienzo: Lienzo,
        valor: string,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        dungeonFont: boolean,
    ) {
        super(
            izquierdaSuperior,
            medidas,
        );
        this.lienzo = lienzo;
        this.valor = valor;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.dungeonFont = dungeonFont;
    }

    dibujarTexto() {
        if (this.valor.length === 0)
            return;

        const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
        if (objetoEnLienzo === false)
            return;

        this.lienzo.contexto.font = this.font;
        this.lienzo.contexto.textAlign = "left";
        this.lienzo.contexto.textBaseline = "top";

        objetoEnLienzo.medidas.ancho = this.lienzo.contexto.measureText(this.valor).width;
        objetoEnLienzo.izquierdaSuperior.x += this.medidas.mitad.ancho;
        objetoEnLienzo.izquierdaSuperior.x -= objetoEnLienzo.medidas.mitad.ancho;

        if (this.fillStyle !== false) {
            this.lienzo.contexto.fillStyle = this.fillStyle;
            this.lienzo.contexto.fillText(
                this.valor,
                objetoEnLienzo.izquierdaSuperior.x,
                objetoEnLienzo.izquierdaSuperior.y,
            );
        }

        if (this.strokeStyle !== false) {
            this.lienzo.contexto.strokeStyle = this.strokeStyle;
            this.lienzo.contexto.strokeText(
                this.valor,
                objetoEnLienzo.izquierdaSuperior.x,
                objetoEnLienzo.izquierdaSuperior.y
            );
        }
    }
}