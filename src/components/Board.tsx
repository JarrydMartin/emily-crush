import React, { createContext, useEffect, useState } from "react";
import Item from "./Item";
import Heart from "./Heart";
import { ItemProps, ItemTypes } from "../lib/Item-Types";
import { useRandItem } from "../lib/Item-hooks";

export const BoardContext = createContext<
    [ItemProps[], React.Dispatch<React.SetStateAction<ItemProps[]>>]
>(null!);

const Board = () => {
    const [board, setBoard] = useState<ItemProps[]>([]);

    const [rndType] = useRandItem();

    const initBoard = () => {
        const newBoard: ItemProps[] = [];

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                newBoard.push({
                    index: y * 8 + x,
                    pos: { x: x * 32, y: y * 32 },
                    type: rndType(),
                });
            }
        }
        setBoard(newBoard);
    };

    useEffect(() => {
        initBoard();
    }, []);

    return (
        <BoardContext.Provider value={[board, setBoard]}>
            <div className="Board">
                {board.map((item) => (
                    <Item {...item} />
                ))}
            </div>
        </BoardContext.Provider>
    );
};

export default Board;
