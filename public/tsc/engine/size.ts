export class Size_ENGINE {

    public width: number;
    public height: number;

    constructor(
        _width: number,
        _height: number
    ) {
        this.width = _width;
        this.height = _height;
    }

    private get aPercent(): Size_ENGINE {
        return new Size_ENGINE(
            this.width / 100,
            this.height / 100
        )
    }

    public pixels(
        percentages: Size_ENGINE
    ): Size_ENGINE {
        return new Size_ENGINE(
            this.aPercent.width * percentages.width,
            this.aPercent.height * percentages.height
        );
    }

    public get half(): Size_ENGINE {
        return new Size_ENGINE(
            this.width / 2,
            this.height / 2
        );
    }
}