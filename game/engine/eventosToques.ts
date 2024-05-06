import { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";

type ModoToque = "empezar" | "mover" | "terminar" | false;

export class EventosToques {
    lienzo: Lienzo;
    modoToque: ModoToque = false;
    toques: Coordenadas[] = [];
    teclasPresionadas: string[] = [];
    teclasSoltadas: string[] = [];

    coordenadasToque(toque: Touch | null) {
        if (toque === null)
            return false;

        const left = this.lienzo.margen.ancho / 2;
        const top = this.lienzo.margen.alto / 2;
        return new Coordenadas(
            toque.pageX - left,
            toque.pageY - top,
        );
    }

    asignarCoordenadasToque(evento: TouchEvent) {
        this.toques = [];
        for (
            let indice = 0;
            indice < evento.changedTouches.length;
            indice++
        ) {
            const toque = evento.changedTouches.item(indice);
            const coordenadas = this.coordenadasToque(toque);
            if (coordenadas === false)
                continue;

            this.toques[indice] = coordenadas;
        }
    }

    empezarToque(evento: TouchEvent) {
        evento.preventDefault();
        this.modoToque = "empezar";
        this.asignarCoordenadasToque(evento);
    }

    moverToque(evento: TouchEvent) {
        evento.preventDefault();
        this.modoToque = "mover";
        this.asignarCoordenadasToque(evento);
    }

    terminarToque(evento: TouchEvent) {
        evento.preventDefault();
        this.modoToque = "terminar";
        this.asignarCoordenadasToque(evento);
    }


    presionarTecla(evento: KeyboardEvent) {
        if (this.teclasPresionadas.includes(evento.key))
            return;

        this.teclasPresionadas.push(evento.key);
    }

    soltarTecla(evento: KeyboardEvent) {
        this.teclasPresionadas = this.teclasPresionadas.filter(
            tecla => tecla !== evento.key
        );
        if (this.teclasSoltadas.includes(evento.key))
            return;

        this.teclasSoltadas.push(evento.key);
    }

    constructor(lienzo: Lienzo) {
        this.lienzo = lienzo;
        this.lienzo.elemento.addEventListener(
            "touchstart",
            (evento) => this.empezarToque(evento),
        );
        this.lienzo.elemento.addEventListener(
            "touchmove",
            (evento) => this.moverToque(evento),
        );
        this.lienzo.elemento.addEventListener(
            "touchend",
            (evento) => this.terminarToque(evento)
        );

        this.lienzo.elemento.addEventListener(
            "keydown",
            (evento) => this.presionarTecla(evento)
        );
        this.lienzo.elemento.addEventListener(
            "keyup",
            (evento) => this.soltarTecla(evento)
        );
    }

    actualizar() {
        this.modoToque = false;
        this.teclasSoltadas = [];
    }
}