export class TwoDimensionalMeasurement {

    width: number;
    height: number;

    constructor(
        width: number,
        height: number,
    ) {
        this.width = width;
        this.height = height;
    }

    percentage(numerator: TwoDimensionalMeasurement) {
        const aPercent = this.split(100);
        return new TwoDimensionalMeasurement(
            aPercent.width * numerator.width,
            aPercent.height * numerator.height,
        );
    }

    split(divider: number) {
        return new TwoDimensionalMeasurement(
            this.width / divider,
            this.height / divider,
        );
    }

    multiply(multiplier: number) {
        return new TwoDimensionalMeasurement(
            this.width * multiplier,
            this.height * multiplier
        );
    }
}