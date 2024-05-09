
import { Coordenadas } from "./coordenadas";
import { Cuadrado } from "./cuadrado";
import type { EntradaTexto } from "./entradaTexto";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Borrar } from "./teclado/borrar";
import { CerrarPregunta } from "./teclado/cerrarPregunta";
import { Enter } from "./teclado/enter";
import { Espacio } from "./teclado/espacio";
import { Shift } from "./teclado/shift";
import { Teclas } from "./teclado/teclas";
import { Terminar } from "./teclado/terminar";

export class Teclado extends Cuadrado {

  entrada: EntradaTexto | false = false;
  teclasMayusculas: Teclas[];
  teclasMinusculas: Teclas[];
  shift: Shift;
  enter: Enter;
  espacio: Espacio;
  borrar: Borrar;
  cerrarPregunta: CerrarPregunta;
  terminar: Terminar;

  constructor(lienzo: Lienzo) {
    super(
      new Coordenadas(5, 35),
      new Medidas(90, 60),
      lienzo,
      "#21618C",
      false,
      0,
    );
    this.teclasMayusculas = this.obtenerTeclas([
      "1234567890",
      "QWERTYUIOP",
      "ASDFGHJKL",
      "ZXCVBNM@.,"
    ]);
    this.teclasMinusculas = this.obtenerTeclas([
      "1234567890",
      "qwertyuiop",
      "asdfghjkl",
      "zxcvbnm@.,"
    ]);
    this.shift = new Shift(lienzo, this);
    this.enter = new Enter(lienzo, this);
    this.espacio = new Espacio(lienzo, this);
    this.borrar = new Borrar(lienzo, this);
    this.cerrarPregunta = new CerrarPregunta(lienzo, this);
    this.terminar = new Terminar(lienzo, this);
  }

  obtenerTeclas(teclas: string[]) {
    const medidas = this.medidas.porcentaje(
      new Medidas(97, 80)
    );
    medidas.alto /= teclas.length;
    return teclas.map((caracteres, indice) => {
      const izquierda = medidas.unPorciento.ancho * indice;
      const siguienteIndice = indice + 1;
      const superior = medidas.alto * siguienteIndice;
      return new Teclas(
        this.izquierdaSuperior.x + izquierda,
        this.izquierdaSuperior.y + superior,
        this.lienzo,
        caracteres,
        {
          medidas,
          texto: {
            medidas: new Medidas(0, 9),
          },
          presionarTecla: (caracter: string) => {
            if (this.entrada === false)
              return;

            this.entrada.agregarCaracter(caracter);
          }
        }
      )
    });
  }

  toqueEmpezado(toque: Coordenadas) {
    if (this.entrada === false)
      return;

    this.borrar.toqueEmpezado(toque);
  }

  toqueMovido(toque: Coordenadas) {
    if (this.entrada === false)
      return;

    this.borrar.toqueMovido(toque);
  }

  toqueTerminado(toque: Coordenadas) {
    if (this.entrada === false)
      return;

    if (this.borrar.toqueTerminado() === true)
      return;

    if (this.espacio.toqueTerminado(toque) === true)
      return;

    if (this.shift.toqueTerminado(toque) === true)
      return;

    if (this.cerrarPregunta.toqueTerminado(toque) === true)
      return;

    if (this.terminar.toqueTerminado(toque) === true)
      return;

    if (this.enter.toqueTerminado(toque) === true)
      return;

    if (this.shift.mayusculas === true) {
      const toqueTerminado = this.teclasMayusculas.some(
        teclaMayuscula => teclaMayuscula.toqueTerminado(toque)
      );
      if (toqueTerminado === true)
        return;
    }
    else {
      const toqueTerminado = this.teclasMinusculas.some(
        teclaMinuscula => teclaMinuscula.toqueTerminado(toque)
      );
      if (toqueTerminado === true)
        return;
    }
  }

  dibujarTeclado() {
    if (this.entrada === false)
      return;

    this.dibujarCuadrado();
    if (this.shift.mayusculas === true)
      this.teclasMayusculas.forEach(
        teclaMayuscula => teclaMayuscula.dibujarTeclas()
      );
    else
      this.teclasMinusculas.forEach(
        teclaMinuscula => teclaMinuscula.dibujarTeclas()
      );

    this.borrar.dibujarBorrar();
    this.shift.dibujarShift();
    this.enter.dibujarEnter();
    this.espacio.dibujarBoton();
    this.cerrarPregunta.dibujarBoton();
    this.terminar.dibujarTerminar();
  }
}