import type { Coordenadas } from "../coordenadas";
import { Cuadrado } from "../cuadrado";
import type { Lienzo } from "../lienzo";
import { Lineas } from "../lineas";
import { Medidas } from "../medidas";
import type { Teclado } from "../teclado";

export class Enter extends Cuadrado {

  triangulo: Lineas;
  lineas: Lineas;
  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(13, 3)
      ),
      teclado.medidas.porcentaje(
        new Medidas(12, 14)
      ),
      lienzo,
      "#21618C",
      "#fff",
      0.5,
    );
    this.triangulo = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      "#fff",
      false,
      0
    );
    this.triangulo.agregarLineaConPorcentajes(
      new Medidas(10, 60),
      new Medidas(30, 40)
    );
    this.triangulo.agregarLineaConPorcentajes(
      new Medidas(30, 80),
      new Medidas(10, 60)
    );
    this.lineas = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      false,
      "#fff",
      0.5,
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(20, 60),
      new Medidas(80, 60)
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(80, 20),
      new Medidas(0, 0)
    );
    this.teclado = teclado;
  }

  terminarToque(toque: Coordenadas) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    if (this.teclado.entrada === false)
      return false;

    this.teclado.entrada.agregarSaltoLinea();
    return true;
  }

  dibujarEnter() {
    this.dibujarCuadrado();
    this.triangulo.dibujarLineas();
    this.lineas.dibujarLineas();
  }
}