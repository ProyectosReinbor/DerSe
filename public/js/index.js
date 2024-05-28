// typescript/motor/coordenadas.ts
class Coordenadas {
  x;
  y;
  z;
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  igualA(coordenadas) {
    return this.x === coordenadas.x && this.y === coordenadas.y && this.z === coordenadas.z;
  }
}

// typescript/motor/escena.ts
class Escena {
  lienzo;
  draw = () => {
  };
  touchstart = () => {
  };
  touchmove = () => {
  };
  touchend = () => {
  };
  constructor(lienzo) {
    this.lienzo = lienzo;
  }
  start() {
    this.lienzo.empezar(this);
  }
}

// typescript/motor/medidas.ts
class Medidas {
  ancho;
  alto;
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
  }
  get unPorciento() {
    return new Medidas(this.ancho / 100, this.alto / 100);
  }
  porcentaje(porcentajes) {
    return new Medidas(this.unPorciento.ancho * porcentajes.ancho, this.unPorciento.alto * porcentajes.alto);
  }
  get mitad() {
    return new Medidas(this.ancho / 2, this.alto / 2);
  }
}

// typescript/motor/objeto.ts
class Objeto {
  izquierdaSuperior;
  medidas;
  constructor(izquierdaSuperior, medidas) {
    this.izquierdaSuperior = izquierdaSuperior;
    this.medidas = medidas;
  }
  get izquierdaInferior() {
    return new Coordenadas(this.izquierdaSuperior.x, this.izquierdaSuperior.y + this.medidas.alto);
  }
  get derechaInferior() {
    return new Coordenadas(this.izquierdaSuperior.x + this.medidas.ancho, this.izquierdaSuperior.y + this.medidas.alto);
  }
  get derechaSuperior() {
    return new Coordenadas(this.izquierdaSuperior.x + this.medidas.ancho, this.izquierdaSuperior.y);
  }
  izquierdaSuperiorMasPorcentajeMedidas(porcentajes) {
    const porcentaje = this.medidas.porcentaje(porcentajes);
    return new Coordenadas(this.izquierdaSuperior.x + porcentaje.ancho, this.izquierdaSuperior.y + porcentaje.alto);
  }
  coordenadasAdentro(coordenadas2) {
    return this.izquierdaSuperior.x <= coordenadas2.x && this.izquierdaSuperior.y <= coordenadas2.y && this.derechaInferior.x >= coordenadas2.x && this.derechaInferior.y >= coordenadas2.y;
  }
  objetoAdentro(objeto) {
    return this.izquierdaSuperior.x <= objeto.izquierdaSuperior.x && this.izquierdaSuperior.y <= objeto.izquierdaSuperior.y && this.derechaInferior.x >= objeto.derechaInferior.x && this.derechaInferior.y >= objeto.derechaInferior.y;
  }
  algunVerticeAdentro(objeto) {
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

// typescript/motor/personaje/direccion.ts
class Direccion {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get xNumero() {
    if (this.x === "izquierda")
      return -1;
    if (this.x === "derecha")
      return 1;
    if (this.x === "centro")
      return 0;
    throw new Error("invalid  direction x");
  }
  get yNumero() {
    if (this.y === "arriba")
      return -1;
    if (this.y === "abajo")
      return 1;
    if (this.y === "centro")
      return 0;
    throw new Error("invalid direction y");
  }
  igualA(direction) {
    return this.x === direction.x && this.y === direction.y;
  }
}

// typescript/motor/plano.ts
class Plano {
  horizontal;
  vertical;
  constructor(horizontal, vertical) {
    this.horizontal = horizontal;
    this.vertical = vertical;
  }
}

// typescript/motor/casilla.ts
class Casilla extends Objeto {
  indiceObjeto;
  constructor(leftUp, size, indiceObjeto) {
    super(leftUp, size);
    this.indiceObjeto = indiceObjeto;
  }
}

// typescript/motor/casillas.ts
class Casillas extends Coordenadas {
  casillas = [];
  medidasCasilla;
  longitudCasillasOcupadas;
  casillasOcupadas;
  constructor(x, y, medidasCasilla, longitudCasillasOcupadas, casillasOcupadas) {
    super(x, y);
    this.medidasCasilla = medidasCasilla;
    this.longitudCasillasOcupadas = longitudCasillasOcupadas;
    this.casillasOcupadas = casillasOcupadas;
  }
  colision(coordenada) {
    const objeto3 = new Objeto(coordenada, new Medidas(this.medidasCasilla.ancho, this.medidasCasilla.alto));
    const indicesCasillaIzquierdaSuperior = this.obtenerIndicesCasilla(new Coordenadas(objeto3.izquierdaSuperior.x, objeto3.izquierdaSuperior.y));
    const indicesCasillaDerechaInferior = this.obtenerIndicesCasilla(new Coordenadas(objeto3.derechaInferior.x, objeto3.derechaInferior.y));
    const indicesCasilla = new Plano(indicesCasillaIzquierdaSuperior.vertical, indicesCasillaIzquierdaSuperior.horizontal);
    for (;indicesCasilla.vertical <= indicesCasillaDerechaInferior.vertical; indicesCasilla.vertical++) {
      for (;indicesCasilla.horizontal <= indicesCasillaDerechaInferior.horizontal; indicesCasilla.horizontal++) {
        const casilla2 = this.obtenerCasilla(indicesCasilla);
        if (casilla2 === undefined)
          continue;
        if (casilla2.algunVerticeAdentro(objeto3) === false)
          continue;
        return casilla2;
      }
    }
    return false;
  }
  nuevoObjeto(indicesCasilla) {
    const x = indicesCasilla.horizontal * this.medidasCasilla.ancho;
    const y = indicesCasilla.vertical * this.medidasCasilla.alto;
    const ancho = this.medidasCasilla.ancho * this.longitudCasillasOcupadas.horizontal;
    const alto = this.medidasCasilla.alto * this.longitudCasillasOcupadas.vertical;
    return new Objeto(new Coordenadas(x, y), new Medidas(ancho, alto));
  }
  obtenerCasilla(indicesCasilla) {
    const columnaCasillas = this.casillas[indicesCasilla.vertical];
    if (columnaCasillas === undefined)
      return;
    return columnaCasillas[indicesCasilla.horizontal];
  }
  obtenerIndicesCasilla(coordenada) {
    const horizontal = Math.floor(coordenada.x / this.medidasCasilla.ancho);
    const vertical = Math.floor(coordenada.y / this.medidasCasilla.alto);
    return new Plano(horizontal, vertical);
  }
  asignarCasillaIndices(casillaIndices, casilla2) {
    let fila = this.casillas[casillaIndices.vertical];
    if (fila === undefined)
      fila = [];
    fila[casillaIndices.horizontal] = casilla2;
    this.casillas[casillaIndices.vertical] = fila;
  }
  asignarCasilla(indicesCasilla, indiceObjeto) {
    const medidas2 = new Medidas(this.medidasCasilla.ancho, this.medidasCasilla.alto);
    const distanceX = indicesCasilla.horizontal * medidas2.ancho;
    const distanceY = indicesCasilla.vertical * medidas2.alto;
    const superiorIzquierda = new Coordenadas(this.x + distanceX, this.y + distanceY);
    const casilla2 = new Casilla(superiorIzquierda, medidas2, indiceObjeto);
    this.asignarCasillaIndices(indicesCasilla, casilla2);
  }
  asignarCasillasOcupadas(indicesInicialesObjeto, indicesCasillasOcupadas, indiceObjeto) {
    const horizontal = indicesInicialesObjeto.horizontal + indicesCasillasOcupadas.vertical;
    const vertical = indicesInicialesObjeto.vertical + indicesCasillasOcupadas.horizontal;
    const indicesCasilla = new Plano(horizontal, vertical);
    let filaCasillas = this.casillas[indicesCasilla.vertical];
    if (filaCasillas === undefined)
      filaCasillas = [];
    const casilla2 = this.obtenerCasilla(indicesCasilla);
    if (casilla2 !== undefined)
      return;
    this.asignarCasilla(indicesCasilla, indiceObjeto);
  }
  agregarObjeto(indicesCasilla, indiceObjeto) {
    const casilla2 = this.obtenerCasilla(indicesCasilla);
    if (casilla2 !== undefined)
      return "ya esta agregado";
    if (this.casillasOcupadas === true) {
      for (let vertical = 0;vertical < this.longitudCasillasOcupadas.vertical; vertical++) {
        for (let horizontal = 0;horizontal < this.longitudCasillasOcupadas.horizontal; horizontal++) {
          const indicesCasillasOcupadas = new Plano(horizontal, vertical);
          this.asignarCasillasOcupadas(indicesCasilla, indicesCasillasOcupadas, indiceObjeto);
        }
      }
    } else {
      this.casillasOcupadas.forEach((fila, vertical) => {
        fila.forEach((ocupar, horizontal) => {
          if (ocupar === false)
            return;
          const indexesBoxOccupy = new Plano(horizontal, vertical);
          this.asignarCasillasOcupadas(indicesCasilla, indexesBoxOccupy, indiceObjeto);
        });
      });
    }
    return true;
  }
}

// typescript/motor/imagen.ts
class Imagen extends Objeto {
  lienzo;
  ruta = false;
  constructor(superiorIzquierda, medidas2, lienzo, ruta) {
    super(superiorIzquierda, medidas2);
    this.lienzo = lienzo;
    this.ruta = ruta;
  }
  get imagen() {
    if (this.ruta === false)
      return false;
    return this.lienzo.imagines.cargarImagen(this.ruta);
  }
  dibujarImagen() {
    if (this.imagen === false)
      return;
    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;
    this.lienzo.contexto.imageSmoothingEnabled = false;
    this.lienzo.contexto.drawImage(this.imagen, objetoEnLienzo.izquierdaSuperior.x, objetoEnLienzo.izquierdaSuperior.y, objetoEnLienzo.medidas.ancho, objetoEnLienzo.medidas.alto);
  }
}

// typescript/motor/casillasImagenes.ts
class CasillasImagenes extends Casillas {
  imagines = [];
  lienzo;
  ruta;
  constructor(x, y, medidasCasillas, longitudCasillasOcupadas, casillasOcupadas, lienzo, ruta) {
    super(x, y, medidasCasillas, longitudCasillasOcupadas, casillasOcupadas);
    this.lienzo = lienzo;
    this.ruta = ruta;
  }
  agregarImagen(indicesCasilla) {
    const objeto4 = this.nuevoObjeto(indicesCasilla);
    const imagen2 = new Imagen(objeto4.izquierdaSuperior, objeto4.medidas, this.lienzo, this.ruta);
    const indiceImagen = this.imagines.length;
    const agregado = this.agregarObjeto(indicesCasilla, indiceImagen);
    if (agregado === "ya esta agregado")
      return "ya esta agregado";
    this.imagines[indiceImagen] = imagen2;
    return indiceImagen;
  }
  dibujarImagenes() {
    this.imagines.forEach((imagen2) => imagen2.dibujarImagen());
  }
}

// typescript/juego/mapa/agua.ts
class Agua extends CasillasImagenes {
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(1, 1), true, lienzo, "images/terrain/water/water.png");
  }
  agregarAgua(indicesCasilla) {
    return this.agregarImagen(indicesCasilla);
  }
  dibujarAgua() {
    this.dibujarImagenes();
  }
}

