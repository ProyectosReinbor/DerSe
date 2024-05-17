import type { Animacion } from "./animacion";
import { Animaciones } from "./animaciones";
import type { FillStyle, StrokeStyle } from "./contexto";
import { Coordenadas } from "./coordenadas";
import { Cuadrado } from "./cuadrado";
import type { Elemento } from "./elemento";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Direccion } from "./personaje/direccion";

export class Personaje extends Cuadrado {

    escala: Medidas;
    animaciones: Animaciones;
    velocidad: Coordenadas;
    direccion: Direccion;

    constructor(
        izquierdaSuperior: Coordenadas,
        medidas: Medidas,
        lienzo: Lienzo,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        escala: Medidas,
        parametrosAnimaciones: {
            ruta: RutaImagen | false;
            elemento: Elemento;
            animacion: Animacion;
        },
        velocidad: Coordenadas,
        direccion: Direccion,
    ) {
        super(
            izquierdaSuperior,
            medidas,
            lienzo,
            fillStyle,
            strokeStyle,
            lineWidth
        );
        this.escala = escala;
        this.lienzo = lienzo;
        this.velocidad = velocidad;
        this.direccion = direccion;
        this.animaciones = new Animaciones(
            new Coordenadas(0, 0),
            new Medidas(0, 0),
            lienzo,
            parametrosAnimaciones.ruta,
            parametrosAnimaciones.elemento,
            parametrosAnimaciones.animacion
        );
    }

    mover(): Coordenadas | false {
        if (this.direccion.igualA(
            new Direccion("centro", "centro")
        ))
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
        this.animaciones = new Animaciones(
            new Coordenadas(
                this.izquierdaSuperior.x + this.medidas.mitad.ancho - this.animaciones.medidas.mitad.ancho,
                this.izquierdaSuperior.y + this.medidas.mitad.alto - this.animaciones.medidas.mitad.alto
            ),
            new Medidas(
                this.escala.ancho * this.medidas.ancho,
                this.escala.alto * this.medidas.alto
            ),
            this.lienzo,
            this.animaciones.ruta,
            this.animaciones.elemento,
            this.animaciones.animacion
        );

        this.animaciones.dibujarAnimacion();
    }
}