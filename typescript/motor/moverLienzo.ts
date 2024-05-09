import type { Lienzo } from "./lienzo";
import type { Coordenadas } from "./coordenadas";

export class MoverLienzo {

  toque: Coordenadas | false = false;
  movido: boolean = false;
  lienzo: Lienzo;
  moverHorizontal: boolean;
  moverVertical: boolean;

  constructor(
    lienzo: Lienzo,
    moverHorizontal: boolean,
    moverVertical: boolean,
  ) {
    this.lienzo = lienzo;
    this.moverHorizontal = moverHorizontal;
    this.moverVertical = moverVertical;
  }

  toqueEmpezado(toque: Coordenadas) {
    this.movido = false;
    this.toque = toque;
  }

  touqeMovido(toque: Coordenadas) {
    if (this.toque === false)
      return false;

    let movido = false;

    if (this.moverHorizontal === true) {
      const distancia = this.toque.x - toque.x;
      if (distancia > 5 || distancia < -5) {
        this.lienzo.izquierdaSuperior.x += distancia;
        this.toque.x = toque.x;
        movido = true;
      }
    }

    if (this.moverVertical === true) {
      const distancia = this.toque.y - toque.y;
      if (distancia > 5 || distancia < -5) {
        this.lienzo.izquierdaSuperior.y += distancia;
        this.toque.y = toque.y;
        movido = true;
      }
    }

    if (movido === true)
      this.movido = true;

    return this.movido;
  }

  toqueTerminado() {
    this.toque = false;
    return this.movido;
  }
}