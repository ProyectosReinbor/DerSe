import type { FillStyle, StrokeStyle } from "./contexto";
import type { Coordenadas3 } from "./coordenadas3";
import { Cuadrado } from "./cuadrado";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import { Texto } from "./texto";

export const ParametrosTextoBoton = (
  medidas: Medidas,
  valor: string,
  fillStyle: FillStyle,
  strokeStyle: StrokeStyle,
  dungeonFont: boolean,
) => ({
  medidas,
  valor,
  fillStyle,
  strokeStyle,
  dungeonFont,
});

export class Boton extends Cuadrado {

  texto: Texto;

  constructor(
    izquierdaSuperior: Coordenadas3,
    medidas: Medidas,
    lienzo: Lienzo,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
    texto: ReturnType<typeof ParametrosTextoBoton>,
  ) {
    super(
      izquierdaSuperior,
      medidas,
      lienzo,
      fillStyle,
      strokeStyle,
      lineWidth,
    );
    this.texto = new Texto(
      izquierdaSuperior,
      texto.medidas,
      lienzo,
      texto.valor,
      texto.fillStyle,
      texto.strokeStyle,
      texto.dungeonFont,
    );
  }

  dibujarBoton() {
    this.dibujarCuadrado();
    this.texto.dibujarTexto();
  }
}