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

export const getDragDirectionNeighbour = (
    dragIndex: number,
    direction: Direction
) => {
    switch (direction) {
        case "down":
            return getItemIndexDown(dragIndex);
        case "up":
            return getItemIndexUp(dragIndex);
        case "left":
            return getItemIndexLeft(dragIndex);
        case "right":
            return getItemIndexRight(dragIndex);
        default:
            return -1;
    }
};

export const reversDirection = (direction: Direction): Direction => {
    switch (direction) {
        case "down":
            return "up";
        case "up":
            return "down";
        case "left":
            return "right";
        case "right":
            return "left";
        default:
            return "middle";
    }
};

export const getItemIndexDown = (currentIndex: number) => {
    const newIndex = currentIndex + 8;
    return newIndex < 64 ? newIndex : -1;
};
export const getItemIndexUp = (currentIndex: number) => {
    const newIndex = currentIndex - 8;
    return newIndex > 0 ? newIndex : -1;
};

export const getItemIndexLeft = (currentIndex: number) => {
    const newIndex = currentIndex - 1;
    return newIndex % 8 != 7 ? newIndex : -1;
};

export const getItemIndexRight = (currentIndex: number) => {
    const newIndex = currentIndex + 1;
    return newIndex % 8 != 0 ? newIndex : -1;
};