// typescript/motor/animacion.ts
class Animacion {
  cuadros;
  intervaloEntreCuadros = 0;
  constructor(cuadros, intervaloEntreCuadros) {
    this.cuadros = cuadros;
    this.intervaloEntreCuadros = intervaloEntreCuadros;
  }
  get cuadrosPorSegundo() {
    return 1000 / this.intervaloEntreCuadros;
  }
  set cuadrosPorSegundo(value) {
    this.intervaloEntreCuadros = 1000 / value;
  }
}

// typescript/motor/elementos.ts
class Elementos extends Imagen {
  elemento;
  constructor(izquierdaSuperior, medidas3, lienzo, ruta, elemento) {
    super(izquierdaSuperior, medidas3, lienzo, ruta);
    this.elemento = elemento;
  }
  dibujarElemento() {
    if (this.imagen === false)
      return;
    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;
    this.lienzo.contexto.imageSmoothingEnabled = false;
    this.lienzo.contexto.drawImage(this.imagen, this.elemento.izquierdaSuperior.x, this.elemento.izquierdaSuperior.y, this.elemento.medidas.ancho, this.elemento.medidas.alto, objetoEnLienzo.izquierdaSuperior.x, objetoEnLienzo.izquierdaSuperior.y, objetoEnLienzo.medidas.ancho, objetoEnLienzo.medidas.alto);
  }
}

// typescript/motor/animaciones.ts
class Animaciones extends Elementos {
  temporizadorSiguienteCuadro = 0;
  animacion;
  constructor(izquierdaSuperior, medidas3, lienzo, ruta, elemento, animacion) {
    super(izquierdaSuperior, medidas3, lienzo, ruta, elemento);
    this.animacion = animacion;
  }
  siguienteCuadro() {
    this.temporizadorSiguienteCuadro += this.lienzo.tiempoEntreCuadros;
    if (this.temporizadorSiguienteCuadro < this.animacion.intervaloEntreCuadros)
      return;
    this.temporizadorSiguienteCuadro = 0;
    this.elemento.siguienteCuadro(this.animacion.cuadros);
  }
  dibujarAnimacion() {
    this.siguienteCuadro();
    this.dibujarElemento();
  }
}

// typescript/motor/elemento.ts
class Elemento extends Objeto {
  constructor(medidas3, indices) {
    super(new Coordenadas(0, 0), medidas3);
    this.indices = indices;
  }
  set indices(valor) {
    this.izquierdaSuperior.x = this.medidas.ancho * valor.horizontal;
    this.izquierdaSuperior.y = this.medidas.alto * valor.vertical;
  }
  get indices() {
    return new Plano(this.izquierdaSuperior.x / this.medidas.ancho, this.izquierdaSuperior.y / this.medidas.alto);
  }
  siguienteCuadro(cuadros) {
    this.indices = new Plano(this.indices.horizontal + 1, this.indices.vertical);
    if (this.indices.horizontal >= cuadros)
      this.indices = new Plano(0, this.indices.vertical);
  }
}

// typescript/motor/casillasAnimaciones.ts
class CasillasAnimaciones extends Casillas {
  animaciones = [];
  lienzo;
  ruta;
  elemento;
  animacion;
  constructor(x, y, medidasCasilla, longitudCasillasOcupadas, casillasOcupadas, lienzo, ruta, elemento2, animacion2) {
    super(x, y, medidasCasilla, longitudCasillasOcupadas, casillasOcupadas);
    this.lienzo = lienzo;
    this.ruta = ruta;
    this.elemento = elemento2;
    this.animacion = animacion2;
  }
  agregarAnimaciones(indicesCasilla) {
    const objeto5 = this.nuevoObjeto(indicesCasilla);
    const elemento2 = new Elemento(new Medidas(this.elemento.medidas.ancho, this.elemento.medidas.alto), new Plano(0, this.elemento.indices.vertical));
    const animacion2 = new Animacion(this.animacion.cuadros, this.animacion.cuadrosPorSegundo);
    const animaciones2 = new Animaciones(objeto5.izquierdaSuperior, objeto5.medidas, this.lienzo, this.ruta, elemento2, animacion2);
    const indiceAnimaciones = this.animaciones.length;
    const agregado = this.agregarObjeto(indicesCasilla, indiceAnimaciones);
    if (agregado === "ya esta agregado")
      return "ya esta agregado";
    this.animaciones[indiceAnimaciones] = animaciones2;
    return indiceAnimaciones;
  }
  dibujarAnimaciones() {
    this.animaciones.forEach((animaciones2) => animaciones2.dibujarAnimacion());
  }
}

// typescript/juego/mapa/arboles.ts
class Arboles extends CasillasAnimaciones {
  estados;
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(3, 3), [
      [true, false, false],
      [true, false, false],
      [false, false, false]
    ], lienzo, "images/resources/tree.png", new Elemento(new Medidas(192, 192), new Plano(0, 0)), new Animacion(4, 4));
    this.estados = {
      movimiento: {
        animacion: new Animacion(4, 4),
        elemento: {
          indices: new Plano(0, 0)
        }
      },
      talar: {
        animacion: new Animacion(2, 2),
        elemento: {
          indices: new Plano(0, 1)
        }
      },
      derribado: {
        animacion: new Animacion(1, 1),
        elemento: {
          indices: new Plano(0, 2)
        }
      }
    };
  }
  agregarArbol(indicesCasilla, nombreEstado) {
    const estado = this.estados[nombreEstado];
    const indiceAnimaciones = this.agregarAnimaciones(indicesCasilla);
    if (indiceAnimaciones === "ya esta agregado")
      return "ya esta agregado";
    const animaciones2 = this.animaciones[indiceAnimaciones];
    if (animaciones2 === undefined)
      return;
    animaciones2.elemento.indices = new Plano(estado.elemento.indices.horizontal, estado.elemento.indices.vertical);
    animaciones2.animacion = new Animacion(estado.animacion.cuadros, estado.animacion.cuadrosPorSegundo);
    return indiceAnimaciones;
  }
  dibujarArboles() {
    this.dibujarAnimaciones();
  }
}

