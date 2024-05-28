import { Animacion } from "./animacion";
import { Animaciones } from "./animaciones";
import { Casillas, type CasillasOcupadas } from "./casillas";
import { Coordenadas } from "./coordenadas";
import { Elemento } from "./elemento";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";

export class CasillasAnimaciones extends Casillas {

    animaciones: Animaciones[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;
    elemento: Elemento;
    animacion: Animacion;

    constructor(
        x: number,
        y: number,
        z: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Coordenadas,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
        elemento: Elemento,
        animacion: Animacion
    ) {
        super(
            x,
            y,
            z,
            medidasCasilla,
            longitudCasillasOcupadas,
            casillasOcupadas,
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
        this.elemento = elemento;
        this.animacion = animacion;
    }

    agregarAnimaciones(indicesCasilla: Coordenadas) {
        const objeto = this.nuevoObjeto(indicesCasilla);
        const elemento = new Elemento(
            new Medidas(
                this.elemento.medidas.ancho,
                this.elemento.medidas.alto,
                this.elemento.medidas.profundidad
            ),
            new Coordenadas(
                0,
                this.elemento.indices.vertical,
                0,
            )
        );
        const animacion = new Animacion(
            this.animacion.cuadros,
            this.animacion.cuadrosPorSegundo
        );
        const animaciones = new Animaciones(
            objeto.izquierdaSuperior,
            objeto.medidas,
            this.lienzo,
            this.ruta,
            elemento,
            animacion
        );
        const indiceAnimaciones = this.animaciones.length;
        const agregado = this.agregarObjeto(
            indicesCasilla,
            indiceAnimaciones
        );
        if (agregado === "ya esta agregado")
            return "ya esta agregado";

        this.animaciones[indiceAnimaciones] = animaciones;
        return indiceAnimaciones;
    }

    dibujarAnimaciones() {
        this.animaciones.forEach(
            animaciones => animaciones.dibujarAnimacion()
        );
    }
}