import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordenadas } from "./coordenadas.js";
import type { Lienzo } from "./lienzo.js";
import { Linea } from "./linea.js";
import type { Medidas } from "./medidas.js";
import { Objeto } from "./objeto.js";

export class Lineas extends Objeto {

  lineasAgregadas: Linea[] = [];
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
      medidas
    );
    this.lienzo = lienzo;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  agregarLineaConPorcentajes(
    izquierdaSuperior: Medidas,
    derechaInferior: Medidas,
  ) {
    this.lineasAgregadas.push(
      new Linea(
        this.izquierdaSuperiorMasPorcentajeMedidas(izquierdaSuperior),
        this.izquierdaSuperiorMasPorcentajeMedidas(derechaInferior),
        this.lienzo,
        this.fillStyle,
        this.strokeStyle,
        this.lineWidth,
      )
    );
  }

  dibujarLineas() {
    if (this.lineasAgregadas.length === 0)
      return;

    this.lineasAgregadas.forEach(
      line => line.dibujarLinea()
    );
  }
}