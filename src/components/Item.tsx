import React from 'react'

export type itemProps = {
    id: string
    pos: [x:number,y:number]
    type: '🍬' | '🍪'
}
const Item = (props:itemProps) => {
    return (
        <div className="Item">
            {[props.type]} 
        </div>
    )
}

export default Item
