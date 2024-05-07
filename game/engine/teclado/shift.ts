import type { Coordenadas } from "../coordenadas";
import { Cuadrado } from "../cuadrado";
import type { Lienzo } from "../lienzo";
import { Lineas } from "../lineas";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";

export class Shift extends Cuadrado {

  mayusculas: boolean;
  triangulo: Lineas;
  lineas: Lineas;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(2, 3)
      ),
      teclado.medidas.porcentaje(
        new Medidas(9, 14)
      ),
      lienzo,
      "#21618C",
      "#AED6F1",
      0.5,
    );
    this.mayusculas = false;
    this.triangulo = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      "#fff",
      false,
      0
    );
    this.triangulo.agregarLineaConPorcentajes(
      new Medidas(50, 20),
      new Medidas(10, 50)
    );
    this.triangulo.agregarLineaConPorcentajes(
      new Medidas(90, 50),
      new Medidas(50, 20)
    );
    this.lineas = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      false,
      "#fff",
      2,
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(50, 50),
      new Medidas(50, 80)
    );
  }

  terminarToque(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    this.mayusculas = !this.mayusculas;
    return true;
  }

  dibujarShift() {
    this.dibujarCuadrado();
    this.triangulo.dibujarLineas();
    this.lineas.dibujarLineas();
  }
}