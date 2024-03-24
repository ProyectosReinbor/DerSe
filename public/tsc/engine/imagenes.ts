import type { ImagenRuta } from "./imagen";

export class Imagenes {
  error: string[] = [];
  rutas: ImagenRuta[] = [];
  imagenes: {
    [key: string]: HTMLImageElement;
  } = {};

  imagenExiste(ruta: ImagenRuta): false | HTMLImageElement | undefined {
    if (ruta === false)
      return false;

    if (this.error.includes(ruta))
      throw new Error(`image ${ruta} is not found`);

    return this.imagenes[ruta];
  }

  obtenerImagen(ruta: ImagenRuta): HTMLImageElement | false {
    const imagen = this.imagenExiste(ruta);
    if (imagen === undefined)
      throw new Error(`image ${ruta} is not found`);

    return imagen;
  }

  agregarRuta(ruta: ImagenRuta) {
    if (ruta === false)
      return;

    if (this.rutas.includes(ruta) === true)
      return;

    this.rutas.push(ruta);
  }

  async cargarTodas() {
    for (const ruta of this.rutas) {
      await this.cargarImagen(ruta);
    }
  }

  cargarImagen(ruta: ImagenRuta): Promise<HTMLImageElement | false> {
    return new Promise((resolve) => {
      if (ruta === false)
        return resolve(false);

      const imageExists = this.imagenExiste(ruta);

      if (imageExists !== undefined)
        return resolve(imageExists);

      const image = new Image();
      image.addEventListener(
        "load",
        () => {
          this.imagenes[ruta] = image;
          resolve(image);
        }
      );
      image.addEventListener(
        "error",
        () => this.error.push(ruta)
      );
      image.src = ruta;
    });
  }
}