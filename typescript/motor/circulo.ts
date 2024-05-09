import type { FillStyle, StrokeStyle } from "./contexto";
import type { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Circulo extends Objeto {

  lienzo: Lienzo;
  startingDegrees: number;
  finalDegrees: number;
  counterclockwise: boolean;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    startingDegrees: number,
    finalDegrees: number,
    counterclockwise: boolean,
    fillStyle: FillStyle,
    strokeStyle: StrokeStyle,
    lineWidth: number,
  ) {
    super(
      izquierdaSuperior,
      medidas,
    );
    this.lienzo = lienzo;
    this.startingDegrees = startingDegrees;
    this.finalDegrees = finalDegrees;
    this.counterclockwise = counterclockwise;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }

  get startingRadians() {
    return this.startingDegrees * (Math.PI / 180);
  }

  get finalRadians() {
    return this.finalDegrees * (Math.PI / 180);
  }

  dibujarCirculo() {
    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;

    this.lienzo.contexto.beginPath();

    const radiusWidth = objetoEnLienzo.medidas.mitad.ancho;
    const radiusHeight = objetoEnLienzo.medidas.mitad.alto;
    const radius = Math.min(
      radiusWidth,
      radiusHeight,
    );

    this.lienzo.contexto.arc(
      objetoEnLienzo.izquierdaSuperior.x + radiusWidth,
      objetoEnLienzo.izquierdaSuperior.y + radiusHeight,
      radius,
      this.startingRadians,
      this.finalRadians,
      this.counterclockwise,
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