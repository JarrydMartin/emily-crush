export type ItemProps = {
    index: number;
    pos: Pos;
    type: ItemTypes;
};
export type Pos = { x: number; y: number };
export type Hearts = "❤️" | "🧡" | "💛" | "💚" | "💙" | "💜";
export type ItemTypes = Hearts | "⚡" | "🔥" | " ";

export type Direction = "up" | "down" | "left" | "right" | "middle";
