import React from 'react'

export type itemProps = {
    id: string
    pos: [x:number,y:number]
}
const Item = (props:itemProps) => {
    return (
        <div className="Item">
            🍬 
        </div>
    )
}

export default Item
