import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

const Heart = ({ startX, startY }: { startX: number; startY: number }) => {
    const [Position, setPosition] = useState({ startX, startY });
    const [style, api] = useSpring(() => ({
        x: Position.startX,
        y: Position.startY,
    }));
    const [counter, setCounter] = useState(0);
    const [drag, setDrag] = useState(false);

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        setDrag(down);
        api.start({
            x: down ? mx + Position.startX : Position.startX,
            y: down ? my + Position.startY : Position.startY,
        });
        if (!down) {
            const X = mx + Position.startX;
            const Y = my + Position.startY;
            setPosition({ startX: X, startY: Y });
        }
    });

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log("hELLO");
    //     }, 100);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <animated.div className="Item" {...bind()} style={style}>
            💖
        </animated.div>
    );
};

export default Heart;
