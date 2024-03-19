export class Address {
    x: 0 | 1 | -1;
    y: 0 | 1 | -1;
    constructor(props: {
        x: 0 | 1 | -1;
        y: 0 | 1 | -1;
    }) {
        this.x = props.x;
        this.y = props.y;
    }

    equals(address: Address) {
        return this.x === address.x &&
            this.y === address.y;
    }
}