import type { Coordenadas } from "../coordenadas";
import { Cuadrado } from "../cuadrado";
import type { Lienzo } from "../lienzo";
import { Lineas } from "../lineas";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";

export class Terminar extends Cuadrado {

  visto: Lineas;
  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(88, 3, 100)
      ),
      teclado.medidas.porcentaje(
        new Medidas(1, 14, 100)
      ),
      lienzo,
      "#21618C",
      "#fff",
      0.5,
    );
    this.visto = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      false,
      "#fff",
      0.5,
    );
    this.visto.agregarLineaConPorcentajes(
      new Medidas(30, 50, 100),
      new Medidas(50, 80, 100)
    );
    this.visto.agregarLineaConPorcentajes(
      new Medidas(70, 20, 100),
      new Medidas(0, 0, 100)
    );
    this.teclado = teclado;
  }

  toqueTerminado(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    this.teclado.entrada = false;
    return true;
  }

  dibujarTerminar() {
    this.dibujarCuadrado();
    this.visto.dibujarLineas();
  }
}