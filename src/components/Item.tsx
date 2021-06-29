import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'

export type itemProps = {
    id: string
    pos: [x:number,y:number]
    type: '🍬' | '🍪'
}
const Item = (props:itemProps) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0 })
      })
    return (
        <animated.div {...bind()} style={{ x, y }} className="Item">
            {[props.type]} 
        </animated.div>
    )
}

export default Item
