import { Animacion } from "../motor/animacion";
import { Coordenadas } from "../motor/coordenadas";
import { Elemento } from "../motor/elemento";
import type { Lienzo } from "../motor/lienzo";
import { Linea } from "../motor/linea";
import { Medidas } from "../motor/medidas";
import { Personaje } from "../motor/personaje";
import { Direccion } from "../motor/personaje/direccion";
import { Plano } from "../motor/plano";
import type { Mapa } from "./mapa";


export type EstadoOveja = "caminar" | "saltar";
export type EstadosOveja = {
    [key in EstadoOveja]: {
        animacion: Animacion;
        elemento: {
            indices: Plano;
        };
    }
}

export class Oveja extends Personaje {

    lineaVision: Linea;
    estado: EstadoOveja = "caminar";
    estados: EstadosOveja = {
        caminar: {
            animacion: new Animacion(8, 8),
            elemento: {
                indices: new Plano(0, 0)
            }
        },
        saltar: {
            animacion: new Animacion(6, 6),
            elemento: {
                indices: new Plano(0, 1)
            }
        }
    };
    tiempoSalto: number = 0;
    mapa: Mapa;

    constructor(
        izquierdaSuperior: Coordenadas,
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
        super(
            izquierdaSuperior,
            new Medidas(
                mapa.medidasCasilla.ancho,
                mapa.medidasCasilla.alto
            ),
            lienzo,
            "#fff",
            false,
            0,
            new Medidas(3, 3),
            {
                ruta: "images/resources/sheep/left.png",
                elemento: new Elemento(
                    new Medidas(128, 128),
                    new Plano(0, 0)
                ),
                animacion: new Animacion(8, 8)
            },
            new Coordenadas(1000, 1000),
            new Direccion("centro", "abajo"),
        );
        this.mapa = mapa;
        this.estado = "caminar";
        this.lineaVision = new Linea(
            new Coordenadas(0, 0),
            new Coordenadas(0, 0),
            this.lienzo,
            false,
            "#333",
            2,
        );
    }

    posicionLineaVision() {
        const alacanceLinea = 120;
        const porcentageCentro = 50;
        const alcanceLineaX = alacanceLinea * this.direccion.xNumero;
        const alcanceLineaY = alacanceLinea * this.direccion.yNumero;
        const porcentajes = new Medidas(
            alcanceLineaX + porcentageCentro,
            alcanceLineaY + porcentageCentro
        );
        this.lineaVision.cambiarPosicion(
            new Coordenadas(
                this.izquierdaSuperior.x + this.medidas.mitad.ancho,
                this.izquierdaSuperior.y + this.medidas.mitad.alto
            ),
            this.izquierdaSuperiorMasPorcentajeMedidas(porcentajes),
        );
    }

    moverOveja() {
        this.posicionLineaVision();
        const moved = this.mover();
        if (moved === false)
            return;

        // const collision = this.map.collisionMap(this, moved);
        // if (collision === true) {
        //     this.randomAddress();
        //     this.timerChangePositionRandomly = 0;
        //     return false;
        // }

        const lineSightCollisionMap = this.mapa.colision(
            this.izquierdaSuperior,
            this.lineaVision.derechaInferior,
        );
        this.izquierdaSuperior.x = lineSightCollisionMap.x;
        this.izquierdaSuperior.y = lineSightCollisionMap.y;
        const aleatorioHorizontal = Math.round(Math.random());
        const aleatorioVertical = Math.round(Math.random());
        this.direccion.x = aleatorioHorizontal === 0 ? "izquierda" : "derecha";
        this.direccion.y = aleatorioVertical === 0 ? "arriba" : "abajo";
        const aleatorioCentro = Math.round(Math.random() * 2);
        if (aleatorioCentro === 0)
            this.direccion.y = "centro";
        else if (aleatorioCentro === 1)
            this.direccion.x = "centro";
    }

    saltar() {
        if (this.estado !== "saltar")
            return;

        const segundosEntreCuadros = this.lienzo.tiempoEntreCuadros / 1000;
        this.tiempoSalto += segundosEntreCuadros;
        const segundos = this.animaciones.animacion.cuadros / this.animaciones.animacion.cuadrosPorSegundo;
        if (this.tiempoSalto < segundos)
            return;

        this.estado = "caminar";
        this.tiempoSalto = 0;
    }

    actualizarEstado() {
        let estado = this.estados[this.estado];
        if (this.animaciones.elemento.indices.vertical === estado.elemento.indices.vertical)
            return;

        this.animaciones.elemento.indices = new Plano(
            estado.elemento.indices.horizontal,
            estado.elemento.indices.vertical
        );
        this.animaciones.animacion.cuadros = estado.animacion.cuadros;
        this.animaciones.animacion.cuadrosPorSegundo = estado.animacion.cuadrosPorSegundo;
    }

    reflejarImagenHorizontal() {
        if (this.direccion.x === "centro")
            return;

        this.animaciones.ruta = `images/resources/sheep/${this.direccion.x}.png`;
    }

    dibujar() {
        this.actualizarEstado();
        this.moverOveja();
        this.saltar();
        this.reflejarImagenHorizontal();
        this.dibujarPersonaje();
        this.lineaVision.dibujarLinea();
    }
}