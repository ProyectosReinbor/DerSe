import { TwoDimensionalMeasurement } from "./twoDimensionalMeasurement";

export class ThreeDimensionalMeasurement extends TwoDimensionalMeasurement {

    depth: number;

    constructor(
        width: number,
        height: number,
        depth: number,
    ) {
        super(width, height);
        this.depth = depth;
    }

    override percentage(numerator: ThreeDimensionalMeasurement) {
        const amount = super.percentage(numerator);
        const aPercent = this.split(100);
        return new ThreeDimensionalMeasurement(
            amount.width,
            amount.height,
            aPercent.depth * numerator.depth,
        );
    }

    override split(divider: number) {
        const quotient = super.split(divider);
        return new ThreeDimensionalMeasurement(
            quotient.width,
            quotient.height,
            this.depth / divider
        );
    }

    override multiply(multiplier: number) {
        const product = super.multiply(multiplier);
        return new ThreeDimensionalMeasurement(
            product.width,
            product.height,
            this.depth * multiplier
        );
    }
}