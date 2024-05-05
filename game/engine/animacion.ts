export class Animacion {

  cuadros: number;
  intervaloEntreCuadros: number = 0;

  constructor(
    cuadros: number,
    intervaloEntreCuadros: number,
  ) {
    this.cuadros = cuadros;
    this.intervaloEntreCuadros = intervaloEntreCuadros;
  }

  get framesPerSecond() {
    return 1000 / this.intervaloEntreCuadros;
  }

  set framesPerSecond(value: number) {
    this.intervaloEntreCuadros = 1000 / value;
  }
}