import { Coordenadas } from "./coordenadas";
import type { Medidas } from "./medidas";

export class Objeto {

  izquierdaSuperior: Coordenadas;
  medidas: Medidas;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
  ) {
    this.izquierdaSuperior = izquierdaSuperior;
    this.medidas = medidas;
  }

  get izquierdaInferior(): Coordenadas {
    return new Coordenadas(
      this.izquierdaSuperior.x,
      this.izquierdaSuperior.y + this.medidas.alto
    );
  }

  get derechaInferior(): Coordenadas {
    return new Coordenadas(
      this.izquierdaSuperior.x + this.medidas.ancho,
      this.izquierdaSuperior.y + this.medidas.alto
    );
  }

  get derechaSuperior(): Coordenadas {
    return new Coordenadas(
      this.izquierdaSuperior.x + this.medidas.ancho,
      this.izquierdaSuperior.y
    );
  }

  izquierdaSuperiorMasPorcentajeMedidas(
    porcentajes: Medidas
  ): Coordenadas {
    const porcentaje = this.medidas.porcentaje(porcentajes);
    return new Coordenadas(
      this.izquierdaSuperior.x + porcentaje.ancho,
      this.izquierdaSuperior.y + porcentaje.alto
    );
  }

  coordenadasAdentro(
    coordenadas: Coordenadas
  ): boolean {
    return this.izquierdaSuperior.x <= coordenadas.x &&
      this.izquierdaSuperior.y <= coordenadas.y &&
      this.derechaInferior.x >= coordenadas.x &&
      this.derechaInferior.y >= coordenadas.y;
  }

  objetoAdentro(
    objeto: Objeto
  ): boolean {
    return this.izquierdaSuperior.x <= objeto.izquierdaSuperior.x &&
      this.izquierdaSuperior.y <= objeto.izquierdaSuperior.y &&
      this.derechaInferior.x >= objeto.derechaInferior.x &&
      this.derechaInferior.y >= objeto.derechaInferior.y;
  }

  algunVerticeAdentro(
    objeto: Objeto
  ): boolean {
    if (this.coordenadasAdentro(objeto.izquierdaSuperior))
      return true;

    if (this.coordenadasAdentro(objeto.izquierdaInferior))
      return true;

    if (this.coordenadasAdentro(objeto.derechaSuperior))
      return true;

    if (this.coordenadasAdentro(objeto.derechaInferior))
      return true;

    return false;
  }
}