// typescript/motor/casillasElementos.ts
class CasillasElementos extends Casillas {
  elementos = [];
  lienzo;
  ruta;
  elemento;
  constructor(x, y, medidasCasilla, longitudCasillasOcupadas, casillasOcupadas, lienzo, ruta, elemento4) {
    super(x, y, medidasCasilla, longitudCasillasOcupadas, casillasOcupadas);
    this.lienzo = lienzo;
    this.ruta = ruta;
    this.elemento = elemento4;
  }
  agregarElementos(indicesCasilla) {
    const objeto5 = this.nuevoObjeto(indicesCasilla);
    const elemento4 = new Elemento(new Medidas(this.elemento.medidas.ancho, this.elemento.medidas.alto), new Plano(this.elemento.indices.horizontal, this.elemento.indices.vertical));
    const elementos3 = new Elementos(objeto5.izquierdaSuperior, objeto5.medidas, this.lienzo, this.ruta, elemento4);
    const indiceElementos = this.elementos.length;
    const agregado = this.agregarObjeto(indicesCasilla, indiceElementos);
    if (agregado === "ya esta agregado")
      return "ya esta agregado";
    this.elementos[indiceElementos] = elementos3;
    return indiceElementos;
  }
  dibujarElementos() {
    this.elementos.forEach((elemento4) => elemento4.dibujarElemento());
  }
}

// typescript/juego/mapa/terreno.ts
class Terreno extends CasillasElementos {
  estadosElementoIndices;
  constructor(mapa, lienzo, ruta, estadosElementoIndices) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(1, 1), true, lienzo, ruta, new Elemento(new Medidas(64, 64), new Plano(0, 0)));
    this.estadosElementoIndices = estadosElementoIndices;
  }
  actualizarElementos() {
    this.elementos.forEach((elemento5) => {
      const indicesCasilla = this.obtenerIndicesCasilla(elemento5.izquierdaSuperior);
      const nombreEstado = this.estadoSegunPosicion(indicesCasilla);
      const indices = this.estadosElementoIndices[nombreEstado];
      elemento5.elemento.indices = new Plano(indices.horizontal, indices.vertical);
    });
  }
  agregarTerreno(indicesCasilla) {
    const indiceElementos = this.agregarElementos(indicesCasilla);
    if (indiceElementos === "ya esta agregado")
      return "ya esta agregado";
    this.actualizarElementos();
    return indiceElementos;
  }
  estadoSegunPosicion(indicesCasilla) {
    const indicesCasillaIzquierda = new Plano(indicesCasilla.horizontal - 1, indicesCasilla.vertical);
    const indicesCasillaDerecha = new Plano(indicesCasilla.horizontal + 1, indicesCasilla.vertical);
    const indicesCasillaSuperior = new Plano(indicesCasilla.horizontal, indicesCasilla.vertical - 1);
    const indicesCasillaInferior = new Plano(indicesCasilla.horizontal, indicesCasilla.vertical + 1);
    const izquierda = this.obtenerCasilla(indicesCasillaIzquierda) !== undefined;
    const derecha = this.obtenerCasilla(indicesCasillaDerecha) !== undefined;
    const superior = this.obtenerCasilla(indicesCasillaSuperior) !== undefined;
    const inferior = this.obtenerCasilla(indicesCasillaInferior) !== undefined;
    const esIzquierdaSuperior = !superior && inferior && !izquierda && derecha;
    if (esIzquierdaSuperior)
      return "izquierdaSuperior";
    const esSuperior = !superior && inferior && izquierda && derecha;
    if (esSuperior)
      return "superior";
    const esDerechaSuperior = !superior && inferior && izquierda && !derecha;
    if (esDerechaSuperior)
      return "derechaSuperior";
    const esIzquierda = superior && inferior && !izquierda && derecha;
    if (esIzquierda)
      return "izquierda";
    const esCentro = superior && inferior && izquierda && derecha;
    if (esCentro)
      return "centro";
    const esDerecha = superior && inferior && izquierda && !derecha;
    if (esDerecha)
      return "derecha";
    const esIzquierdaInferior = superior && !inferior && !izquierda && derecha;
    if (esIzquierdaInferior)
      return "izquierdaInferior";
    const esInferior = superior && !inferior && izquierda && derecha;
    if (esInferior)
      return "inferior";
    const esDerechaInferior = superior && !inferior && izquierda && !derecha;
    if (esDerechaInferior)
      return "derechaInferior";
    const esHorizontalIzquierda = !superior && !inferior && !izquierda && derecha;
    if (esHorizontalIzquierda)
      return "horizontalIzquierda";
    const esHorizontalCentro = !superior && !inferior && izquierda && derecha;
    if (esHorizontalCentro)
      return "horizontalCentro";
    const esHorizontalDerecha = !superior && !inferior && izquierda && !derecha;
    if (esHorizontalDerecha)
      return "horizontalDerecha";
    const esVerticalSuperior = !superior && inferior && !izquierda && !derecha;
    if (esVerticalSuperior)
      return "verticalSuperior";
    const esVerticalCentro = superior && inferior && !izquierda && !derecha;
    if (esVerticalCentro)
      return "verticalCentro";
    const esVerticalInferior = superior && !inferior && !izquierda && !derecha;
    if (esVerticalInferior)
      return "verticalInferior";
    return "solo";
  }
  dibujarTerreno() {
    this.dibujarElementos();
  }
}

// typescript/juego/mapa/arena.ts
class Arena extends Terreno {
  constructor(mapa, lienzo) {
    super(mapa, lienzo, "images/terrain/ground/flat.png", {
      izquierdaSuperior: new Plano(5, 0),
      superior: new Plano(6, 0),
      derechaSuperior: new Plano(7, 0),
      izquierda: new Plano(5, 1),
      centro: new Plano(6, 1),
      derecha: new Plano(7, 1),
      izquierdaInferior: new Plano(5, 2),
      inferior: new Plano(6, 2),
      derechaInferior: new Plano(7, 2),
      horizontalIzquierda: new Plano(5, 3),
      horizontalCentro: new Plano(6, 3),
      horizontalDerecha: new Plano(7, 3),
      verticalSuperior: new Plano(8, 0),
      verticalCentro: new Plano(8, 1),
      verticalInferior: new Plano(8, 2),
      solo: new Plano(8, 3)
    });
  }
  agregarArena(indicesCasilla) {
    return this.agregarTerreno(indicesCasilla);
  }
  dibujarArena() {
    this.dibujarTerreno();
  }
}

// typescript/juego/mapa/castillo.ts
class Castillo extends Imagen {
  estado = "construccion";
  color = "azul";
  constructor(superiorIzquierda, medidas7, lienzo, estado, color) {
    super(superiorIzquierda, medidas7, lienzo, false);
    this.imagenCastillo(estado, color);
  }
  imagenCastillo(nuevoEstado, nuevoColor) {
    this.estado = nuevoEstado;
    this.color = nuevoColor;
    let file = this.estado;
    if (this.estado === "listo")
      file = this.color;
    this.ruta = `images/factions/knights/buildings/castle/${file}.png`;
  }
}

// typescript/juego/mapa/castillos.ts
class Castillos extends CasillasImagenes {
  imagines = [];
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(4, 3), true, lienzo, false);
  }
  agregarCastillo(indicesCasilla, estado, color) {
    const indiceImagen = this.agregarImagen(indicesCasilla);
    if (indiceImagen === "ya esta agregado")
      return "ya esta agregado";
    const imagen4 = this.imagines[indiceImagen];
    if (imagen4 === undefined)
      return;
    this.imagines[indiceImagen] = new Castillo(imagen4.izquierdaSuperior, imagen4.medidas, this.lienzo, estado, color);
    return indiceImagen;
  }
  dibujarCastillos() {
    this.dibujarImagenes();
  }
}

// typescript/juego/mapa/elevaciones.ts
class Elevaciones extends Terreno {
  constructor(mapa, lienzo) {
    super(mapa, lienzo, "images/terrain/ground/elevation.png", {
      izquierdaSuperior: new Plano(0, 0),
      superior: new Plano(1, 0),
      derechaSuperior: new Plano(2, 0),
      izquierda: new Plano(0, 1),
      centro: new Plano(1, 1),
      derecha: new Plano(2, 1),
      izquierdaInferior: new Plano(0, 2),
      inferior: new Plano(1, 2),
      derechaInferior: new Plano(2, 2),
      horizontalIzquierda: new Plano(0, 4),
      horizontalCentro: new Plano(1, 4),
      horizontalDerecha: new Plano(2, 4),
      verticalSuperior: new Plano(3, 0),
      verticalCentro: new Plano(3, 1),
      verticalInferior: new Plano(3, 2),
      solo: new Plano(3, 4)
    });
  }
  agregarElevacion(indicesCasilla) {
    this.agregarTerreno(indicesCasilla);
  }
  dibujarElevaciones() {
    this.dibujarTerreno();
  }
}

