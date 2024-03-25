export class Size_ENGINE {

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
        return new Size_ENGINE({
            width: this.width / 100,
            height: this.height / 100,
        });
    }

    getPercentages(props: {
        percentages: Size_ENGINE;
    }) {
        return new Size_ENGINE({
            width: this.aPercent.width * props.percentages.width,
            height: this.aPercent.height * props.percentages.height,
        });
    }
}