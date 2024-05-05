import type { Coordenadas } from "./coordenadas";
import type { Elemento } from "./elemento";
import { Imagen, type RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";

export class Elementos extends Imagen {

  elemento: Elemento;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    ruta: RutaImagen | false,
    elemento: Elemento
  ) {
    super(
      izquierdaSuperior,
      medidas,
      lienzo,
      ruta,
    );
    this.elemento = elemento;
  }

  dibujarElemento() {
    if (this.imagen === false)
      return;

    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;

    this.lienzo.contexto.imageSmoothingEnabled = false;
    this.lienzo.contexto.drawImage(
      this.imagen,
      this.elemento.izquierdaSuperior.x,
      this.elemento.izquierdaSuperior.y,
      this.elemento.medidas.ancho,
      this.elemento.medidas.alto,
      objetoEnLienzo.izquierdaSuperior.x,
      objetoEnLienzo.izquierdaSuperior.y,
      objetoEnLienzo.medidas.ancho,
      objetoEnLienzo.medidas.alto
    );
  }
}