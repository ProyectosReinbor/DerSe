import type { Vector3_ENGINE } from "./vector3";

export class Transform_ENGINE {

    public position: Vector3_ENGINE;
    public rotation: Vector3_ENGINE;
    public scale: Vector3_ENGINE;

    constructor(
        _position: Vector3_ENGINE,
        _rotation: Vector3_ENGINE,
        _scale: Vector3_ENGINE,
    ) {
        this.position = _position;
        this.rotation = _rotation;
        this.scale = _scale;
    }
}   