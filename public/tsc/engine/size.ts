export class Size_ENGINE {

    width: number;
    height: number;

    constructor(
        width: number,
        height: number,
    ) {
        this.width = width;
        this.height = height;
    }

    get aPercent() {
        return new Size_ENGINE(
            this.width / 100,
            this.height / 100,
        );
    }

    getPercentages(
        percentages: Size_ENGINE
    ) {
        return new Size_ENGINE(
            this.aPercent.width * percentages.width,
            this.aPercent.height * percentages.height,
        );
    }
}