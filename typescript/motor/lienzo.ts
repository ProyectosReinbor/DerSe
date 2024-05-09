import { Camara } from "./camara";
import { Coordenadas } from "./coordenadas";
import type { Escena } from "./escena";
import { EventosToques } from "./eventosToques";
import { Imagines } from "./imagines";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Lienzo extends Camara {

  unPorciento: Medidas = new Medidas(0, 0);
  cuadrosPorSegundo: number;
  intervaloEntreCuadros: number;
  tiempo: number = 0;
  margen: Medidas = new Medidas(0, 0);
  elemento: HTMLCanvasElement;
  imagines: Imagines = new Imagines;
  tiempoEntreCuadros: number = 0;
  contexto: CanvasRenderingContext2D;
  escena: Escena | false = false;
  eventosToques: EventosToques;

  siguienteCuadro(tiempo: number) {
    const diferncia = tiempo - this.tiempo;
    if (diferncia < this.intervaloEntreCuadros) {
      requestAnimationFrame(
        tiempo => this.siguienteCuadro(tiempo)
      );
      return;
    }
    this.tiempoEntreCuadros = diferncia;
    this.tiempo = tiempo;
    this.dibujarLienzo();
    requestAnimationFrame(
      tiempo => this.siguienteCuadro(tiempo)
    );
  }

  dibujarLienzo() {
    this.contexto.clearRect(
      0,
      0,
      this.elemento.width,
      this.elemento.height
    );
    if (this.escena === false)
      return;

    this.escena.draw();
  }

  relacionAspecto() {
    const medidasPantalla = new Medidas(1280, 720);
    this.elemento.width = medidasPantalla.ancho;
    this.elemento.height = medidasPantalla.alto;

    this.unPorciento.ancho = this.elemento.width / 100;
    this.unPorciento.alto = this.elemento.height / 100;
  }

  anchoEnPorcentaje = (pixeles: number) => pixeles / this.unPorciento.ancho;
  anchoEnPixeles = (porcentaje: number) => porcentaje * this.unPorciento.ancho;
  alturaEnPorcentaje = (pixeles: number) => pixeles / this.unPorciento.alto;
  alturaEnPixeles = (porcentaje: number) => porcentaje * this.unPorciento.alto;

  constructor(
    izquierdaSuperior: Coordenadas,
    cuadrosPorSegundo: number,
  ) {
    super(izquierdaSuperior);
    this.cuadrosPorSegundo = cuadrosPorSegundo;
    this.intervaloEntreCuadros = 1000 / this.cuadrosPorSegundo;
    this.elemento = window.document.getElementById("canvas") as HTMLCanvasElement;
    this.contexto = this.elemento.getContext("2d") as CanvasRenderingContext2D;
    this.relacionAspecto();
    window.addEventListener(
      "resize",
      () => this.relacionAspecto()
    );
    this.eventosToques = new EventosToques(this);
    this.siguienteCuadro(0);
  }

  empezar(escena: Escena): void {
    this.escena = escena;
  }

  objetoEnLienzo(objeto: Objeto): Objeto | false {
    const objetoEnCamara = this.objetoEnCamara(objeto);
    if (objetoEnCamara === false)
      return false;

    return new Objeto(
      new Coordenadas(
        this.anchoEnPixeles(objetoEnCamara.izquierdaSuperior.x),
        this.alturaEnPixeles(objetoEnCamara.izquierdaSuperior.y),
      ),
      new Medidas(
        this.anchoEnPorcentaje(objetoEnCamara.medidas.ancho),
        this.alturaEnPorcentaje(objetoEnCamara.medidas.alto)
      )
    );
  }

  anchoEnPorcentajeAltura(porcentajeAltura: number): number {
    const pixeles = this.alturaEnPixeles(porcentajeAltura);
    return this.anchoEnPorcentaje(pixeles);
  }

  alturaEnPorcentajeAncho(porcentajeAncho: number): number {
    const pixeles = this.anchoEnPixeles(porcentajeAncho);
    return this.alturaEnPorcentaje(pixeles);
  }
}