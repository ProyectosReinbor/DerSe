import type { Animacion } from "./animacion.js";
import type { Coordenadas } from "./coordenadas.js";
import type { Elemento } from "./elemento.js";
import { Elementos } from "./elementos.js";
import type { RutaImagen } from "./imagen.js";
import type { Lienzo } from "./lienzo.js";
import type { Medidas } from "./medidas.js";

export class Animaciones extends Elementos {

  temporizadorSiguienteCuadro: number = 0;
  animacion: Animacion;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    ruta: RutaImagen | false,
    elemento: Elemento,
    animacion: Animacion
  ) {
    super(
      izquierdaSuperior,
      medidas,
      lienzo,
      ruta,
      elemento,
    );
    this.animacion = animacion;
  }

  siguienteCuadro() {
    this.temporizadorSiguienteCuadro += this.lienzo.tiempoEntreCuadros;
    if (this.temporizadorSiguienteCuadro < this.animacion.intervaloEntreCuadros)
      return;

    this.temporizadorSiguienteCuadro = 0;
    this.elemento.siguienteCuadro(this.animacion.cuadros);
  }

  dibujarAnimacion() {
    this.siguienteCuadro();
    this.dibujarElemento();
  }
}