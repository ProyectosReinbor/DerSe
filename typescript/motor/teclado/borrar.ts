import type { Coordenadas } from "../coordenadas";
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
        new Medidas(63, 0)
      ),
      teclado.medidas.porcentaje(
        new Medidas(15, 20)
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
      new Medidas(10, 50),
      new Medidas(30, 20)
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(90, 20),
      new Medidas(90, 80)
    );
    this.lineas.agregarLineaConPorcentajes(
      new Medidas(30, 80),
      new Medidas(10, 50)
    );
    this.caracter = new Texto(
      this.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(50, 15)
      ),
      this.medidas.porcentaje(
        new Medidas(15, 100)
      ),
      lienzo,
      "X",
      "#fff",
      false,
      true
    );
    this.teclado = teclado;
  }

  toqueEmpezado(toque: Coordenadas) {
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

  toqueMovido(toque: Coordenadas) {
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