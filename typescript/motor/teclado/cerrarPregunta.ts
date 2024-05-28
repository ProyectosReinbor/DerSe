import { Boton, ParametrosTextoBoton } from "../boton";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";

export class CerrarPregunta extends Boton {

  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(78, 3, 1)
      ),
      teclado.medidas.porcentaje(
        new Medidas(7, 14, 1)
      ),
      lienzo,
      "#21618C",
      "#fff",
      0.5,
      ParametrosTextoBoton(
        new Medidas(0, 10, 1),
        "?",
        "#fff",
        false,
        false
      )
    );
    this.teclado = teclado;
  }

  toqueTerminado(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    if (this.teclado.entrada === false)
      return false;

    this.teclado.entrada.agregarCaracter("?");
    return true;
  }
}