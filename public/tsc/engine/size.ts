export class Size_ENGINE {

    private width: number;
    private height: number;

    constructor(
        width: number,
        height: number
    ) {
        this.width = width;
        this.height = height;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    setWidth(
        newWidth: number
    ): void {
        this.width = newWidth;
    }

    setHeight(
        newHeight: number
    ): void {
        this.height = newHeight;
    }

    getAPercent(): Size_ENGINE {
        return new Size_ENGINE(
            this.width / 100,
            this.height / 100,
        );
    }

    getPixels(
        percentages: Size_ENGINE
    ): Size_ENGINE {
        const aPercent = this.getAPercent();
        const width = aPercent.width * percentages.width;
        const height = aPercent.height * percentages.height;
        return new Size_ENGINE(
            width,
            height
        );
    }

    getHalf(): Size_ENGINE {
        const width = this.width / 2;
        const height = this.height / 2;
        return new Size_ENGINE(
            width,
            height
        );
    }
}