// typescript/juego/mapa/escaleras.ts
class Escaleras extends CasillasElementos {
  estadosElementoIndices;
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(1, 1), true, lienzo, "images/terrain/ground/elevation.png", new Elemento(new Medidas(64, 64), new Plano(0, 0)));
    this.estadosElementoIndices = {
      izquierda: new Plano(0, 7),
      centro: new Plano(1, 7),
      derecha: new Plano(2, 7),
      solo: new Plano(3, 7)
    };
  }
  estadoSegunPosicion(indicesCasilla) {
    const indicesCasillaIzquierda = new Plano(indicesCasilla.horizontal - 1, indicesCasilla.vertical);
    const indicesCasillaDerecha = new Plano(indicesCasilla.horizontal + 1, indicesCasilla.vertical);
    const izquierda = this.obtenerCasilla(indicesCasillaIzquierda) !== undefined;
    const derecha = this.obtenerCasilla(indicesCasillaDerecha) !== undefined;
    const esIzquierda = !izquierda && derecha;
    if (esIzquierda)
      return "izquierda";
    const esCentro = izquierda && derecha;
    if (esCentro)
      return "centro";
    const esDerecha = izquierda && !derecha;
    if (esDerecha)
      return "derecha";
    const esSolo = !izquierda && !derecha;
    if (esSolo)
      return "solo";
    throw new Error("invalid element");
  }
  actualizarElementos() {
    this.elementos.forEach((elemento6) => {
      const indicesCasilla = this.obtenerIndicesCasilla(elemento6.izquierdaSuperior);
      const nombreEstado = this.estadoSegunPosicion(indicesCasilla);
      const indices = this.estadosElementoIndices[nombreEstado];
      elemento6.elemento.indices = new Plano(indices.horizontal, indices.vertical);
    });
  }
  agregarEscaleras(indicesCasilla) {
    const indiceElementos = this.agregarElementos(indicesCasilla);
    if (indiceElementos === "ya esta agregado")
      return "ya esta agregado";
    this.actualizarElementos();
    return indiceElementos;
  }
  dibujarEscaleras() {
    this.dibujarElementos();
  }
}

// typescript/juego/mapa/espumas.ts
class Espumas extends CasillasAnimaciones {
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(3, 3), [
      [true, false, false],
      [false, false, false],
      [false, false, false]
    ], lienzo, "images/terrain/water/foam.png", new Elemento(new Medidas(192, 192), new Plano(0, 0)), new Animacion(8, 8));
  }
  agregarEspuma(indicesCasilla) {
    const indiceAnimaciones = this.agregarAnimaciones(indicesCasilla);
    if (indiceAnimaciones === "ya esta agregado")
      return "ya esta agregado";
    const animaciones2 = this.animaciones[indiceAnimaciones];
    if (animaciones2 === undefined)
      return;
    animaciones2.izquierdaSuperior.x -= this.medidasCasilla.ancho;
    animaciones2.izquierdaSuperior.y -= this.medidasCasilla.alto;
    return indiceAnimaciones;
  }
  dibujarEspumas() {
    this.dibujarAnimaciones();
  }
}

// typescript/juego/mapa/manchasElevaciones.ts
class ManchasElevacion extends CasillasElementos {
  estadosElementoIndices;
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(1, 1), true, lienzo, "images/terrain/ground/flat.png", new Elemento(new Medidas(64, 64), new Plano(0, 0)));
    this.estadosElementoIndices = {
      pasto: new Plano(4, 0),
      arena: new Plano(9, 0)
    };
  }
  agregarManchaElevacion(indicesCasilla, estado) {
    const elementoIndices = this.estadosElementoIndices[estado];
    this.elemento.indices = new Plano(elementoIndices.horizontal, elementoIndices.vertical);
    const indiceElementos = this.agregarElementos(indicesCasilla);
    if (indiceElementos === "ya esta agregado")
      return "ya esta agregado";
    const elementos3 = this.elementos[indiceElementos];
    if (elementos3 === undefined)
      return;
    elementos3.elemento.indices = new Plano(elementoIndices.horizontal, elementoIndices.vertical);
    return indiceElementos;
  }
  dibujarManchasElevaciones() {
    this.dibujarElementos();
  }
}

// typescript/juego/mapa/paredElevaciones.ts
class ParedesElevacion extends CasillasElementos {
  estadosElementoIndices;
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(1, 1), true, lienzo, "images/terrain/ground/elevation.png", new Elemento(new Medidas(64, 64), new Plano(0, 0)));
    this.estadosElementoIndices = {
      izquierda: new Plano(0, 3),
      centro: new Plano(1, 3),
      derecha: new Plano(2, 3),
      solo: new Plano(3, 5)
    };
  }
  estadoConPosicion(indicesCasilla) {
    const indicesCasillaIzquierda = new Plano(indicesCasilla.horizontal - 1, indicesCasilla.vertical);
    const indicesCasillaDerecha = new Plano(indicesCasilla.horizontal + 1, indicesCasilla.vertical);
    const izquierda = this.obtenerCasilla(indicesCasillaIzquierda) !== undefined;
    const derecha = this.obtenerCasilla(indicesCasillaDerecha) !== undefined;
    const esIzquierda = !izquierda && derecha;
    if (esIzquierda)
      return "izquierda";
    const esCentro = izquierda && derecha;
    if (esCentro)
      return "centro";
    const esDerecha = izquierda && !derecha;
    if (esDerecha)
      return "derecha";
    const esVertical = !izquierda && !derecha;
    if (esVertical)
      return "solo";
    throw new Error("invalid element");
  }
  actualizarElementos() {
    this.elementos.forEach((elementos3) => {
      const indicesCasilla = this.obtenerIndicesCasilla(elementos3.izquierdaSuperior);
      const estado = this.estadoConPosicion(indicesCasilla);
      const indices = this.estadosElementoIndices[estado];
      elementos3.elemento.indices = new Plano(indices.horizontal, indices.vertical);
    });
  }
  agregarParedElevaciones(indicesCasilla) {
    const indiceElementos = this.agregarElementos(indicesCasilla);
    if (indiceElementos === "ya esta agregado")
      return "ya esta agregado";
    const elementos3 = this.elementos[indiceElementos];
    if (elementos3 === undefined)
      return;
    this.actualizarElementos();
    return indiceElementos;
  }
  dibujarParedesElevacion() {
    this.dibujarElementos();
  }
}

// typescript/juego/mapa/pasto.ts
class Pasto extends Terreno {
  constructor(mapa, lienzo) {
    super(mapa, lienzo, "images/terrain/ground/flat.png", {
      izquierdaSuperior: new Plano(0, 0),
      superior: new Plano(1, 0),
      derechaSuperior: new Plano(2, 0),
      izquierda: new Plano(0, 1),
      centro: new Plano(1, 1),
      derecha: new Plano(2, 1),
      izquierdaInferior: new Plano(0, 2),
      inferior: new Plano(1, 2),
      derechaInferior: new Plano(2, 2),
      horizontalIzquierda: new Plano(0, 3),
      horizontalCentro: new Plano(1, 3),
      horizontalDerecha: new Plano(2, 3),
      verticalSuperior: new Plano(3, 0),
      verticalCentro: new Plano(3, 1),
      verticalInferior: new Plano(3, 2),
      solo: new Plano(3, 3)
    });
  }
  agregarPasto(indicesCasilla) {
    return this.agregarTerreno(indicesCasilla);
  }
  dibujarPasto() {
    this.dibujarTerreno();
  }
}

// typescript/juego/mapa/sombras.ts
class Sombras extends CasillasImagenes {
  constructor(mapa, lienzo) {
    super(mapa.izquierdaSuperior.x, mapa.izquierdaSuperior.y, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), new Plano(3, 3), [
      [true, false, false],
      [false, false, false],
      [false, false, false]
    ], lienzo, "images/terrain/ground/shadows.png");
  }
  agregarSombra(indicesCasilla) {
    const indiceImagen = this.agregarImagen(indicesCasilla);
    if (indiceImagen === "ya esta agregado")
      return "ya esta agregado";
    const sombra = this.imagines[indiceImagen];
    if (sombra === undefined)
      return;
    sombra.izquierdaSuperior.x -= this.medidasCasilla.ancho;
    sombra.izquierdaSuperior.y -= this.medidasCasilla.ancho;
    return indiceImagen;
  }
  dibujarSombras() {
    this.dibujarImagenes();
  }
}

