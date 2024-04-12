export class Vector3_ENGINE {

    public x: number;
    public y: number;
    public z: number;

    constructor(
        _x: number,
        _y: number,
        _z: number
    ) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    public isEqualTo(
        transform: Vector3_ENGINE
    ): boolean {
        return this.x === transform.x &&
            this.y === transform.y &&
            this.z === transform.z;
    }
}