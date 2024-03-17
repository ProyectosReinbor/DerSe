
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

type ElementPlanes = {
    leftUp: Plane;
    up: Plane;
    rightUp: Plane;
    left: Plane;
    center: Plane;
    right: Plane;
    leftDown: Plane;
    down: Plane;
    rightDown: Plane;
    horizontalLeft: Plane;
    horizontalCenter: Plane;
    horizontalRight: Plane;
    verticalUp: Plane;
    verticalCenter: Plane;
    verticalDown: Plane;
    only: Plane;
}

export class Grounds extends ElementBoxes {
    groundsParameters: {
        element: ElementPlanes;
    }
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
        elementPlanes: ElementPlanes
    ) {
        super(
            x, y,
            canvas,
            {
                size: new Size(map.boxes.width, map.boxes.height),
                length: new Plane(1, 1),
                occupiedBoxes: true
            },
            {
                element: {
                    size: new Size(64, 64),
                }
            }
        );
        this.groundsParameters = {
            element: elementPlanes
        };
    }

    setGround(
        boxes: Coordinate,
        route: string
    ) {
        this.setElements(
            boxes,
            route,
            {
                element: {
                    plane: new Plane
                }
            }
        );
        this.refreshElements();
    }

    refreshElements() {
        this.groupElements.forEach(elements => {
            const boxes = this.getBoxesOfCoordinate(elements.initial);
            const element = this.getElementsFactoryOfBoxes(boxes);
            elements.element.horizontal = element.horizontal;
            elements.element.vertical = element.vertical;
        });
    }

    getElementsFactoryOfBoxes(boxes: Coordinate) {
        const leftBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y
        );
        const rightBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y
        );
        const upBoxes = new Coordinate(
            boxes.x,
            boxes.y - 1
        );
        const downBoxes = new Coordinate(
            boxes.x,
            boxes.y + 1
        );

        const left = this.boxIndex(leftBoxes) !== false;
        const right = this.boxIndex(rightBoxes) !== false;
        const up = this.boxIndex(upBoxes) !== false;
        const down = this.boxIndex(downBoxes) !== false;

        const isLeftUp = !up && down && !left && right;
        if (isLeftUp) return this.groundsParameters.element.leftUp;

        const isUp = !up && down && left && right;
        if (isUp) return this.groundsParameters.element.up;

        const isRightUp = !up && down && left && !right;
        if (isRightUp) return this.groundsParameters.element.rightUp;

        const isLeft = up && down && !left && right;
        if (isLeft) return this.groundsParameters.element.left;

        const isCenter = up && down && left && right;
        if (isCenter) return this.groundsParameters.element.center;

        const isRight = up && down && left && !right;
        if (isRight) return this.groundsParameters.element.right;

        const isLeftDown = up && !down && !left && right;
        if (isLeftDown) return this.groundsParameters.element.leftDown;

        const isDown = up && !down && left && right;
        if (isDown) return this.groundsParameters.element.down;

        const isRightDown = up && !down && left && !right;
        if (isRightDown) return this.groundsParameters.element.rightDown;

        const isHorizontalLeft = !up && !down && !left && right;
        if (isHorizontalLeft) return this.groundsParameters.element.horizontalLeft;

        const isHorizontalCenter = !up && !down && left && right;
        if (isHorizontalCenter) return this.groundsParameters.element.horizontalCenter;

        const isHorizontalRight = !up && !down && left && !right;
        if (isHorizontalRight) return this.groundsParameters.element.horizontalRight;

        const isVerticalUp = !up && down && !left && !right;
        if (isVerticalUp) return this.groundsParameters.element.verticalUp;

        const isVerticalCenter = up && down && !left && !right;
        if (isVerticalCenter) return this.groundsParameters.element.verticalCenter;

        const isVerticalDown = up && !down && !left && !right;
        if (isVerticalDown) return this.groundsParameters.element.verticalDown;

        return this.groundsParameters.element.only;
    }

    async drawGrounds() {
        await this.drawElements();
    }
}  