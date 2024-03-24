import { Coordenada } from "./coordenada";
import type { Medidas } from "./medidas";

export class Posicion {

  izquierdaSuperior: Coordenada;
  medidas: Medidas;

  constructor(parametros: {
    izquierdaSuperior: Coordenada;
    medidas: Medidas;
  }) {
    this.izquierdaSuperior = parametros.izquierdaSuperior;
    this.medidas = parametros.medidas;
  }

  get izquierdaInferior() {
    return new Coordenada({
      x: this.izquierdaSuperior.x,
      y: this.izquierdaSuperior.y + this.medidas.alto,
    });
  }

  get derechaInferior() {
    return new Coordenada({
      x: this.izquierdaSuperior.x + this.medidas.ancho,
      y: this.izquierdaSuperior.y + this.medidas.alto,
    });
  }

  get derechaSuperior() {
    return new Coordenada({
      x: this.izquierdaSuperior.x + this.medidas.ancho,
      y: this.izquierdaSuperior.y,
    });
  }

  izquierdaSuperiorMasMedidasPorcentaje(porcentajes: Medidas) {
    const medidas = this.medidas.porcentaje(porcentajes);
    return new Coordenada({
      x: this.izquierdaSuperior.x + medidas.ancho,
      y: this.izquierdaSuperior.y + medidas.alto,
    });
  }

  coordenadaDentroPosicion(coordenada: Coordenada) {
    return this.izquierdaSuperior.x <= coordenada.x &&
      this.izquierdaSuperior.y <= coordenada.y &&
      this.derechaInferior.x >= coordenada.x &&
      this.derechaInferior.y >= coordenada.y;
  }

  posicionDentroPosicion(posicion: Posicion) {
    return this.izquierdaSuperior.x <= posicion.izquierdaSuperior.x &&
      this.izquierdaSuperior.y <= posicion.izquierdaSuperior.y &&
      this.derechaInferior.x >= posicion.derechaInferior.x &&
      this.derechaInferior.y >= posicion.derechaInferior.y;
  }

  AlgunVerticePosicionDentroPosicion(posicion: Posicion): boolean {
    if (this.coordenadaDentroPosicion(posicion.izquierdaSuperior) === true)
      return true;

    if (this.coordenadaDentroPosicion(posicion.izquierdaInferior) === true)
      return true;

    if (this.coordenadaDentroPosicion(posicion.derechaSuperior) === true)
      return true;

    if (this.coordenadaDentroPosicion(posicion.derechaInferior) === true)
      return true;

    return false;
  }
}

