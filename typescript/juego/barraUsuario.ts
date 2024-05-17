import { Coordenadas } from "../motor/coordenadas";
import { Cuadrado } from "../motor/cuadrado";
import { Imagen, type RutaImagen } from "../motor/imagen";
import type { Lienzo } from "../motor/lienzo";
import { Medidas } from "../motor/medidas";
import { Texto } from "../motor/texto";
import type { Peon } from "./peon";

export class BarraUsuario extends Cuadrado {

    peon: Peon;
    foto: Imagen;
    apodo: Texto;

    constructor(
        peon: Peon,
        medidas: Medidas,
        lienzo: Lienzo,
        rutaFoto: RutaImagen | false,
        apodo: string,
    ) {
        super(
            new Coordenadas(0, 0),
            medidas,
            lienzo,
            "#416177",
            "#fff",
            0.5,
        );
        this.peon = peon;
        this.foto = new Imagen(
            new Coordenadas(0, 0),
            new Medidas(
                this.medidas.ancho * 0.3,
                this.medidas.alto,
            ),
            this.lienzo,
            rutaFoto,
        );
        this.apodo = new Texto(
            new Coordenadas(0, 0),
            this.medidas.porcentaje(
                new Medidas(70, 100)
            ),
            this.lienzo,
            apodo,
            "#fff",
            false,
            false,
        );
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