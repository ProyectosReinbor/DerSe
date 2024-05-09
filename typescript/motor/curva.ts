import type { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Curva extends Objeto {

  lienzo: Lienzo;
  puntoControl: Coordenadas;

  constructor(
    izquierdaSuperior: Coordenadas,
    derechaInferior: Coordenadas,
    lienzo: Lienzo,
    puntoControl: Coordenadas,
  ) {
    const medidas = new Medidas(
      derechaInferior.x - izquierdaSuperior.x,
      derechaInferior.y - izquierdaSuperior.y
    );
    super(
      izquierdaSuperior,
      medidas,
    );
    this.lienzo = lienzo;
    this.puntoControl = puntoControl;
  }

  dibujarCurva() {
    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;

    const puntoControlEnLienzo = this.lienzo.objetoEnLienzo(
      new Objeto(
        this.puntoControl,
        new Medidas(0, 0),
      )
    );
    if (puntoControlEnLienzo === false)
      return;

    this.lienzo.contexto.moveTo(
      objetoEnLienzo.izquierdaSuperior.x,
      objetoEnLienzo.izquierdaSuperior.y
    );

    this.lienzo.contexto.quadraticCurveTo(
      puntoControlEnLienzo.izquierdaSuperior.x,
      puntoControlEnLienzo.izquierdaSuperior.y,
      objetoEnLienzo.derechaInferior.x,
      objetoEnLienzo.derechaInferior.y
    );
  }
}