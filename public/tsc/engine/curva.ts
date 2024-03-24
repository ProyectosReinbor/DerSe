import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Curva extends Posicion {
  lienzo: Lienzo;
  puntoControl: Coordenada;
  constructor(parametros: {
    izquierdaSuperior: Coordenada,
    derechaInferior: Coordenada,
    lienzo: Lienzo,
    puntoControl: Coordenada,
  }) {
    const medidas = new Medidas({
      ancho: parametros.derechaInferior.x - parametros.izquierdaSuperior.x,
      alto: parametros.derechaInferior.y - parametros.izquierdaSuperior.y
    });
    super({
      izquierdaSuperior: parametros.izquierdaSuperior,
      medidas,
    });
    this.lienzo = parametros.lienzo;
    this.puntoControl = parametros.puntoControl;
  }

  dibujarCurva() {
    const posicionEnLienzo = this.lienzo.posicionEnLienzo(this);
    if (posicionEnLienzo === false)
      return;

    const controlPointOnCanvas = this.lienzo.posicionEnLienzo(new Posicion({
      izquierdaSuperior: this.puntoControl,
      medidas: new Medidas({ ancho: 0, alto: 0 })
    }));
    if (controlPointOnCanvas === false) return;

    this.lienzo.contexto.moveTo(
      posicionEnLienzo.izquierdaSuperior.x,
      posicionEnLienzo.izquierdaSuperior.y
    );

    this.lienzo.contexto.quadraticCurveTo(
      controlPointOnCanvas.izquierdaSuperior.x,
      controlPointOnCanvas.izquierdaSuperior.y,
      positionOnCanvas.end.x,
      positionOnCanvas.end.y
    );
  }
}