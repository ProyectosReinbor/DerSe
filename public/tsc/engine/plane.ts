export class Plane_ENGINE {

    private horizontal: number;
    private vertical: number;

    constructor(
        horizontal: number,
        vertical: number,
    ) {
        this.horizontal = horizontal;
        this.vertical = vertical;
    }

    getHorizontal(): number {
        return this.horizontal;
    }

    getVertical(): number {
        return this.vertical;
    }

    setHorizontal(
        newHorizontal: number
    ): void {
        this.horizontal = newHorizontal;
    }

    setVertical(
        newVertical: number
    ): void {
        this.vertical = newVertical;
    }

    addHorizontal(
        addend: number
    ): void {
        this.horizontal += addend;
    }

    addVertical(
        addend: number
    ): void {
        this.vertical += addend;
    }
}