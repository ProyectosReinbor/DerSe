import { Rect } from "./rect";

export class Collider extends Rect {
    collision(collider: Collider) {
        const insideInitial = this.insideCoordinate(collider.initial);
        if (insideInitial === true)
            return true;

        const insideEnd = this.insideCoordinate(collider.end);
        if (insideEnd === true)
            return true;

        return false;
    }

    drawCollider() {
        this.drawRect();
    }
}