// typescript/juego/mapa/piso.ts
class Piso {
  mapa;
  lienzo;
  agua;
  espumas;
  arena;
  elevaciones;
  pasto;
  sombras;
  paredesElevacion;
  escaleras;
  manchasElevacion;
  castillos;
  arboles;
  constructor(mapa, lienzo) {
    this.mapa = mapa;
    this.lienzo = lienzo;
    this.agua = new Agua(this.mapa, this.lienzo);
    this.espumas = new Espumas(this.mapa, this.lienzo);
    this.arena = new Arena(this.mapa, this.lienzo);
    this.elevaciones = new Elevaciones(this.mapa, this.lienzo);
    this.pasto = new Pasto(this.mapa, this.lienzo);
    this.sombras = new Sombras(this.mapa, this.lienzo);
    this.paredesElevacion = new ParedesElevacion(this.mapa, this.lienzo);
    this.escaleras = new Escaleras(this.mapa, this.lienzo);
    this.manchasElevacion = new ManchasElevacion(this.mapa, this.lienzo);
    this.castillos = new Castillos(this.mapa, this.lienzo);
    this.arboles = new Arboles(this.mapa, this.lienzo);
  }
  agregarPiso(matriz) {
    matriz.forEach((fila, vertical) => {
      fila.forEach((casilla2, horizontal) => {
        const indicesCasilla = new Plano(horizontal, vertical);
        if (casilla2.agua === true)
          this.agua.agregarAgua(indicesCasilla);
        if (casilla2.espuma !== false) {
          this.espumas.agregarEspuma(indicesCasilla);
          if (casilla2.espuma.arena === true)
            this.arena.agregarArena(indicesCasilla);
        }
        if (casilla2.elevacion !== false) {
          if (casilla2.elevacion.sombra === true)
            this.sombras.agregarSombra(indicesCasilla);
          if (casilla2.elevacion.pasto === true)
            this.pasto.agregarPasto(indicesCasilla);
          this.elevaciones.agregarElevacion(indicesCasilla);
        }
        if (casilla2.paredElevacion !== false) {
          if (casilla2.paredElevacion.sombra === true)
            this.sombras.agregarSombra(indicesCasilla);
          this.paredesElevacion.agregarParedElevaciones(indicesCasilla);
          if (casilla2.paredElevacion.mancha !== false)
            this.manchasElevacion.agregarManchaElevacion(indicesCasilla, casilla2.paredElevacion.mancha);
        }
        if (casilla2.escalera !== false) {
          if (casilla2.escalera.sombra === true)
            this.sombras.agregarSombra(indicesCasilla);
          this.escaleras.agregarEscaleras(indicesCasilla);
          if (casilla2.escalera.mancha !== false)
            this.manchasElevacion.agregarManchaElevacion(indicesCasilla, casilla2.escalera.mancha);
        }
        if (casilla2.castillo !== false) {
          this.castillos.agregarCastillo(indicesCasilla, casilla2.castillo.estado, casilla2.castillo.color);
        }
        if (casilla2.arbol !== false)
          this.arboles.agregarArbol(indicesCasilla, casilla2.arbol.estado);
      });
    });
  }
  sobrePiso(coordenadas5) {
    const arena2 = this.arena.colision(coordenadas5) !== false;
    const elevaciones2 = this.elevaciones.colision(coordenadas5) !== false;
    const escaleras2 = this.escaleras.colision(coordenadas5) !== false;
    if (arena2 === true)
      return true;
    if (elevaciones2 === true)
      return true;
    if (escaleras2 === true)
      return true;
    return false;
  }
  colision(coordenadas5, ultimasCoordenadas) {
    if (coordenadas5.x === ultimasCoordenadas.x && coordenadas5.y === ultimasCoordenadas.y)
      throw new Error("the initial and final coordinates are the same");
    const arenaColision = this.arena.colision(coordenadas5);
    const elevacionColision = this.elevaciones.colision(coordenadas5);
    const paredElevacionColision = this.paredesElevacion.colision(coordenadas5);
    const escalerasColision = this.escaleras.colision(coordenadas5);
    let horizontal = "centro";
    if (coordenadas5.x > ultimasCoordenadas.x)
      horizontal = "izquierda";
    else if (coordenadas5.x < ultimasCoordenadas.x)
      horizontal = "derecha";
    let vertical = "centro";
    if (coordenadas5.y > ultimasCoordenadas.y)
      vertical = "arriba";
    else if (coordenadas5.y < ultimasCoordenadas.y)
      vertical = "abajo";
    const direccion2 = new Direccion(horizontal, vertical);
    const siguientesCoordenadas = new Coordenadas(coordenadas5.x, coordenadas5.y);
    const colisionSiguientesCoordenadas = () => {
      const arenaColisionSiguiente = this.arena.colision(siguientesCoordenadas);
      const elevacionColisionSiguiente = this.elevaciones.colision(siguientesCoordenadas);
      const paredElevacionColisionSiguiente = this.paredesElevacion.colision(siguientesCoordenadas);
      const escalerasColisionSiguiente = this.escaleras.colision(siguientesCoordenadas);
      if (arenaColision !== false) {
        if (arenaColisionSiguiente !== false)
          return false;
        if (elevacionColisionSiguiente !== false)
          return true;
        if (paredElevacionColisionSiguiente !== false)
          return true;
        if (escalerasColisionSiguiente !== false)
          return false;
        return true;
      }
      if (elevacionColision !== false) {
        if (elevacionColisionSiguiente !== false)
          return false;
        if (paredElevacionColisionSiguiente !== false)
          return true;
        if (escalerasColisionSiguiente !== false)
          return false;
        return true;
      }
      if (paredElevacionColision !== false)
        return true;
      if (escalerasColision !== false) {
        if (elevacionColisionSiguiente !== false)
          return false;
        if (paredElevacionColisionSiguiente !== false)
          return true;
        if (escalerasColisionSiguiente !== false)
          return false;
        return true;
      }
      throw new Error("colision no encontrada");
    };
    const horizontalIgual = () => {
      if (direccion2.x === "izquierda")
        return ultimasCoordenadas.x < siguientesCoordenadas.x;
      if (direccion2.x === "derecha")
        return siguientesCoordenadas.x < ultimasCoordenadas.x;
      return false;
    };
    const verticalIgual = () => {
      if (direccion2.y === "arriba")
        return ultimasCoordenadas.y < siguientesCoordenadas.y;
      if (direccion2.y === "abajo")
        return siguientesCoordenadas.y < ultimasCoordenadas.y;
      return false;
    };
    while (horizontalIgual() || verticalIgual()) {
      siguientesCoordenadas.x += this.mapa.medidasCasilla.ancho * direccion2.xNumero;
      siguientesCoordenadas.y += this.mapa.medidasCasilla.alto * direccion2.yNumero;
      const colision = colisionSiguientesCoordenadas();
      if (colision === true)
        return new Coordenadas(siguientesCoordenadas.x, siguientesCoordenadas.y);
    }
    throw new Error("no colision en piso");
  }
  dibujarPiso() {
    this.agua.dibujarAgua();
    this.espumas.dibujarEspumas();
    this.arena.dibujarArena();
    this.sombras.dibujarSombras();
    this.elevaciones.dibujarElevaciones();
    this.paredesElevacion.dibujarParedesElevacion();
    this.pasto.dibujarPasto();
    this.escaleras.dibujarEscaleras();
    this.manchasElevacion.dibujarManchasElevaciones();
    this.castillos.dibujarCastillos();
    this.arboles.dibujarArboles();
  }
}

