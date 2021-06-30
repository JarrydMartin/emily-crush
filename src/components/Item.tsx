import React, { useContext } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { BoardContext } from './Board'

export type itemProps = {
    id: number
    pos: {x:number,y:number}
    type: '🍬' | '🍪'
}
const Item = (props:itemProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const [board, setBoard] = useContext(BoardContext);

    const bind = useDrag(({down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0 });
        if(my > 0 && !down) {
            console.log("swap with down");
            const swapItem = {...board[props.id + 8], id:props.id}
            const newBoard:itemProps[]  = []
            board.map(item => {
                if(item.id ===props.id ){
                newBoard.push(swapItem)
                } else if (item.id === props.id + 8) {
                newBoard.push({...props, id:props.id + 8})
                } else {
                newBoard.push(item)
                }   
            });
            setBoard(newBoard);
        }

      });

    return (
        <animated.div {...bind()} style={{ x, y }} className="Item">
            {[props.type]} 
        </animated.div>
    )
}

export default Item
