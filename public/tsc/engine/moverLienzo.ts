import type { Coordenada } from "./coordenada";
import type { Lienzo } from "./lienzo";

export class MoverLienzo {

  toque: Coordenada | false = false;
  lienzoMovido: boolean = false;
  lienzo: Lienzo;
  moverHorizontal: boolean;
  moverVertical: boolean;

  constructor(parametros: {
    lienzo: Lienzo;
    moverHorizontal: boolean;
    moverVertical: boolean;
  }) {
    this.lienzo = parametros.lienzo;
    this.moverHorizontal = parametros.moverHorizontal;
    this.moverVertical = parametros.moverVertical;
  }

  touchstartTouchCamera(toque: Coordenada) {
    this.lienzoMovido = false;
    this.toque = toque;
  }

  touchmoveTouchCamera(toque: Coordenada): boolean {
    if (this.toque === false)
      return false;

    let lienzoMovido = false;

    if (this.moverHorizontal === true) {
      const distance = this.toque.x - toque.x;
      if (distance > 5 || distance < -5) {
        this.lienzo.izquierdaSuperior.x += distance;
        this.toque.x = toque.x;
        lienzoMovido = true;
      }
    }

    if (this.moverVertical === true) {
      const distance = this.toque.y - toque.y;
      if (distance > 5 || distance < -5) {
        this.lienzo.izquierdaSuperior.y += distance;
        this.toque.y = toque.y;
        lienzoMovido = true;
      }
    }

    if (lienzoMovido === true)
      this.lienzoMovido = true;

    return this.lienzoMovido;
  }

  touchendTouchCamera(): boolean {
    this.toque = false;
    return this.lienzoMovido;
  }
}