
import type { FillStyle, StrokeStyle } from "./contexto.js";
import type { Coordenadas } from "./coordenadas.js";
import { Curva } from "./curva.js";
import type { Lienzo } from "./lienzo.js";

export class Curvas {

  curvas: Curva[] = [];
  lienzo: Lienzo;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(
    lienzo: Lienzo,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  ) {
    this.lienzo = lienzo;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  agregarCurva(
    izquierdaSuperior: Coordenadas,
    derechaInferior: Coordenadas,
    puntoControl: Coordenadas,
  ) {
    this.curvas.push(
      new Curva(
        izquierdaSuperior,
        derechaInferior,
        this.lienzo,
        puntoControl,
      )
    );
  }

  dibujarCurvas() {
    this.lienzo.contexto.beginPath();
    this.curvas.forEach(curva => curva.dibujarCurva());

    if (this.strokeStyle !== false) {
      this.lienzo.contexto.strokeStyle = this.strokeStyle;
      this.lienzo.contexto.lineWidth = this.lineWidth;
      this.lienzo.contexto.stroke();
    }

    if (this.fillStyle !== false) {
      this.lienzo.contexto.fillStyle = this.fillStyle;
      this.lienzo.contexto.fill();
    }

    this.lienzo.contexto.closePath();
  }
}