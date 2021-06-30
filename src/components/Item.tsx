import { animated, useSpring } from "@react-spring/web";
import React, { useContext, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { dragDirection, isLeftRight, isUpDown } from "../lib/Item-functions";
import { useRandItem } from "../lib/Item-hooks";
import { ItemProps, ItemTypes } from "../lib/Item-Types";
import { BoardContext } from "./Board";

const Item = ({ index, pos, type }: ItemProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: pos.x, y: pos.y }));
    const [rndType] = useRandItem();

    const [board, setBoard] = useContext(BoardContext);

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        const direction = dragDirection(mx, my, 16);
        api.start({
            x: down ? (isLeftRight(direction) ? mx + pos.x : pos.x) : pos.x,
            y: down ? (isUpDown(direction) ? my + pos.y : pos.y) : pos.y,
        });
    });

    return (
        <animated.div {...bind()} style={{ x, y }} className="Item">
            {[type]}
        </animated.div>
    );
};

export default Item;
