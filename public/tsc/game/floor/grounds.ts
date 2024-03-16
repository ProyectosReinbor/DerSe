
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
    elementPlanes: ElementPlanes;
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
        this.elementPlanes = elementPlanes;
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
                    plane: new Plane(
                        this.elementPlanes.only.horizontal,
                        this.elementPlanes.only.vertical
                    )
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
        if (isLeftUp) return this.elementPlanes.leftUp;

        const isUp = !up && down && left && right;
        if (isUp) return this.elementPlanes.up;

        const isRightUp = !up && down && left && !right;
        if (isRightUp) return this.elementPlanes.rightUp;

        const isLeft = up && down && !left && right;
        if (isLeft) return this.elementPlanes.left;

        const isCenter = up && down && left && right;
        if (isCenter) return this.elementPlanes.center;

        const isRight = up && down && left && !right;
        if (isRight) return this.elementPlanes.right;

        const isLeftDown = up && !down && !left && right;
        if (isLeftDown) return this.elementPlanes.leftDown;

        const isDown = up && !down && left && right;
        if (isDown) return this.elementPlanes.down;

        const isRightDown = up && !down && left && !right;
        if (isRightDown) return this.elementPlanes.rightDown;

        const isHorizontalLeft = !up && !down && !left && right;
        if (isHorizontalLeft) return this.elementPlanes.horizontalLeft;

        const isHorizontalCenter = !up && !down && left && right;
        if (isHorizontalCenter) return this.elementPlanes.horizontalCenter;

        const isHorizontalRight = !up && !down && left && !right;
        if (isHorizontalRight) return this.elementPlanes.horizontalRight;

        const isVerticalUp = !up && down && !left && !right;
        if (isVerticalUp) return this.elementPlanes.verticalUp;

        const isVerticalCenter = up && down && !left && !right;
        if (isVerticalCenter) return this.elementPlanes.verticalCenter;

        const isVerticalDown = up && !down && !left && !right;
        if (isVerticalDown) return this.elementPlanes.verticalDown;

        return this.elementPlanes.only;
    }

    async drawGrounds() {
        await this.drawElements();
    }
}  