import { Boton } from "../boton";
import { Coordenadas } from "../coordenadas";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";

export class Espacio extends Boton {

  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(27, 3, 100)
      ),
      teclado.medidas.porcentaje(
        new Medidas(36, 14, 100)
      ),
      lienzo,
      "#21618C",
      "#fff",
      0.5,
      {
        medidas: new Medidas(0, 8, 1),
        valor: "Space",
        fillStyle: "#fff",
        strokeStyle: false,
        dungeonFont: false
      }
    );
    this.teclado = teclado;
  }

  toqueTerminado(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    if (this.teclado.entrada === false)
      return false;

    this.teclado.entrada.agregarCaracter(" ");
    return true;
  }
}