// typescript/juego/matrixMapa.ts
class MatrizMapa {
  static longitudes = new Plano(37, 21);
  static obtenerCasillaVacia() {
    return {
      agua: false,
      espuma: false,
      elevacion: false,
      paredElevacion: false,
      escalera: false,
      castillo: false,
      arbol: false
    };
  }
  static obtenerCasillaPiso0(indicesCasilla) {
    const casilla2 = MatrizMapa.obtenerCasillaVacia();
    casilla2.agua = true;
    if (indicesCasilla.vertical >= 3 && indicesCasilla.vertical <= 19 && indicesCasilla.horizontal >= 1 && indicesCasilla.horizontal <= 35)
      casilla2.espuma = {
        arena: true
      };
    if (indicesCasilla.vertical === 14 && indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13)
      casilla2.escalera = {
        sombra: true,
        mancha: indicesCasilla.horizontal === 11 ? "arena" : false
      };
    return casilla2;
  }
  static obtenerCasillaPiso1(indicesCasilla) {
    const casilla2 = MatrizMapa.obtenerCasillaVacia();
    if (indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 34 && indicesCasilla.vertical >= 2 && indicesCasilla.vertical <= 13)
      casilla2.elevacion = {
        piso: 1,
        sombra: indicesCasilla.vertical >= 3,
        pasto: true
      };
    if (indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10 && indicesCasilla.vertical === 14)
      casilla2.elevacion = {
        piso: 1,
        sombra: true,
        pasto: true
      };
    if (indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34 && indicesCasilla.vertical === 14)
      casilla2.elevacion = {
        piso: 1,
        sombra: true,
        pasto: true
      };
    if (indicesCasilla.vertical === 15 && indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10) {
      const manchaAleatoria = Math.round(Math.random());
      casilla2.paredElevacion = {
        sombra: true,
        mancha: manchaAleatoria === 0 ? "arena" : false
      };
    }
    if (indicesCasilla.vertical === 15 && indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34) {
      const manchaAleatoria = Math.round(Math.random());
      casilla2.paredElevacion = {
        sombra: true,
        mancha: manchaAleatoria === 0 ? "arena" : false
      };
    }
    if (indicesCasilla.vertical === 7 && indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13) {
      casilla2.escalera = {
        sombra: true,
        mancha: indicesCasilla.horizontal === 9 ? "pasto" : false
      };
    }
    if (indicesCasilla.vertical === 3 && indicesCasilla.horizontal === 14) {
      casilla2.arbol = {
        estado: "derribado"
      };
    }
    return casilla2;
  }
  static obtenerCasillaPiso2(indicesCasilla) {
    const casilla2 = MatrizMapa.obtenerCasillaVacia();
    if (indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 30 && indicesCasilla.vertical >= 1 && indicesCasilla.vertical <= 6) {
      casilla2.elevacion = {
        piso: 2,
        sombra: indicesCasilla.vertical >= 3,
        pasto: true
      };
    }
    if (indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10 && indicesCasilla.vertical === 7) {
      casilla2.elevacion = {
        piso: 2,
        sombra: true,
        pasto: true
      };
    }
    if (indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30 && indicesCasilla.vertical === 7) {
      casilla2.elevacion = {
        piso: 2,
        sombra: true,
        pasto: true
      };
    }
    if (indicesCasilla.vertical === 8 && indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10) {
      const manchaAleatoria = Math.round(Math.random());
      casilla2.paredElevacion = {
        sombra: true,
        mancha: manchaAleatoria === 0 ? "pasto" : false
      };
    }
    if (indicesCasilla.vertical === 8 && indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30) {
      const manchaAleatoria = Math.round(Math.random());
      casilla2.paredElevacion = {
        sombra: true,
        mancha: manchaAleatoria === 0 ? "pasto" : false
      };
    }
    return casilla2;
  }
  static obtenerPisosCasillas = [
    MatrizMapa.obtenerCasillaPiso0,
    MatrizMapa.obtenerCasillaPiso1,
    MatrizMapa.obtenerCasillaPiso2
  ];
  static get obtener() {
    const mapa = [];
    for (let piso = 0;piso < MatrizMapa.obtenerPisosCasillas.length; piso++) {
      mapa[piso] = [];
      const matrizPiso = mapa[piso];
      if (matrizPiso === undefined)
        continue;
      const indicesCasilla = new Plano(0, 0);
      for (indicesCasilla.vertical = 0;indicesCasilla.vertical < MatrizMapa.longitudes.vertical; indicesCasilla.vertical++) {
        matrizPiso[indicesCasilla.vertical] = [];
        const fila = matrizPiso[indicesCasilla.vertical];
        if (fila === undefined)
          continue;
        for (indicesCasilla.horizontal = 0;indicesCasilla.horizontal < MatrizMapa.longitudes.horizontal; indicesCasilla.horizontal++) {
          const obtenerPisoCasillas = MatrizMapa.obtenerPisosCasillas[piso];
          if (obtenerPisoCasillas === undefined)
            continue;
          fila[indicesCasilla.horizontal] = obtenerPisoCasillas(indicesCasilla);
        }
      }
    }
    return mapa;
  }
}

// typescript/juego/mapa.ts
class Mapa extends Objeto {
  matriz = MatrizMapa.obtener;
  pisos;
  medidasCasilla;
  lienzo;
  constructor(lienzo) {
    super(new Coordenadas(0, 0), new Medidas(100, 100));
    this.lienzo = lienzo;
    this.medidasCasilla = new Medidas(0, this.medidas.alto / MatrizMapa.longitudes.vertical);
    this.medidasCasilla.ancho = this.lienzo.anchoEnPorcentajeAltura(this.medidasCasilla.alto);
    this.pisos = this.matriz.map((matrizPiso) => {
      const piso2 = new Piso(this, this.lienzo);
      console.log(matrizPiso);
      piso2.agregarPiso(matrizPiso);
      return piso2;
    });
  }
  sobrePiso(coordenadas6) {
    for (let indicePiso = this.pisos.length - 1;indicePiso >= 0; indicePiso--) {
      const piso2 = this.pisos[indicePiso];
      if (piso2 === undefined)
        continue;
      if (piso2.sobrePiso(coordenadas6) === false)
        continue;
      return indicePiso;
    }
    return false;
  }
  colision(coordenadas6, ultimasCoordenadas) {
    for (let indicePiso = this.pisos.length - 1;indicePiso >= 0; indicePiso--) {
      const piso2 = this.pisos[indicePiso];
      if (piso2 === undefined)
        continue;
      if (piso2.sobrePiso(coordenadas6) === false)
        continue;
      const colision = piso2.colision(coordenadas6, ultimasCoordenadas);
      const indiceSiguientePiso = indicePiso + 1;
      const siguientePiso = this.pisos[indiceSiguientePiso];
      if (siguientePiso === undefined)
        return colision;
      const arena2 = piso2.arena.colision(coordenadas6) !== false;
      const elevacion = piso2.elevaciones.colision(coordenadas6) !== false;
      const paredElevacion = piso2.paredesElevacion.colision(coordenadas6) !== false;
      const escalera = piso2.escaleras.colision(coordenadas6) !== false;
      const direccion3 = new Direccion("centro", "centro");
      if (coordenadas6.x > ultimasCoordenadas.x)
        direccion3.x = "izquierda";
      else if (coordenadas6.x < ultimasCoordenadas.x)
        direccion3.x = "derecha";
      if (coordenadas6.y > ultimasCoordenadas.y)
        direccion3.y = "arriba";
      else if (coordenadas6.y < ultimasCoordenadas.y)
        direccion3.y = "abajo";
      const siguientesCoordenadas = new Coordenadas(coordenadas6.x, coordenadas6.y);
      const colisionSiguientesCoordenadas = () => {
        const arenaSiguientePiso = siguientePiso.arena.colision(siguientesCoordenadas) !== false;
        const elevacionSiguientePiso = siguientePiso.elevaciones.colision(siguientesCoordenadas) !== false;
        const paredElevacionSiguientePiso = siguientePiso.paredesElevacion.colision(siguientesCoordenadas) !== false;
        const escaleraSiguientePiso = siguientePiso.escaleras.colision(siguientesCoordenadas) !== false;
        if (arena2 === true) {
          if (arenaSiguientePiso === true)
            return true;
          if (elevacionSiguientePiso === true)
            return true;
          if (paredElevacionSiguientePiso === true)
            return true;
          if (escaleraSiguientePiso === true)
            return false;
        }
        if (elevacion === true) {
          if (arenaSiguientePiso === true)
            return true;
          if (elevacionSiguientePiso === true)
            return true;
          if (paredElevacionSiguientePiso === true)
            return true;
          if (escaleraSiguientePiso === true)
            return false;
        }
        if (paredElevacion === true) {
          if (arenaSiguientePiso === true)
            return true;
          if (elevacionSiguientePiso === true)
            return true;
          if (paredElevacionSiguientePiso === true)
            return true;
          if (escaleraSiguientePiso === true)
            return false;
        }
        if (escalera === true) {
          if (arenaSiguientePiso === true)
            return false;
          if (elevacionSiguientePiso === true)
            return false;
          if (paredElevacionSiguientePiso === true)
            return false;
          if (escaleraSiguientePiso === true)
            return false;
        }
        return true;
      };
      const horizontalIgual = () => {
        if (direccion3.x === "izquierda")
          return ultimasCoordenadas.x < siguientesCoordenadas.x;
        if (direccion3.x === "derecha")
          return siguientesCoordenadas.x < ultimasCoordenadas.x;
        return false;
      };
      const verticalIgual = () => {
        if (direccion3.y === "arriba")
          return ultimasCoordenadas.y < siguientesCoordenadas.y;
        else if (direccion3.y === "abajo") {
          return siguientesCoordenadas.y < ultimasCoordenadas.y;
        }
        return false;
      };
      while (horizontalIgual() || verticalIgual()) {
        siguientesCoordenadas.x += this.medidasCasilla.ancho * direccion3.xNumero;
        siguientesCoordenadas.y += this.medidasCasilla.alto * direccion3.yNumero;
        const colision2 = colisionSiguientesCoordenadas();
        if (colision2 === true)
          return new Coordenadas(siguientesCoordenadas.x, siguientesCoordenadas.y);
      }
    }
    throw new Error("no floors");
  }
  dibujarMapa() {
    this.pisos.forEach((piso2) => piso2.dibujarPiso());
  }
}

