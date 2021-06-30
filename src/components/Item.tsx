import { animated, useSpring } from "@react-spring/web";
import React, { useContext, useEffect, useState } from "react";
import { useDrag } from "react-use-gesture";
import {
    dragDirection,
    getDragDirectionNeighbour,
    isLeftRight,
    isUpDown,
    reversDirection,
} from "../lib/Item-functions";
import { useRandItem } from "../lib/Item-hooks";
import {
    Direction,
    DragDirectionEvent,
    ItemProps,
    ItemTypes,
} from "../lib/Item-Types";
import { BoardContext } from "./Board";
import { Subject, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

const dragDirectionSubject = new BehaviorSubject<DragDirectionEvent>({
    forItem: -1,
    move: "middle",
});

const Item = ({ index, pos, type }: ItemProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: pos.x, y: pos.y }));
    const [rndType] = useRandItem();
    const [currentDragDirection, setCurrentDragDirection] =
        useState<Direction>("middle");

    const [board, setBoard] = useContext(BoardContext);

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        const direction = dragDirection(mx, my, 16);
        api.start({
            x: down ? (isLeftRight(direction) ? mx + pos.x : pos.x) : pos.x,
            y: down ? (isUpDown(direction) ? my + pos.y : pos.y) : pos.y,
        });

        if (currentDragDirection != direction) {
            setCurrentDragDirection(direction);
            const neighbourIndex = getDragDirectionNeighbour(index, direction);
            if (neighbourIndex != -1) {
                dragDirectionSubject.next({
                    forItem: neighbourIndex,
                    move: reversDirection(direction),
                });
            }
        }

        //When drag right have the right heart animate to the left
    });

    useEffect(() => {
        const sub = dragDirectionSubject
            .pipe(filter((event) => event.forItem === index))
            .subscribe({
                next: (event) => console.log(`Notifying: ${event.forItem}`),
            });
        return () => {
            sub.unsubscribe();
        };
    }, []);

    return (
        <animated.div {...bind()} style={{ x, y }} className="Item">
            {[type]}
        </animated.div>
    );
};

export default Item;
