export class Size_ENGINE {

    public width: number;
    public height: number;
    public length: number;

    constructor(
        _width: number,
        _height: number,
        _length: number
    ) {
        this.width = _width;
        this.height = _height;
        this.length = _length;
    }

    private get _aPercent(): Size_ENGINE {
        return new Size_ENGINE(
            this.width / 100,
            this.height / 100
        )
    }

    public pixels(
        percentages: Size_ENGINE
    ): Size_ENGINE {
        return new Size_ENGINE(
            this._aPercent.width * percentages.width,
            this._aPercent.height * percentages.height
        );
    }

    public get half(): Size_ENGINE {
        return new Size_ENGINE(
            this.width / 2,
            this.height / 2
        );
    }
}