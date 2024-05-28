import type { Coordenadas2 } from "../coordenadas2";
import type { Lienzo } from "../lienzo";
import { Lineas } from "../lineas";
import { Medidas } from "../medidas";
import { Objeto } from "../objeto";
import type { Teclado } from "../teclado";
import { Texto } from "../texto";

export class Borrar extends Objeto {

  tiempoToqueEmpezo: number | false = false;
  lineas: Lineas;
  caracter: Texto;
  teclado: Teclado;

  constructor(
    lienzo: Lienzo,
    teclado: Teclado,
  ) {
    super(
      teclado.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(63, 0, 100)
      ),
      teclado.medidas.porcentaje(
        new Medidas(15, 20, 100)
      ),
    );
    this.lineas = new Lineas(
      this.izquierdaSuperior,
      this.medidas,
      lienzo,
      "#21618C",
      "#fff",
      0.5
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(10, 50, 100),
      new Medidas(30, 20, 100)
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(90, 20, 100),
      new Medidas(90, 80, 100)
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(30, 80, 100),
      new Medidas(10, 50, 100)
    );
    this.caracter = new Texto(
      this.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(50, 15, 100)
      ),
      this.medidas.porcentaje(
        new Medidas(15, 100, 100)
      ),
      lienzo,
      "X",
      "#fff",
      false,
      true
    );
    this.teclado = teclado;
  }

  toqueEmpezado(toque: Coordenadas2) {
    const adentro = this.coordenadasAdentro(toque);
    if (adentro === false)
      return;

    this.borrarUltimoCaracter();
  }

  borrarUltimoCaracter() {
    this.tiempoToqueEmpezo = new Date().getTime();
    if (this.teclado.entrada === false)
      return;

    this.teclado.entrada.borrarUltimoCaracter();
  }

  toqueMovido(toque: Coordenadas2) {
    if (this.coordenadasAdentro(toque) === true)
      return;

    this.tiempoToqueEmpezo = false;
  }

  toqueTerminado() {
    if (this.tiempoToqueEmpezo === false)
      return false;

    this.tiempoToqueEmpezo = false;
    return true;
  }

  mantenar() {
    if (this.tiempoToqueEmpezo === false)
      return;

    const tiempo = new Date().getTime();
    const diferencia = tiempo - this.tiempoToqueEmpezo;
    const frecuencia = 250;
    if (diferencia > frecuencia)
      this.borrarUltimoCaracter();
  }

  dibujarBorrar() {
    this.mantenar();
    this.lineas.dibujarLineas();
    this.caracter.dibujarTexto();
  }
}