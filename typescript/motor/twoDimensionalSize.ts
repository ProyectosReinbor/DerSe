export class TwoDimensionalSize {

    width: number;
    height: number;

    constructor(
        width: number,
        height: number,
    ) {
        this.width = width;
        this.height = height;
    }

    percentage(numerator: TwoDimensionalSize) {
        const aPercent = this.split(100);
        return new TwoDimensionalSize(
            aPercent.width * numerator.width,
            aPercent.height * numerator.height,
        );
    }

    split(divider: number) {
        return new TwoDimensionalSize(
            this.width / divider,
            this.height / divider,
        );
    }

    multiply(multiplier: number) {
        return new TwoDimensionalSize(
            this.width * multiplier,
            this.height * multiplier
        );
    }
}