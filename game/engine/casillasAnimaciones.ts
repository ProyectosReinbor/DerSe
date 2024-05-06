import { Animacion } from "./animacion";
import { Animaciones } from "./animaciones";
import { Casillas, type CasillasOcupadas } from "./casillas";
import { Elemento } from "./elemento";
import type { RutaImagen } from "./imagen";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Plano } from "./plano";

export class CasillasAnimaciones extends Casillas {

    animaciones: Animaciones[] = [];
    lienzo: Lienzo;
    ruta: RutaImagen | false;
    elemento: Elemento;
    animacion: Animacion;

    constructor(
        x: number,
        y: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Plano,
        casillasOcupadas: CasillasOcupadas,
        lienzo: Lienzo,
        ruta: RutaImagen | false,
        elemento: Elemento,
        animacion: Animacion
    ) {
        super(
            x,
            y,
            medidasCasilla,
            longitudCasillasOcupadas,
            casillasOcupadas,
        );
        this.lienzo = lienzo;
        this.ruta = ruta;
        this.elemento = elemento;
        this.animacion = animacion;
    }

    agregarAnimaciones(indicesCasilla: Plano) {
        const objeto = this.nuevoObjeto(indicesCasilla);
        const elemento = new Elemento(
            new Medidas(
                this.elemento.medidas.ancho,
                this.elemento.medidas.alto
            ),
            new Plano(
                0,
                this.elemento.indices.vertical
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
        return true;
    }

    dibujarAnimaciones() {
        this.animaciones.forEach(
            animaciones => animaciones.dibujarAnimacion()
        );
    }
}