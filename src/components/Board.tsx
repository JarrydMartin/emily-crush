import React, { createContext, useEffect, useState } from "react";
import Item, { itemProps, itemTypes } from "./Item";

export const BoardContext = createContext<
    [itemProps[], React.Dispatch<React.SetStateAction<itemProps[]>>]
>(null!);

const Board = () => {
    const [board, setBoard] = useState<itemProps[]>([]);

    const initBoard = () => {
        const newBoard: itemProps[] = [];
        const possibleTypes: itemTypes[] = ["❤️", "💙", "💚", "💛", "💜", "🧡"];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                newBoard.push({
                    pos: y * 8 + x,
                    type: possibleTypes[Math.floor(Math.random() * 6)],
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
                    <Item key={item.pos} {...item} />
                ))}
            </div>
        </BoardContext.Provider>
    );
};

export default Board;
