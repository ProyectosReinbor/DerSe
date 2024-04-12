import type { Transform_ENGINE } from "./transform";

type TagObject_ENGINE = false | string;

export class Object_ENGINE {
    protected _transform: Transform_ENGINE;
    public get transform(): Transform_ENGINE {
        return this._transform;
    }

    protected _name: string;
    public get name(): string {
        return this._name;
    }

    protected _active: boolean;
    public get active(): boolean {
        return this._active;
    }

    private _tag: TagObject_ENGINE;
    public get tag(): TagObject_ENGINE {
        return this._tag;
    }

    constructor(
        _transform: Transform_ENGINE,
        _name: string,
        _active: boolean,
        _tag: TagObject_ENGINE
    ) {
        this._transform = _transform;
        this._name = _name;
        this._active = _active;
        this._tag = _tag;
    }
}