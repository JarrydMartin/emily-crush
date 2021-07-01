import { animated, useSpring, SpringRef } from "@react-spring/web";
import React, {
    forwardRef,
    RefObject,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { useDrag } from "react-use-gesture";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import {
    dragDirection,
    getDragDirectionNeighbour,
    isLeftRight,
    isUpDown,
    reversDirection,
} from "../lib/Item-functions";
import { useRandItem } from "../lib/Item-hooks";
import { Direction, DragDirectionEvent, ItemProps } from "../lib/Item-Types";

const Item = forwardRef(
    ({ index, pos, type, dragDirectionSubject }: ItemProps, ref) => {
        const [{ x, y }, api] = useSpring(() => ({ x: pos.x, y: pos.y }));
        useImperativeHandle(ref, () => ({
            api,
        }));
        const [rndType] = useRandItem();
        const [currentDragDirection, setCurrentDragDirection] =
            useState<Direction>("middle");

        const bind = useDrag(({ down, movement: [mx, my] }) => {
            const direction = dragDirection(mx, my, 16);
            api.start({
                x: down ? (isLeftRight(direction) ? mx + pos.x : pos.x) : pos.x,
                y: down ? (isUpDown(direction) ? my + pos.y : pos.y) : pos.y,
            });

            if (currentDragDirection != direction) {
                setCurrentDragDirection(direction);
                const neighbourIndex = getDragDirectionNeighbour(
                    index,
                    direction
                );
                if (neighbourIndex != -1) {
                    dragDirectionSubject.next({
                        forItem: neighbourIndex,
                        move: reversDirection(direction),
                    });
                }
            }
        });

        return (
            <animated.div {...bind()} style={{ x, y }} className="Item">
                {[type]}
            </animated.div>
        );
    }
);

export default Item;
