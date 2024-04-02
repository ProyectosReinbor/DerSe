export class Size_ENGINE {

    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    aPercent() {
        return new Size_ENGINE(
            this.width / 100,
            this.height / 100,
        );
    }

    percentage(percentages: Size_ENGINE) {
        const aPercent = this.aPercent();
        const width = aPercent.width * percentages.width;
        const height = aPercent.height * percentages.height;
        return new Size_ENGINE(width, height);
    }

    half() {
        const width = this.width / 2;
        const height = this.height / 2;
        return new Size_ENGINE(width, height);
    }
}