// typescript/motor/cuadrado.ts
class Cuadrado extends Objeto {
  lienzo;
  fillStyle;
  strokeStyle;
  lineWidth;
  constructor(izquierdaSuperior, medidas14, lienzo, fillStyle, strokeStyle, lineWidth) {
    super(izquierdaSuperior, medidas14);
    this.lienzo = lienzo;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
  }
  dibujarCuadrado() {
    const posicionEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (posicionEnLienzo === false)
      return;
    this.lienzo.contexto.beginPath();
    this.lienzo.contexto.rect(posicionEnLienzo.izquierdaSuperior.x, posicionEnLienzo.izquierdaSuperior.y, posicionEnLienzo.medidas.ancho, posicionEnLienzo.medidas.alto);
    if (this.fillStyle !== false) {
      this.lienzo.contexto.fillStyle = this.fillStyle;
      this.lienzo.contexto.fill();
    }
    if (this.strokeStyle !== false) {
      this.lienzo.contexto.strokeStyle = this.strokeStyle;
      this.lienzo.contexto.lineWidth = this.lineWidth;
      this.lienzo.contexto.stroke();
    }
    this.lienzo.contexto.closePath();
  }
}

// typescript/motor/personaje.ts
class Personaje extends Cuadrado {
  escala;
  animaciones;
  velocidad;
  direccion;
  constructor(izquierdaSuperior, medidas15, lienzo, fillStyle, strokeStyle, lineWidth, escala, parametrosAnimaciones, velocidad, direccion4) {
    super(izquierdaSuperior, medidas15, lienzo, fillStyle, strokeStyle, lineWidth);
    this.escala = escala;
    this.lienzo = lienzo;
    this.velocidad = velocidad;
    this.direccion = direccion4;
    this.animaciones = new Animaciones(new Coordenadas(0, 0), new Medidas(0, 0), lienzo, parametrosAnimaciones.ruta, parametrosAnimaciones.elemento, parametrosAnimaciones.animacion);
  }
  mover() {
    if (this.direccion.igualA(new Direccion("centro", "centro")))
      return false;
    const segundosEntreCuadros = this.lienzo.tiempoEntreCuadros / 1000;
    const velocidadX = this.velocidad.x * segundosEntreCuadros;
    const velocidadY = this.velocidad.y * segundosEntreCuadros;
    const distanciaX = velocidadX * this.direccion.xNumero;
    const distanciaY = velocidadY * this.direccion.yNumero;
    const nuevaX = this.izquierdaSuperior.x + distanciaX;
    const nuevaY = this.izquierdaSuperior.y + distanciaY;
    return new Coordenadas(nuevaX, nuevaY);
  }
  dibujarPersonaje() {
    this.dibujarCuadrado();
    this.animaciones = new Animaciones(new Coordenadas(this.izquierdaSuperior.x + this.medidas.mitad.ancho - this.animaciones.medidas.mitad.ancho, this.izquierdaSuperior.y + this.medidas.mitad.alto - this.animaciones.medidas.mitad.alto), new Medidas(this.escala.ancho * this.medidas.ancho, this.escala.alto * this.medidas.alto), this.lienzo, this.animaciones.ruta, this.animaciones.elemento, this.animaciones.animacion);
    this.animaciones.dibujarAnimacion();
  }
}

// typescript/motor/texto.ts
class Texto extends Objeto {
  lienzo;
  valor;
  fillStyle;
  strokeStyle;
  dungeonFont;
  get font() {
    const font = `${this.medidas.alto}px`;
    if (this.dungeonFont === true)
      font.concat(" Dungeon,");
    return font.concat(" sans - serif, arial");
  }
  constructor(izquierdaSuperior, medidas15, lienzo, valor, fillStyle, strokeStyle, dungeonFont) {
    super(izquierdaSuperior, medidas15);
    this.lienzo = lienzo;
    this.valor = valor;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.dungeonFont = dungeonFont;
  }
  dibujarTexto() {
    if (this.valor.length === 0)
      return;
    const objetoEnLienzo = this.lienzo.objetoEnLienzo(this);
    if (objetoEnLienzo === false)
      return;
    this.lienzo.contexto.font = this.font;
    this.lienzo.contexto.textAlign = "left";
    this.lienzo.contexto.textBaseline = "top";
    objetoEnLienzo.medidas.ancho = this.lienzo.contexto.measureText(this.valor).width;
    objetoEnLienzo.izquierdaSuperior.x += this.medidas.mitad.ancho;
    objetoEnLienzo.izquierdaSuperior.x -= objetoEnLienzo.medidas.mitad.ancho;
    if (this.fillStyle !== false) {
      this.lienzo.contexto.fillStyle = this.fillStyle;
      this.lienzo.contexto.fillText(this.valor, objetoEnLienzo.izquierdaSuperior.x, objetoEnLienzo.izquierdaSuperior.y);
    }
    if (this.strokeStyle !== false) {
      this.lienzo.contexto.strokeStyle = this.strokeStyle;
      this.lienzo.contexto.strokeText(this.valor, objetoEnLienzo.izquierdaSuperior.x, objetoEnLienzo.izquierdaSuperior.y);
    }
  }
}

// typescript/juego/barraUsuario.ts
class BarraUsuario extends Cuadrado {
  peon;
  foto;
  apodo;
  constructor(peon, medidas16, lienzo, rutaFoto, apodo) {
    super(new Coordenadas(0, 0), medidas16, lienzo, "#416177", "#fff", 0.5);
    this.peon = peon;
    this.foto = new Imagen(new Coordenadas(0, 0), new Medidas(this.medidas.ancho * 0.3, this.medidas.alto), this.lienzo, rutaFoto);
    this.apodo = new Texto(new Coordenadas(0, 0), this.medidas.porcentaje(new Medidas(70, 100)), this.lienzo, apodo, "#fff", false, false);
  }
  dibujarBarraUsuario() {
    this.izquierdaSuperior.x = this.peon.izquierdaSuperior.x;
    this.izquierdaSuperior.y = this.peon.izquierdaSuperior.y - this.medidas.alto;
    this.foto.izquierdaSuperior.x = this.izquierdaSuperior.x;
    this.foto.izquierdaSuperior.y = this.izquierdaSuperior.y;
    this.apodo.izquierdaSuperior.x = this.izquierdaSuperior.x + this.foto.medidas.ancho;
    this.apodo.izquierdaSuperior.y = this.izquierdaSuperior.y;
    this.dibujarCuadrado();
    this.foto.dibujarImagen();
    this.apodo.dibujarTexto();
  }
}

// typescript/juego/peon.ts
class Peon extends Personaje {
  mapa;
  apodo;
  barraUsuario;
  constructor(izquierdaSuperior, mapa, lienzo, color, apodo) {
    super(izquierdaSuperior, new Medidas(mapa.medidasCasilla.ancho, mapa.medidasCasilla.alto), lienzo, "#fff", false, 0, new Medidas(3, 3), {
      ruta: `images/factions/knights/troops/pawn/${color}.png`,
      elemento: new Elemento(new Medidas(192, 192), new Plano(6, 6)),
      animacion: new Animacion(6, 6)
    }, new Coordenadas(2, 2), new Direccion("centro", "centro"));
    this.mapa = mapa;
    this.apodo = apodo;
    this.barraUsuario = new BarraUsuario(this, new Medidas(0, 0), lienzo, false, apodo);
  }
  dibujarPeon() {
    this.dibujarPersonaje();
    this.barraUsuario.dibujarBarraUsuario();
  }
}

