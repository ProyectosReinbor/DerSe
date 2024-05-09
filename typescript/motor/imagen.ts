import type { Lienzo } from "./lienzo";
import type { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export type RutaImagen = `images/${string}.png`;

export class Imagen extends Objeto {

  lienzo: Lienzo;
  ruta: RutaImagen | false = false;

  constructor(
    superiorIzquierda: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    ruta: RutaImagen | false,
  ) {
    super(
      superiorIzquierda,
      medidas
    );
    this.lienzo = lienzo;
    this.ruta = ruta;
  }

  get imagen(): HTMLImageElement | false {
    if (this.ruta === false)
      return false;

    return this.lienzo.imagines.cargarImagen(this.ruta);
  }

  dibujarImagen() {
    if (this.imagen === false)
      return;

    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;

    this.lienzo.contexto.imageSmoothingEnabled = false;
    this.lienzo.contexto.drawImage(
      this.imagen,
      objetoEnLienzo.izquierdaSuperior.x,
      objetoEnLienzo.izquierdaSuperior.y,
      objetoEnLienzo.medidas.ancho,
      objetoEnLienzo.medidas.alto
    );
  }
}