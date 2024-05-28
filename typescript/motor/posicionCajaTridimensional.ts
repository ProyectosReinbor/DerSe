import { Coordenadas3D } from "./coordenadas3D";
import { Medidas3D } from "./medidas3D";
import { PosicionCaja2D } from "./posicionCaja2D";

export class PosicionCaja3D {

  posicionCaja2D: PosicionCaja2D;
  centro: Coordenadas3D;
  medidas: Medidas3D;

  constructor(
    x: number,
    y: number,
    z: number,
    ancho: number,
    alto: number,
    profundidad: number,
  ) {
    this.posicionCaja2D = new PosicionCaja2D(x, y, ancho, alto);
    this.centro = new Coordenadas3D(x, y, z);
    this.medidas = new Medidas3D(ancho, alto, profundidad);
  }

  obtenerVertice(
    nombreX: VerticeX,
    nombreY: VerticeY,

  ) {
    this.posicionCaja2D.obtenerVertice("izquierda", "superior");
    let x: number;
    if (horizontal === "izquierda") {
      x = this.izquierdaSuperior.x;
    }
    else if (horizontal === "derecha") {
      x = this.izquierdaSuperior.x + this.medidas.ancho;
    }
    else {
      throw new Error("parametro horizontal no válido");
    }

    let y: number;
    if (vertical === "superior") {
      y = this.izquierdaSuperior.y;
    }
    else if (vertical === "inferior") {
      y = this.izquierdaSuperior.y + this.medidas.alto;
    }
    else {
      throw new Error("parametro vertical no válido");
    }

    return new Coordenadas2D(x, y);
  }

  izquierdaSuperiorMasPorcentajeMedidas(porcentajes: Medidas2D) {
    const porcentaje = this.medidas.porcentaje(porcentajes);
    return new Coordenadas2D(
      this.izquierdaSuperior.x + porcentaje.ancho,
      this.izquierdaSuperior.y + porcentaje.alto,
    );
  }

  coordenadasAdentro(coordenadas: Coordenadas2D) {
    const thisDerechaInferior = this.obtenerVertice("derecha", "inferior");
    return this.izquierdaSuperior.x <= coordenadas.x &&
      this.izquierdaSuperior.y <= coordenadas.y &&
      coordenadas.x <= thisDerechaInferior.x &&
      coordenadas.y <= thisDerechaInferior.y;
  }

  posicionCajaAdentro(posicionCaja: PosicionCaja2D) {
    const thisDerechaInferior = this.obtenerVertice("derecha", "inferior");
    const posicionCajaDerechaInferior = posicionCaja.obtenerVertice("derecha", "inferior");
    return this.izquierdaSuperior.x <= posicionCaja.izquierdaSuperior.x &&
      this.izquierdaSuperior.y <= posicionCaja.izquierdaSuperior.y &&
      posicionCajaDerechaInferior.x <= thisDerechaInferior.x &&
      posicionCajaDerechaInferior.y <= thisDerechaInferior.y;
  }

  algunVerticeAdentro(posicionCaja: PosicionCaja2D): [
    VerticeHorizontalPosicionCaja2D,
    VerticeVerticalPosicionCaja2D
  ] | false {
    if (this.coordenadasAdentro(posicionCaja.izquierdaSuperior)) {
      return ["izquierda", "superior"];
    }

    if (this.coordenadasAdentro(
      posicionCaja.obtenerVertice("izquierda", "inferior")
    )) {
      return ["izquierda", "inferior"];
    }

    if (this.coordenadasAdentro(
      posicionCaja.obtenerVertice("derecha", "superior")
    )) {
      return ["derecha", "superior"];
    }

    if (this.coordenadasAdentro(
      posicionCaja.obtenerVertice("derecha", "inferior")
    )) {
      return ["derecha", "inferior"];
    }

    return false;
  }
}
