import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import type { PathImage_ENGINE } from "../../engine/image";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type GroundState = "leftUp" | "up" | "rightUp" |
    "left" | "center" | "right" |
    "leftDown" | "down" | "rightDown" |
    "horizontalLeft" | "horizontalCenter" | "horizontalRight" |
    "verticalUp" | "verticalCenter" | "verticalDown" |
    "only";

export type GroundElementIndices = {
    [key in GroundState]: Plane_ENGINE;
};

export class Grounds_ENGINE extends ElementBoxes_ENGINE {

    override references: Elements_ENGINE[] = [];
    elementIndices: GroundElementIndices;

    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
        route: PathImage_ENGINE | false,
        elementIndices: GroundElementIndices,
    ) {
        super(
            map.leftUp.x,
            map.leftUp.y,
            canvas,
            new Size_ENGINE(
                map.boxes.width,
                map.boxes.height
            ),
            new Plane_ENGINE(1, 1),
            true,
            route,
            new Element_ENGINE(
                new Size_ENGINE(64, 64),
                elementIndices.only
            )
        );
        this.elementIndices = elementIndices;
    }

    refreshElements() {
        this.references.forEach(elements => {
            const boxIndices = this.getBoxIndices(elements.leftUp);
            const groundPosition = this.groundPosition(boxIndices);
            const indices = this.elementIndices[groundPosition];
            elements.element.setIndices(
                new Plane_ENGINE(
                    indices.horizontal,
                    indices.vertical
                )
            );
        });
    }

    pushGround(boxIndices: Plane_ENGINE): Elements_ENGINE | undefined {
        const ground = this.referencePush(boxIndices);
        this.refreshElements();
        return ground;
    }

    groundPosition(boxIndices: Plane_ENGINE): GroundState {
        const leftBoxes = new Plane_ENGINE(
            boxIndices.horizontal - 1,
            boxIndices.vertical
        );
        const rightBoxes = new Plane_ENGINE(
            boxIndices.horizontal + 1,
            boxIndices.vertical
        );
        const upBoxes = new Plane_ENGINE(
            boxIndices.horizontal,
            boxIndices.vertical - 1
        );
        const downBoxes = new Plane_ENGINE(
            boxIndices.horizontal,
            boxIndices.vertical + 1
        );
        const left = this.getBox(leftBoxes) !== undefined;
        const right = this.getBox(rightBoxes) !== undefined;
        const up = this.getBox(upBoxes) !== undefined;
        const down = this.getBox(downBoxes) !== undefined;

        const isLeftUp = !up && down && !left && right;
        if (isLeftUp) return "leftUp";

        const isUp = !up && down && left && right;
        if (isUp) return "up";

        const isRightUp = !up && down && left && !right;
        if (isRightUp) return "rightUp";

        const isLeft = up && down && !left && right;
        if (isLeft) return "left";

        const isCenter = up && down && left && right;
        if (isCenter) return "center";

        const isRight = up && down && left && !right;
        if (isRight) return "right";

        const isLeftDown = up && !down && !left && right;
        if (isLeftDown) return "leftDown";

        const isDown = up && !down && left && right;
        if (isDown) return "down";

        const isRightDown = up && !down && left && !right;
        if (isRightDown) return "rightDown";

        const isHorizontalLeft = !up && !down && !left && right;
        if (isHorizontalLeft) return "horizontalLeft";

        const isHorizontalCenter = !up && !down && left && right;
        if (isHorizontalCenter) return "horizontalCenter";

        const isHorizontalRight = !up && !down && left && !right;
        if (isHorizontalRight) return "horizontalRight";

        const isVerticalUp = !up && down && !left && !right;
        if (isVerticalUp) return "verticalUp";

        const isVerticalCenter = up && down && !left && !right;
        if (isVerticalCenter) return "verticalCenter";

        const isVerticalDown = up && !down && !left && !right;
        if (isVerticalDown) return "verticalDown";

        return "only";
    }

    drawGrounds() {
        this.drawElements();
    }
}  