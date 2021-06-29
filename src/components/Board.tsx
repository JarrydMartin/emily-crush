import React, { useEffect, useState } from 'react'
import Item, { itemProps } from './Item';

const Board = () => {
    const [board, setBoard] = useState<itemProps[]>([])

    const initBoard =() => {
        const newBoard: itemProps[] = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                newBoard.push({
                    id: ((y * 8) + x).toString() ,
                    pos: [x, y]
                })
            }
        }
        setBoard(newBoard);
    }

    useEffect(() => {
        initBoard()
    }, [])
    return (
        <div className="Board">
            {board.map(item => <Item key={item.id} {...item} />)}
        </div>
    )
}

export default Board
