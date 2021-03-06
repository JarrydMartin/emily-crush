import { BehaviorSubject } from "rxjs";

export type ItemProps = {
    index: number;
    pos: Pos;
    type: ItemTypes;
    dragDirectionSubject: BehaviorSubject<DragDirectionEvent>;
};
export type Pos = { x: number; y: number };
export type Hearts = "โค๏ธ" | "๐งก" | "๐" | "๐" | "๐" | "๐";
export type ItemTypes = Hearts | "โก" | "๐ฅ" | " ";

export type Direction = "up" | "down" | "left" | "right" | "middle";

export type DragDirectionEvent = {
    forItem: number;
    move: Direction;
};