// typescript/juego/juego.ts
class Juego extends Escena {
  mapa;
  peones = [];
  ovejas = [];
  constructor(lienzo) {
    super(lienzo);
    this.mapa = new Mapa(lienzo);
  }
  regaloTiktok(regalo) {
    const existe = this.peones.some((peon2) => peon2.apodo === regalo.nickname);
    if (existe === true)
      return;
    this.peones.push(new Peon(new Coordenadas(Math.floor(Math.random() * this.mapa.medidas.ancho), Math.floor(Math.random() * this.mapa.medidas.alto)), this.mapa, this.lienzo, "blue", regalo.nickname));
  }
  tiktokChat(chat) {
    console.log(chat);
  }
  draw = () => {
    this.mapa.dibujarMapa();
    this.peones.forEach((pawn) => pawn.dibujarPeon());
    this.ovejas.forEach((oveja) => oveja.dibujar());
  };
}

// typescript/motor/camara.ts
class Camara extends Objeto {
  constructor(izquierdaSuperior) {
    super(izquierdaSuperior, new Medidas(100, 100));
  }
  objetoAdentroDeCamara(objeto9) {
    const dobleDeMedidas = new Medidas(objeto9.medidas.ancho * 2, objeto9.medidas.alto * 2);
    const vision = new Objeto(new Coordenadas(this.izquierdaSuperior.x - objeto9.medidas.ancho, this.izquierdaSuperior.y - objeto9.medidas.alto), new Medidas(this.medidas.ancho + dobleDeMedidas.ancho, this.medidas.alto + dobleDeMedidas.alto));
    return vision.objetoAdentro(objeto9);
  }
  objetoEnCamara(objeto9) {
    if (this.objetoAdentroDeCamara(objeto9) === false)
      return false;
    return new Objeto(new Coordenadas(objeto9.izquierdaSuperior.x - this.izquierdaSuperior.x, objeto9.izquierdaSuperior.y - this.izquierdaSuperior.y), new Medidas(objeto9.medidas.ancho, objeto9.medidas.alto));
  }
  enfocar(objeto9) {
    this.izquierdaSuperior.x = objeto9.izquierdaSuperior.x - this.medidas.mitad.ancho + objeto9.medidas.mitad.ancho;
    this.izquierdaSuperior.y = objeto9.izquierdaSuperior.y - this.medidas.mitad.alto + objeto9.medidas.mitad.alto;
  }
}

// typescript/motor/eventosToques.ts
class EventosToques {
  lienzo;
  modoToque = false;
  toques = [];
  teclasPresionadas = [];
  teclasSoltadas = [];
  coordenadasToque(toque) {
    if (toque === null)
      return false;
    const left = this.lienzo.margen.ancho / 2;
    const top = this.lienzo.margen.alto / 2;
    return new Coordenadas(toque.pageX - left, toque.pageY - top);
  }
  asignarCoordenadasToque(evento) {
    this.toques = [];
    for (let indice = 0;indice < evento.changedTouches.length; indice++) {
      const toque = evento.changedTouches.item(indice);
      const coordenadas12 = this.coordenadasToque(toque);
      if (coordenadas12 === false)
        continue;
      this.toques[indice] = coordenadas12;
    }
  }
  empezarToque(evento) {
    evento.preventDefault();
    this.modoToque = "empezar";
    this.asignarCoordenadasToque(evento);
  }
  moverToque(evento) {
    evento.preventDefault();
    this.modoToque = "mover";
    this.asignarCoordenadasToque(evento);
  }
  terminarToque(evento) {
    evento.preventDefault();
    this.modoToque = "terminar";
    this.asignarCoordenadasToque(evento);
  }
  presionarTecla(evento) {
    if (this.teclasPresionadas.includes(evento.key))
      return;
    this.teclasPresionadas.push(evento.key);
  }
  soltarTecla(evento) {
    this.teclasPresionadas = this.teclasPresionadas.filter((tecla) => tecla !== evento.key);
    if (this.teclasSoltadas.includes(evento.key))
      return;
    this.teclasSoltadas.push(evento.key);
  }
  constructor(lienzo) {
    this.lienzo = lienzo;
    this.lienzo.elemento.addEventListener("touchstart", (evento) => this.empezarToque(evento));
    this.lienzo.elemento.addEventListener("touchmove", (evento) => this.moverToque(evento));
    this.lienzo.elemento.addEventListener("touchend", (evento) => this.terminarToque(evento));
    this.lienzo.elemento.addEventListener("keydown", (evento) => this.presionarTecla(evento));
    this.lienzo.elemento.addEventListener("keyup", (evento) => this.soltarTecla(evento));
  }
  actualizar() {
    this.modoToque = false;
    this.teclasSoltadas = [];
  }
}

// typescript/motor/imagines.ts
class Imagines {
  rutasNoEncontradas = [];
  imagenesCargadas = {};
  cargandoImagenes = false;
  cargarImagen(ruta) {
    if (this.cargandoImagenes === true)
      return false;
    if (this.rutasNoEncontradas.includes(ruta) === true)
      return false;
    const imagen5 = this.imagenesCargadas[ruta];
    if (imagen5 === undefined) {
      this.buscarImagen(ruta);
      return false;
    }
    return imagen5;
  }
  buscarImagen(ruta) {
    if (this.rutasNoEncontradas.includes(ruta) === true)
      return;
    const imagen5 = this.imagenesCargadas[ruta];
    if (imagen5 !== undefined)
      return;
    this.cargandoImagenes = true;
    const imagenNueva = new Image;
    imagenNueva.addEventListener("load", () => {
      this.cargandoImagenes = false;
      this.imagenesCargadas[ruta] = imagenNueva;
    });
    imagenNueva.addEventListener("error", () => {
      throw new Error(`image ${ruta} is not found`);
      this.rutasNoEncontradas.push(ruta);
    });
    imagenNueva.src = ruta;
  }
}

// typescript/motor/lienzo.ts
class Lienzo extends Camara {
  unPorciento = new Medidas(0, 0);
  cuadrosPorSegundo;
  intervaloEntreCuadros;
  tiempo = 0;
  margen = new Medidas(0, 0);
  elemento;
  imagines = new Imagines;
  tiempoEntreCuadros = 0;
  contexto;
  escena = false;
  eventosToques;
  siguienteCuadro(tiempo) {
    const diferncia = tiempo - this.tiempo;
    if (diferncia < this.intervaloEntreCuadros) {
      requestAnimationFrame((tiempo2) => this.siguienteCuadro(tiempo2));
      return;
    }
    this.tiempoEntreCuadros = diferncia;
    this.tiempo = tiempo;
    this.dibujarLienzo();
    requestAnimationFrame((tiempo2) => this.siguienteCuadro(tiempo2));
  }
  dibujarLienzo() {
    this.contexto.clearRect(0, 0, this.elemento.width, this.elemento.height);
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
  anchoEnPorcentaje = (pixeles) => pixeles / this.unPorciento.ancho;
  anchoEnPixeles = (porcentaje) => porcentaje * this.unPorciento.ancho;
  alturaEnPorcentaje = (pixeles) => pixeles / this.unPorciento.alto;
  alturaEnPixeles = (porcentaje) => porcentaje * this.unPorciento.alto;
  constructor(izquierdaSuperior, cuadrosPorSegundo) {
    super(izquierdaSuperior);
    this.cuadrosPorSegundo = cuadrosPorSegundo;
    this.intervaloEntreCuadros = 1000 / this.cuadrosPorSegundo;
    this.elemento = window.document.getElementById("canvas");
    this.contexto = this.elemento.getContext("2d");
    this.relacionAspecto();
    window.addEventListener("resize", () => this.relacionAspecto());
    this.eventosToques = new EventosToques(this);
    this.siguienteCuadro(0);
  }
  empezar(escena2) {
    this.escena = escena2;
  }
  objetoEnLienzo(objeto10) {
    const objetoEnCamara = this.objetoEnCamara(objeto10);
    if (objetoEnCamara === false)
      return false;
    return new Objeto(new Coordenadas(this.anchoEnPixeles(objetoEnCamara.izquierdaSuperior.x), this.alturaEnPixeles(objetoEnCamara.izquierdaSuperior.y)), new Medidas(this.anchoEnPorcentaje(objetoEnCamara.medidas.ancho), this.alturaEnPorcentaje(objetoEnCamara.medidas.alto)));
  }
  anchoEnPorcentajeAltura(porcentajeAltura) {
    const pixeles = this.alturaEnPixeles(porcentajeAltura);
    return this.anchoEnPorcentaje(pixeles);
  }
  alturaEnPorcentajeAncho(porcentajeAncho) {
    const pixeles = this.anchoEnPixeles(porcentajeAncho);
    return this.alturaEnPorcentaje(pixeles);
  }
}

// typescript/index.ts
window.addEventListener("load", () => {
  const canvas = new Lienzo(new Coordenadas(0, 0), 24);
  const game = new Juego(canvas);
  game.start();
});
