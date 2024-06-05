import { CoordenadaTridimensional } from "../motor/coordenadaTridimensional";
import type { EstadoArbol } from "./mapa/arboles";
import type { ColorCastillo, EstadoCastillo } from "./mapa/castillo";
import type { EstadoManchaElevacion } from "./mapa/manchasElevaciones";

type Espuma = {
    arena: boolean;
};

type Elevacion = {
    piso: number;
    sombra: boolean;
    pasto: boolean;
};

type ParedElevacion = {
    sombra: true,
    mancha: EstadoManchaElevacion | false
};

type Escalera = {
    sombra: true,
    mancha: EstadoManchaElevacion | false
};

type Castillo = {
    color: ColorCastillo;
    estado: EstadoCastillo;
};

type Arbol = {
    estado: EstadoArbol;
};

type Casilla = {
    agua: boolean;
    espuma: false | Espuma;
    elevacion: false | Elevacion;
    paredElevacion: false | ParedElevacion;
    escalera: false | Escalera;
    castillo: false | Castillo;
    arbol: false | Arbol;
};

type ObtenerPisoCasillas = (indicesCasilla: CoordenadaTridimensional) => Casilla;

export type MatrizCasillas = Casilla[][][];

export class MatrizMapa {
    static longitudes = new CoordenadaTridimensional(37, 21, 3);

    static obtenerCasillaVacia(): Casilla {
        return {
            agua: false,
            espuma: false,
            elevacion: false,
            paredElevacion: false,
            escalera: false,
            castillo: false,
            arbol: false,
        };
    }

    static obtenerCasillaPiso0(indicesCasilla: CoordenadaTridimensional) {
        const casilla = MatrizMapa.obtenerCasillaVacia();
        casilla.agua = true;
        if (
            indicesCasilla.vertical >= 3 && indicesCasilla.vertical <= 19 &&
            indicesCasilla.horizontal >= 1 && indicesCasilla.horizontal <= 35
        )
            casilla.espuma = {
                arena: true
            };

        if (
            indicesCasilla.vertical === 14 &&
            indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13
        )
            casilla.escalera = {
                sombra: true,
                mancha: (indicesCasilla.horizontal === 11) ? "arena" : false
            };

        return casilla;
    }

    static obtenerCasillaPiso1(indicesCasilla: Plano) {
        const casilla = MatrizMapa.obtenerCasillaVacia();

        if (
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 34 &&
            indicesCasilla.vertical >= 2 && indicesCasilla.vertical <= 13
        )
            casilla.elevacion = {
                piso: 1,
                sombra: indicesCasilla.vertical >= 3,
                pasto: true
            };

        if (
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10 &&
            indicesCasilla.vertical === 14
        )
            casilla.elevacion = {
                piso: 1,
                sombra: true,
                pasto: true
            };

        if (
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34 &&
            indicesCasilla.vertical === 14
        )
            casilla.elevacion = {
                piso: 1,
                sombra: true,
                pasto: true
            };

        if (
            indicesCasilla.vertical === 15 &&
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "arena" : false
            };
        }

        if (
            indicesCasilla.vertical === 15 &&
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "arena" : false
            };
        }

        if (
            indicesCasilla.vertical === 7 &&
            indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13
        ) {
            casilla.escalera = {
                sombra: true,
                mancha: (indicesCasilla.horizontal === 9) ? "pasto" : false
            };
        }

        if (indicesCasilla.vertical === 3 && indicesCasilla.horizontal === 14) {
            casilla.arbol = {
                estado: "derribado"
            }
        }

        return casilla;
    }

    static obtenerCasillaPiso2(indicesCasilla: Plano) {
        const casilla = MatrizMapa.obtenerCasillaVacia();

        if (
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 30 &&
            indicesCasilla.vertical >= 1 && indicesCasilla.vertical <= 6
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: indicesCasilla.vertical >= 3,
                pasto: true
            };
        }
        if (
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10 &&
            indicesCasilla.vertical === 7
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: true,
                pasto: true
            };
        }

        if (
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30 &&
            indicesCasilla.vertical === 7
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: true,
                pasto: true
            };
        }

        if (
            indicesCasilla.vertical === 8 &&
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "pasto" : false
            };
        }

        if (
            indicesCasilla.vertical === 8 &&
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "pasto" : false
            };
        }

        return casilla;
    }

    static obtenerPisosCasillas: ObtenerPisoCasillas[] = [
        MatrizMapa.obtenerCasillaPiso0,
        MatrizMapa.obtenerCasillaPiso1,
        MatrizMapa.obtenerCasillaPiso2,
    ];

    static get obtener() {
        const mapa: MatrizCasillas = [];
        const indicesCasilla = new CoordenadaTridimensional(0, 0, 0);
        for (;
            indicesCasilla.z < MatrizMapa.longitudes.z;
            indicesCasilla.z++
        ) {
            mapa[indicesCasilla.z] = [];
            const mapaZ = mapa[indicesCasilla.z];
            if (mapaZ === undefined)
                continue;


            for (;
                indicesCasilla.y < MatrizMapa.longitudes.y;
                indicesCasilla.y++
            ) {
                mapaZ[indicesCasilla.y] = [];
                const mapaZY = mapaZ[indicesCasilla.y];
                if (mapaZY === undefined)
                    continue;

                for (;
                    indicesCasilla.x < MatrizMapa.longitudes.x;
                    indicesCasilla.x++
                ) {
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