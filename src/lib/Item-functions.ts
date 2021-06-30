import { Direction } from "./Item-Types";

export const dragDirection = (
    x: number,
    y: number,
    threshold: number
): Direction => {
    if (y > threshold) {
        return "down";
    } else if (y < -threshold) {
        return "up";
    } else if (x < -threshold) {
        return "left";
    } else if (x > threshold) {
        return "right";
    } else {
        return "middle";
    }
};

export const isLeftRight = (direction: Direction): boolean => {
    return (<Direction[]>["left", "right"]).includes(direction);
};

export const isUpDown = (direction: Direction): boolean => {
    return (<Direction[]>["up", "down"]).includes(direction);
};
