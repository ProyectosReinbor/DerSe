export class Direction_ENGINE {
    x: 0 | 1 | -1;
    y: 0 | 1 | -1;
    constructor(
        x: 0 | 1 | -1,
        y: 0 | 1 | -1,
    ) {
        this.x = x;
        this.y = y;
    }

    isEqualTo(direction: Direction_ENGINE) {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}