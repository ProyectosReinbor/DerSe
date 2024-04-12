export class TouchEvents {
    private _element: HTMLCanvasElement;

    private _touchstart = (event: TouchEvent) => {
        _event.preventDefault();

        for (
            let index = 0;
            index < _event.changedTouches.length;
            index++
        ) {
            const touch = _event.changedTouches.item(index);
            const coordinate = this._touchCoordinate(touch);
            if (coordinate === false)
                continue;

            this._touchstartScene(coordinate);
        }
    };
    private _touchmove = (event: TouchEvent) => { };
    private _touchend = (event: TouchEvent) => { };

    constructor(
        _element: HTMLCanvasElement
    ) {
        this._element = _element;
        this._element.addEventListener(
            "touchstart",
            (event) => this._touchstart(event),
        );
        this._element.addEventListener(
            "touchmove",
            (event) => this._touchmove(event),
        );
        this._element.addEventListener(
            "touchend",
            (event) => this._touchend(event)
        );
    }
}