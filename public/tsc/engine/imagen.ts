import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export type ImagenRuta = `images/${string}.png` | false;

export class Imagen extends Posicion {
  lienzo: Lienzo;
  ruta: ImagenRuta;
  constructor(parametros: {
    izquierdaSuperior: Coordenada,
    medidas: Medidas,
    lienzo: Lienzo,
    ruta: ImagenRuta,
  }) {
    super(parametros);
    this.lienzo = parametros.lienzo;
    this.ruta = parametros.ruta;
    this.lienzo.images.addRoute(this.ruta);
  }

  set image(route: ImageRoute) {
    this.route = route;
  }

  get image(): HTMLImageElement | false {
    return this.canvas.images.getImage(this.route);
  }

  drawImage() {
    const image = this.image;
    if (image === false) return;

    const positionOnCanvas = this.canvas.positionOnCanvas(this);
    if (positionOnCanvas === false) return;

    this.canvas.context.imageSmoothingEnabled = false;
    this.canvas.context.drawImage(
      image,
      positionOnCanvas.initial.x,
      positionOnCanvas.initial.y,
      positionOnCanvas.size.width,
      positionOnCanvas.size.height
    );
  }
}