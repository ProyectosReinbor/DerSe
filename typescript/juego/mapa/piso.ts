import { Coordenadas } from "../../motor/coordenadas";
import type { Lienzo } from "../../motor/lienzo";
import { Direccion, type DireccionX, type DireccionY } from "../../motor/personaje/direccion";
import { Plano } from "../../motor/plano";
import type { Mapa } from "../mapa";
import type { MatrizPiso } from "../matrixMapa";
import { Agua } from "./agua";
import { Arboles } from "./arboles";
import { Arena } from "./arena";
import { Castillos } from "./castillos";
import { Elevaciones } from "./elevaciones";
import { Escaleras } from "./escaleras";
import { Espumas } from "./espumas";
import { ManchasElevacion } from "./manchasElevaciones";
import { ParedesElevacion } from "./paredElevaciones";
import { Pasto } from "./pasto";
import { Sombras } from "./sombras";

export class Piso {

    mapa: Mapa;
    lienzo: Lienzo;
    agua: Agua;
    espumas: Espumas;
    arena: Arena;
    elevaciones: Elevaciones;
    pasto: Pasto;
    sombras: Sombras;
    paredesElevacion: ParedesElevacion;
    escaleras: Escaleras;
    manchasElevacion: ManchasElevacion;
    castillos: Castillos;
    arboles: Arboles;

    constructor(
        mapa: Mapa,
        lienzo: Lienzo,
    ) {
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

    agregarPiso(matriz: MatrizPiso) {
        matriz.forEach((fila, vertical) => {
            fila.forEach((casilla, horizontal) => {
                const indicesCasilla = new Plano(
                    horizontal,
                    vertical
                );

                if (casilla.agua === true)
                    this.agua.agregarAgua(indicesCasilla);

                if (casilla.espuma !== false) {
                    this.espumas.agregarEspuma(indicesCasilla);
                    if (casilla.espuma.arena === true)
                        this.arena.agregarArena(indicesCasilla);
                }

                if (casilla.elevacion !== false) {
                    if (casilla.elevacion.sombra === true)
                        this.sombras.agregarSombra(indicesCasilla);

                    if (casilla.elevacion.pasto === true)
                        this.pasto.agregarPasto(indicesCasilla);

                    this.elevaciones.agregarElevacion(indicesCasilla);
                }

                if (casilla.paredElevacion !== false) {
                    if (casilla.paredElevacion.sombra === true)
                        this.sombras.agregarSombra(indicesCasilla);

                    this.paredesElevacion.agregarParedElevaciones(indicesCasilla);
                    if (casilla.paredElevacion.mancha !== false)
                        this.manchasElevacion.agregarManchaElevacion(
                            indicesCasilla,
                            casilla.paredElevacion.mancha
                        );
                }

                if (casilla.escalera !== false) {
                    if (casilla.escalera.sombra === true)
                        this.sombras.agregarSombra(indicesCasilla);

                    this.escaleras.agregarEscaleras(indicesCasilla);
                    if (casilla.escalera.mancha !== false)
                        this.manchasElevacion.agregarManchaElevacion(
                            indicesCasilla,
                            casilla.escalera.mancha
                        );
                }

                if (casilla.castillo !== false) {
                    this.castillos.agregarCastillo(
                        indicesCasilla,
                        casilla.castillo.estado,
                        casilla.castillo.color,
                    );
                }

                if (casilla.arbol !== false)
                    this.arboles.agregarArbol(
                        indicesCasilla,
                        casilla.arbol.estado
                    );
            });
        });
    }

    sobrePiso(coordenadas: Coordenadas) {
        const arena = this.arena.colision(coordenadas) !== false;
        const elevaciones = this.elevaciones.colision(coordenadas) !== false;
        const escaleras = this.escaleras.colision(coordenadas) !== false;

        if (arena === true)
            return true;

        if (elevaciones === true)
            return true;

        if (escaleras === true)
            return true;

        return false;
    }

    colision(
        coordenadas: Coordenadas,
        ultimasCoordenadas: Coordenadas,
    ) {
        if (
            coordenadas.x === ultimasCoordenadas.x &&
            coordenadas.y === ultimasCoordenadas.y
        )
            throw new Error("the initial and final coordinates are the same");

        const arenaColision = this.arena.colision(coordenadas);
        const elevacionColision = this.elevaciones.colision(coordenadas);
        const paredElevacionColision = this.paredesElevacion.colision(coordenadas);
        const escalerasColision = this.escaleras.colision(coordenadas);

        let horizontal: DireccionX = "centro";
        if (coordenadas.x > ultimasCoordenadas.x)
            horizontal = "izquierda";
        else if (coordenadas.x < ultimasCoordenadas.x)
            horizontal = "derecha";

        let vertical: DireccionY = "centro";
        if (coordenadas.y > ultimasCoordenadas.y)
            vertical = "arriba";
        else if (coordenadas.y < ultimasCoordenadas.y)
            vertical = "abajo";

        const direccion = new Direccion(horizontal, vertical);

        const siguientesCoordenadas = new Coordenadas(coordenadas.x, coordenadas.y);

        const colisionSiguientesCoordenadas = (): boolean => {
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
        }

        const horizontalIgual = () => {
            if (direccion.x === "izquierda")
                return ultimasCoordenadas.x < siguientesCoordenadas.x;

            if (direccion.x === "derecha")
                return siguientesCoordenadas.x < ultimasCoordenadas.x;

            return false;
        };

        const verticalIgual = () => {
            if (direccion.y === "arriba")
                return ultimasCoordenadas.y < siguientesCoordenadas.y;

            if (direccion.y === "abajo")
                return siguientesCoordenadas.y < ultimasCoordenadas.y;

            return false;
        };

        while (
            horizontalIgual() ||
            verticalIgual()
        ) {
            siguientesCoordenadas.x += this.mapa.medidasCasilla.ancho * direccion.xNumero;
            siguientesCoordenadas.y += this.mapa.medidasCasilla.alto * direccion.yNumero;
            const colision = colisionSiguientesCoordenadas();
            if (colision === true)
                return new Coordenadas(
                    siguientesCoordenadas.x,
                    siguientesCoordenadas.y
                );
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