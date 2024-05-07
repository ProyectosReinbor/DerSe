import { Boton } from "../boton";
import { Coordenadas } from "../coordenadas";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";
import { Texto } from "../texto";

export class CerrarPregunta extends Boton {

  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(78, 3)
      ),
      teclado.medidas.porcentaje(
        new Medidas(7, 14)
      ),
      lienzo,
      "#21618C",
      "#fff",
      0.5,
      new Texto(
        new Coordenadas(0, 0),
        new Medidas(0, 10),
        lienzo,
        "?",
        "#fff",
        false,
        false
      )
    );
    this.teclado = teclado;
  }

  terminoToque(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    if (this.teclado.entrada === false)
      return false;

    this.teclado.entrada.agregarCaracter("?");
    return true;
  }
}