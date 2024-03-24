import type { FillStyle, StrokeStyle } from "./context";
import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Linea extends Posicion {
  lienzo: Lienzo;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(parametros: {
    lienzo: Lienzo;
    izquierdaSuperior: Coordenada;
    derechaInferior: Coordenada;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    const medidas = new Medidas({
      ancho: parametros.derechaInferior.x - parametros.izquierdaSuperior.x,
      alto: parametros.derechaInferior.y - parametros.izquierdaSuperior.y
    });
    super({
      izquierdaSuperior: parametros.izquierdaSuperior,
      medidas
    });
    this.lienzo = parametros.lienzo;
    this.fillStyle = parametros.fillStyle;
    this.strokeStyle = parametros.strokeStyle;
    this.lineWidth = parametros.lineWidth;
  }

  dibujarLinea() {
    const positionOnCanvas = this.lienzo.posicionEnLienzo(this);
    if (positionOnCanvas === false) return;

    this.lienzo.contexto.beginPath();

    this.lienzo.contexto.lineTo(
      positionOnCanvas.izquierdaSuperior.x,
      positionOnCanvas.izquierdaSuperior.y
    );

    this.lienzo.contexto.lineTo(
      positionOnCanvas.derechaInferior.x,
      positionOnCanvas.derechaInferior.y
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