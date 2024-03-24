import { Camara } from "./camera";
import { Coordenada } from "./coordenada";
import { Imagenes } from "./imagenes";
import { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Lienzo extends Camara {
  unPorciento: Medidas = new Medidas({ ancho: 0, alto: 0 });
  margen: Medidas = new Medidas({ ancho: 0, alto: 0 });
  imagenes: Imagenes = new Imagenes;
  intervaloEntreCuadros: number = 0;
  elemento: HTMLCanvasElement;
  contexto: CanvasRenderingContext2D;
  tiempo: number = 0;
  tiempoEntreCuadros: number = 0;
  dibujarEscena() { }
  empezarToqueEscena: (toque: Coordenada) => void = () => { }
  moverToqueEscena: (toque: Coordenada) => void = () => { };
  terminarToqueEscena: (toque: Coordenada) => void = () => { };
  constructor(parametros: {
    izquierdaSuperior: Coordenada,
    cuadrosPorSegundo: number,
  }) {
    super(parametros);
    this.cuadrosPorSegundo = parametros.cuadrosPorSegundo;
    this.elemento = window.document.getElementById("lienzo") as HTMLCanvasElement;
    this.contexto = this.elemento.getContext("2d") as CanvasRenderingContext2D;

    this.relacionAspecto();
    window.addEventListener(
      "resize",
      () => this.relacionAspecto()
    );

    this.elemento.addEventListener(
      "touchstart",
      (evento) => this.empezarToqueLienzo(evento),
    );
    this.elemento.addEventListener(
      "touchmove",
      (evento) => this.moverToqueLienzo(evento),
    );
    this.elemento.addEventListener(
      "touchend",
      (evento) => this.terminarToqueLienzo(evento)
    );

    this.siguienteCuadro();
  }

  get cuadrosPorSegundo(): number {
    return 1000 / this.intervaloEntreCuadros;
  }

  set cuadrosPorSegundo(valor: number) {
    this.intervaloEntreCuadros = 1000 / valor;
  }

  siguienteCuadro(tiempo: number = 0) {
    const diferencia = tiempo - this.tiempo;
    if (diferencia < this.intervaloEntreCuadros) {
      requestAnimationFrame((tiempo) => this.siguienteCuadro(tiempo));
      return;
    }
    this.tiempoEntreCuadros = diferencia;
    this.tiempo = tiempo;
    this.dibujarLienzo();
    requestAnimationFrame((tiempo) => this.siguienteCuadro(tiempo));
  }

  async empezar(
    dibujarEscena: () => void,
    empezarToqueEscena: (toque: Coordenada) => void,
    moverToqueEscena: (toque: Coordenada) => void,
    terminarToqueEscena: (toque: Coordenada) => void,
  ) {
    await this.imagenes.cargarTodas();
    this.dibujarEscena = dibujarEscena;
    this.empezarToqueEscena = empezarToqueEscena;
    this.moverToqueEscena = moverToqueEscena;
    this.terminarToqueEscena = terminarToqueEscena;
  }

  dibujarLienzo() {
    this.contexto.clearRect(
      0, 0,
      this.elemento.width,
      this.elemento.height
    );
    this.dibujarEscena();
  }

  relacionAspecto() {
    const pantalla = new Medidas({
      ancho: window.innerWidth,
      alto: window.innerHeight
    });

    const relacion = 720 / 1280;
    this.elemento.width = pantalla.ancho;
    this.elemento.height = pantalla.alto * relacion;

    if (this.elemento.height > pantalla.alto) {
      const relacion = 1280 / 720;
      this.elemento.height = pantalla.alto;
      this.elemento.width = pantalla.alto * relacion;
    }

    this.margen.ancho = pantalla.ancho - this.elemento.width;
    this.margen.alto = pantalla.alto - this.elemento.height;

    this.elemento.style.left = `${this.margen.ancho / 2}px`;
    this.elemento.style.top = `${this.margen.alto / 2}px`;

    this.unPorciento.ancho = this.elemento.width / 100;
    this.unPorciento.alto = this.elemento.height / 100;
  }

  obtenerCoordenadaToque(toque: Touch | null) {
    if (toque === null)
      return false;

    const izquierda = this.margen.ancho / 2;
    const superior = this.margen.alto / 2;
    return new Coordenada({
      x: toque.pageX - izquierda,
      y: toque.pageY - superior
    });
  }

  empezarToqueLienzo(evento: TouchEvent) {
    evento.preventDefault();

    for (let indice = 0; indice < evento.changedTouches.length; indice++) {
      const toque = evento.changedTouches.item(indice);
      const coordenada = this.obtenerCoordenadaToque(toque);
      if (coordenada === false)
        continue;

      this.empezarToqueEscena(coordenada);
    }
  }

  moverToqueLienzo(evento: TouchEvent) {
    evento.preventDefault();
    for (let indice = 0; indice < evento.changedTouches.length; indice++) {
      const toque = evento.changedTouches.item(indice);
      const coordenada = this.obtenerCoordenadaToque(toque);
      if (coordenada === false)
        continue;

      this.moverToqueEscena(coordenada);
    }
  }

  terminarToqueLienzo(evento: TouchEvent) {
    evento.preventDefault();
    for (let indice = 0; indice < evento.changedTouches.length; indice++) {
      const toque = evento.changedTouches.item(indice);
      const coordenada = this.obtenerCoordenadaToque(toque);
      if (coordenada === false)
        continue;

      this.terminarToqueEscena(coordenada);
    }
  }

  posicionEnLienzo(posicion: Posicion) {
    const posicionEnCamara = this.posicionEnCamara(posicion);
    if (posicionEnCamara === false)
      return false;

    return new Posicion({
      izquierdaSuperior: new Coordenada({
        x: this.obtenerPixelesAncho(posicionEnCamara.izquierdaSuperior.x),
        y: this.obtenerPixelesAltura(posicionEnCamara.izquierdaSuperior.y),
      }),
      medidas: new Medidas({
        ancho: this.obtenerPixelesAncho(posicionEnCamara.medidas.ancho),
        alto: this.obtenerPixelesAltura(posicionEnCamara.medidas.alto)
      })
    });
  }

  obtenerPorcentajeAncho(pixeles: number) {
    return pixeles / this.unPorciento.ancho;
  }

  obtenerPixelesAncho(percentage: number) {
    return percentage * this.unPorciento.ancho;
  }

  obtenerPorcentajeAltura(pixeles: number) {
    return pixeles / this.unPorciento.alto;
  }

  obtenerPixelesAltura(percentage: number) {
    return percentage * this.unPorciento.alto;
  }
}