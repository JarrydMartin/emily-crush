import React, {
    createContext,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRandItem } from "../lib/Item-hooks";
import { DragDirectionEvent, ItemProps } from "../lib/Item-Types";
import Item from "./Item";
import { SpringRef } from "@react-spring/web";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

export const BoardContext = createContext<
    [ItemProps[], React.Dispatch<React.SetStateAction<ItemProps[]>>]
>(null!);

const dragDirectionSubject = new BehaviorSubject<DragDirectionEvent>({
    forItem: -1,
    move: "middle",
});

const Board = () => {
    const [board, setBoard] = useState<ItemProps[]>([]);

    const [rndType] = useRandItem();

    const itemsRef = useRef<any>([]);
    // you can access the elements with itemsRef.current[n]

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, board.length);
    }, [board]);

    const initBoard = () => {
        const newBoard: ItemProps[] = [];

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                newBoard.push({
                    index: y * 8 + x,
                    pos: { x: x * 32, y: y * 32 },
                    type: rndType(),
                    dragDirectionSubject,
                });
            }
        }
        setBoard(newBoard);
    };

    useEffect(() => {
        initBoard();
    }, []);

    const handleBoardEvents = (event: DragDirectionEvent) => {
        console.log(event);
    };

    useEffect(() => {
        const sub = dragDirectionSubject.subscribe({
            next: handleBoardEvents,
        });
        return () => {
            sub.unsubscribe();
        };
    }, [board]);

    return (
        <BoardContext.Provider value={[board, setBoard]}>
            <div className="Board">
                {board.map((item) => (
                    <Item
                        key={item.index}
                        ref={(el) => (itemsRef.current[item.index] = el)}
                        {...item}
                    />
                ))}
            </div>
        </BoardContext.Provider>
    );
};

export default Board;
