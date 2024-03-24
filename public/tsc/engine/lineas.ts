import type { FillStyle, StrokeStyle } from "./context.js";
import type { Coordenada } from "./coordenada.js";
import type { Lienzo } from "./lienzo.js";
import { Linea } from "./linea.js";
import type { Medidas } from "./medidas.js";
import { Posicion } from "./posicion.js";

export class Lineas extends Posicion {

  lineas: Linea[] = [];
  lienzo: Lienzo;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  lineWidth: number;

  constructor(parametros: {
    izquierdaSuperior: Coordenada;
    medidas: Medidas;
    lienzo: Lienzo;
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    lineWidth: number;
  }) {
    super(parametros);
    this.lienzo = parametros.lienzo;
    this.fillStyle = parametros.fillStyle;
    this.strokeStyle = parametros.strokeStyle;
    this.lineWidth = parametros.lineWidth;
  }

  agregarLinea(
    porcentajes: Medidas,
    derechaInferiorPorcentajes: Medidas
  ) {
    this.lineas.push(
      new Linea({
        izquierdaSuperior: this.izquierdaSuperiorMasMedidasPorcentaje(porcentajes),
        derechaInferior: this.izquierdaSuperiorMasMedidasPorcentaje(derechaInferiorPorcentajes),
        lienzo: this.lienzo,
        fillStyle: this.fillStyle,
        strokeStyle: this.strokeStyle,
        lineWidth: this.lineWidth,
      })
    );
  }

  dibujarLineas() {
    if (this.lineas.length === 0) return;
    this.lineas.forEach(linea => linea.dibujarLinea());
  }
}