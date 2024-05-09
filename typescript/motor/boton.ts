import type { FillStyle, StrokeStyle } from "./contexto";
import type { Coordenadas } from "./coordenadas";
import { Cuadrado } from "./cuadrado";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import type { Texto } from "./texto";

export class Boton extends Cuadrado {

  texto: Texto;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
    texto: Texto,
  ) {
    super(
      izquierdaSuperior,
      medidas,
      lienzo,
      fillStyle,
      strokeStyle,
      lineWidth,
    );
    this.texto = texto;
  }

  dibujarBoton() {
    this.dibujarCuadrado();
    this.texto.dibujarTexto();
  }
}