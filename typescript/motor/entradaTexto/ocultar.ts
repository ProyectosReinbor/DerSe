import { Circulo } from "../circulo";
import { Cuadrado } from "../cuadrado";
import { Curvas } from "../curvas";
import type { EntradaTexto } from "../entradaTexto";
import type { Lienzo } from "../lienzo";

export class Ocultar extends Cuadrado {

  valor: string = "";
  entradaTexto: EntradaTexto;
  encendido: boolean;
  parpado: Curvas;
  pupila: Circulo;

  constructor(
    entradaTexto: EntradaTexto,
    lienzo: Lienzo,
    encendido: boolean,
  ) {
    super(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas3(88, 20, 100)
      ),
      entradaTexto.medidas.porcentaje(
        new Medidas3(10, 60, 100)
      ),
      lienzo,
      "#AED6F1",
      "#EAF2F8",
      0
    );
    this.entradaTexto = entradaTexto;
    this.encendido = encendido;
    this.parpado = new Curvas(
      lienzo,
      false,
      "#fff",
      0.5
    );
    this.parpado.agregarCurva(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(89, 50, 100)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(97, 50, 100)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(93, 70, 100)
      )
    );
    this.parpado.agregarCurva(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(89, 50, 100)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(97, 50, 100)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(93, 20, 100)
      )
    );
    this.pupila = new Circulo(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(87, 36, 100)
      ),
      entradaTexto.medidas.porcentaje(
        new Medidas(12, 26, 100)
      ),
      lienzo,
      0,
      360,
      false,
      "#fff",
      false,
      0,
    );
  }

  toqueTerminado(toque: Coordenadas2) {
    if (this.coordenadasAdentro(toque) === false)
      return false;

    this.encendido = !this.encendido;
    return true;
  }

  dibujarOcultar() {
    this.dibujarCuadrado();
    this.parpado.dibujarCurvas();
    this.pupila.dibujarCirculo();
  }

  get valorEncriptado() {
    if (this.valor.length === this.entradaTexto.valor.length)
      return this.valor;

    const palabras = this.entradaTexto.valor.split(" ");
    for (const indice in palabras) {
      const palabra = palabras[indice];
      if (palabra === undefined)
        continue;

      palabras[indice] = new Array(palabra.length).fill("*").join("");
    }
    this.valor = palabras.join(" ");
    return this.valor;
  }
}