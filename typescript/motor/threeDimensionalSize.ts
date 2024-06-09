import { TwoDimensionalSize } from "./twoDimensionalSize";

export class ThreeDimensionalSize extends TwoDimensionalSize {

    depth: number;

    constructor(
        width: number,
        height: number,
        depth: number,
    ) {
        super(width, height);
        this.depth = depth;
    }

    override percentage(numerator: ThreeDimensionalSize) {
        const amount = super.percentage(numerator);
        const aPercent = this.split(100);
        return new ThreeDimensionalSize(
            amount.width,
            amount.height,
            aPercent.depth * numerator.depth,
        );
    }

    override split(divider: number) {
        const quotient = super.split(divider);
        return new ThreeDimensionalSize(
            quotient.width,
            quotient.height,
            this.depth / divider
        );
    }

    override multiply(multiplier: number) {
        const product = super.multiply(multiplier);
        return new ThreeDimensionalSize(
            product.width,
            product.height,
            this.depth * multiplier
        );
    }
}