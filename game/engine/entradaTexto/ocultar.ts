import { Circulo } from "../circulo";
import type { Coordenadas } from "../coordenadas";
import { Cuadrado } from "../cuadrado";
import { Curvas } from "../curvas";
import type { EntradaTexto } from "../entradaTexto";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";

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
        new Medidas(88, 20)
      ),
      entradaTexto.medidas.porcentaje(
        new Medidas(10, 60)
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
        new Medidas(89, 50)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(97, 50)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(93, 70)
      )
    );
    this.parpado.agregarCurva(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(89, 50)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(97, 50)
      ),
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(93, 20)
      )
    );
    this.pupila = new Circulo(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(87, 36)
      ),
      entradaTexto.medidas.porcentaje(
        new Medidas(12, 26)
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

  toqueTerminado(toque: Coordenadas) {
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