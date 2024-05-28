import { Coordenadas } from "../motor/coordenadas";
import type { Lienzo } from "../motor/lienzo";
import { Medidas } from "../motor/medidas";
import { Objeto } from "../motor/objeto";
import { Direccion } from "../motor/personaje/direccion";
import { Piso } from "./mapa/piso";
import { MatrizMapa, type MatrizPiso } from "./matrixMapa";

export class Mapa extends Objeto {

    matriz: MatrizPiso[] = MatrizMapa.obtener;
    pisos: Piso[];
    medidasCasilla: Medidas;
    lienzo: Lienzo;

    constructor(lienzo: Lienzo) {
        super(
            new Coordenadas(0, 0),
            new Medidas(100, 100)
        );
        this.lienzo = lienzo;
        this.medidasCasilla = new Medidas(
            0,
            this.medidas.alto / MatrizMapa.longitudes.vertical,
        );
        this.medidasCasilla.ancho = this.lienzo.anchoEnPorcentajeAltura(this.medidasCasilla.alto)
        this.pisos = this.matriz.map(matrizPiso => {
            const piso = new Piso(
                this,
                this.lienzo,
            );
            console.log(matrizPiso);
            piso.agregarPiso(matrizPiso);
            return piso;
        });
    }

    sobrePiso(coordenadas: Coordenadas) {
        for (
            let indicePiso = this.pisos.length - 1;
            indicePiso >= 0;
            indicePiso--
        ) {

            const piso = this.pisos[indicePiso];
            if (piso === undefined)
                continue;

            if (piso.sobrePiso(coordenadas) === false)
                continue;

            return indicePiso;
        }
        return false;
    }

    colision(
        coordenadas: Coordenadas,
        ultimasCoordenadas: Coordenadas,
    ) {
        for (
            let indicePiso = this.pisos.length - 1;
            indicePiso >= 0;
            indicePiso--
        ) {
            const piso = this.pisos[indicePiso];
            if (piso === undefined)
                continue;

            if (piso.sobrePiso(coordenadas) === false)
                continue;

            const colision = piso.colision(coordenadas, ultimasCoordenadas);

            const indiceSiguientePiso = indicePiso + 1;
            const siguientePiso = this.pisos[indiceSiguientePiso];
            if (siguientePiso === undefined)
                return colision;

            const arena = piso.arena.colision(coordenadas) !== false;
            const elevacion = piso.elevaciones.colision(coordenadas) !== false;
            const paredElevacion = piso.paredesElevacion.colision(coordenadas) !== false;
            const escalera = piso.escaleras.colision(coordenadas) !== false;


            const direccion = new Direccion("centro", "centro");
            if (coordenadas.x > ultimasCoordenadas.x)
                direccion.x = "izquierda";
            else if (coordenadas.x < ultimasCoordenadas.x)
                direccion.x = "derecha";

            if (coordenadas.y > ultimasCoordenadas.y)
                direccion.y = "arriba";
            else if (coordenadas.y < ultimasCoordenadas.y)
                direccion.y = "abajo";

            const siguientesCoordenadas = new Coordenadas(coordenadas.x, coordenadas.y);

            const colisionSiguientesCoordenadas = (): boolean => {
                const arenaSiguientePiso = siguientePiso.arena.colision(siguientesCoordenadas) !== false;
                const elevacionSiguientePiso = siguientePiso.elevaciones.colision(siguientesCoordenadas) !== false;
                const paredElevacionSiguientePiso = siguientePiso.paredesElevacion.colision(siguientesCoordenadas) !== false;
                const escaleraSiguientePiso = siguientePiso.escaleras.colision(siguientesCoordenadas) !== false;

                if (arena === true) {
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

                else if (direccion.y === "abajo") {
                    return siguientesCoordenadas.y < ultimasCoordenadas.y;
                }

                return false;
            };

            while (
                horizontalIgual() ||
                verticalIgual()
            ) {
                siguientesCoordenadas.x += this.medidasCasilla.ancho * direccion.xNumero;
                siguientesCoordenadas.y += this.medidasCasilla.alto * direccion.yNumero;
                const colision = colisionSiguientesCoordenadas();
                if (colision === true)
                    return new Coordenadas(
                        siguientesCoordenadas.x,
                        siguientesCoordenadas.y
                    );
            }
        }
        throw new Error("no floors");
    }

    dibujarMapa() {
        this.pisos.forEach(
            piso => piso.dibujarPiso()
        );
    }
}