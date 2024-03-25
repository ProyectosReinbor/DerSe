export class CharacterDirection {
    x: 0 | 1 | -1;
    y: 0 | 1 | -1;
    constructor(props: {
        x: 0 | 1 | -1;
        y: 0 | 1 | -1;
    }) {
        this.x = props.x;
        this.y = props.y;
    }

    isEqualTo(direction: CharacterDirection) {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}