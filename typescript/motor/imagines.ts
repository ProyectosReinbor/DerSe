import type { RutaImagen } from "./imagen";

export class Imagines {

  rutasNoEncontradas: string[] = [];
  imagenesCargadas: {
    [key: string]: HTMLImageElement;
  } = {};
  cargandoImagenes: boolean = false;

  cargarImagen(ruta: RutaImagen): HTMLImageElement | false {
    if (this.cargandoImagenes === true)
      return false;

    if (this.rutasNoEncontradas.includes(ruta) === true)
      return false;

    const imagen = this.imagenesCargadas[ruta];
    if (imagen === undefined) {
      this.buscarImagen(ruta);
      return false;
    }

    return imagen;
  }

  buscarImagen(ruta: RutaImagen): void {
    if (this.rutasNoEncontradas.includes(ruta) === true)
      return;

    const imagen = this.imagenesCargadas[ruta];
    if (imagen !== undefined)
      return;

    this.cargandoImagenes = true;
    const imagenNueva = new Image();
    imagenNueva.addEventListener(
      "load",
      () => {
        this.cargandoImagenes = false;
        this.imagenesCargadas[ruta] = imagenNueva;
      }
    );
    imagenNueva.addEventListener(
      "error",
      () => {
        throw new Error(`image ${ruta} is not found`);
        this.rutasNoEncontradas.push(ruta)
      }
    );
    imagenNueva.src = ruta;
  }
}