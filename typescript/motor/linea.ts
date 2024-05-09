import type { FillStyle, StrokeStyle } from "./contexto";
import type { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Linea extends Objeto {

  lienzo: Lienzo;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(
    izquierdaSuperior: Coordenadas,
    derechaInferior: Coordenadas,
    lienzo: Lienzo,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number
  ) {
    const medidas = new Medidas(
      derechaInferior.x - izquierdaSuperior.x,
      derechaInferior.y - izquierdaSuperior.y
    );
    super(
      izquierdaSuperior,
      medidas
    );
    this.lienzo = lienzo;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  dibujarLinea() {
    const posicionEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (posicionEnLienzo === false)
      return;

    this.lienzo.contexto.beginPath();
    this.lienzo.contexto.lineTo(
      posicionEnLienzo.izquierdaSuperior.x,
      posicionEnLienzo.izquierdaSuperior.y
    );

    this.lienzo.contexto.lineTo(
      posicionEnLienzo.derechaInferior.x,
      posicionEnLienzo.derechaInferior.y
    );

    if (this.strokeStyle !== false) {
      this.lienzo.contexto.lineWidth = this.lineWidth;
      this.lienzo.contexto.strokeStyle = this.strokeStyle;
      this.lienzo.contexto.stroke();
    }

    if (this.fillStyle !== false) {
      this.lienzo.contexto.fillStyle = this.fillStyle;
      this.lienzo.contexto.fill();
    }

    this.lienzo.contexto.closePath();
  }
}