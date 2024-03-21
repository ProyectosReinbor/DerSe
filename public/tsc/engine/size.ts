export class Size {
    width: number;
    height: number;
    constructor(props: {
        width: number;
        height: number;
    }) {
        this.width = props.width;
        this.height = props.height;
    }

    get aPercent() {
        return new Size({
            width: this.width / 100,
            height: this.height / 100,
        });
    }

    percentage(percentage: Size) {
        return new Size({
            width: this.aPercent.width * percentage.width,
            height: this.aPercent.height * percentage.height,
        });
    }
}