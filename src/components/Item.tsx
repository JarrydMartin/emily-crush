import React, { useContext } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { BoardContext } from './Board'

export type itemProps = {
    pos: number
    type: '🍬' | '🍪'
}
const Item = (props:itemProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const [board, setBoard] = useContext(BoardContext);

    const bind = useDrag(({down, movement: [mx, my] }) => {
        const maxX = mx > 0 ? ( mx < 64 ? mx : 64) : mx > -64 ? mx : -64
        const maxY = my > 0 ? ( my < 64 ? my : 64) : my > -64 ? my : -64
        api.start({ x: down ? maxX : 0 , y: down ? maxY : 0 });
        const threshHold = 32
        
        if(my > threshHold  && props.pos + 8 < 64) {
            if(!down){
                SwapDown()
            }
        } else if(my < -threshHold  && props.pos - 8 > 0) {
            if(!down){
            SwapUp()
            }
        } else if(mx > threshHold  && (props.pos + 1 ) % 8 != 0) {
            if(!down){
                SwapRight()
            }
        }else if(mx < -threshHold  && (props.pos) % 8 != 0) {
            if(!down){
                SwapLeft()
            }
        }

        function SwapDown() {
            swap(8)
        }
        function SwapUp() {
            swap(-8)
        }
        function SwapRight() {
            swap(1)
        }
        function SwapLeft() {
            swap(-1)
        }

        function swap(swap: number) {
            const newBoard: itemProps[] = []
            board.map(item => {
                if (item.pos === props.pos) {
                    newBoard.push({ ...board[props.pos + swap], pos: board[props.pos].pos })
                } else if (item.pos === props.pos + swap) {
                    newBoard.push({ ...board[props.pos], pos: board[props.pos + swap].pos })
                } else {
                    newBoard.push(item)
                }
            })
            setBoard(newBoard)
        }

        
      });

    return (
        <animated.div {...bind()} style={{ x, y }} className="Item">
          {[props.type]} 
        </animated.div>
    )
}

const swapPos = (a:itemProps,b:itemProps) => {
    return [{...a, pos:b.pos},{...b} ]

}

export default Item
