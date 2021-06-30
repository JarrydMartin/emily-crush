import React from "react";
import { ItemTypes } from "./Item-Types";

const useRandItem = () => {
    const possibleTypes: ItemTypes[] = ["❤️", "💙", "💚", "💛", "💜", "🧡"];
    const rndType = () => possibleTypes[Math.floor(Math.random() * 6)];
    return [rndType];
};

export { useRandItem };

// const bind = useDrag(({ down, movement: [mx, my], last }) => {
//     const maxX = mx > 0 ? (mx < 64 ? mx : 64) : mx > -64 ? mx : -64;
//     const maxY = my > 0 ? (my < 64 ? my : 64) : my > -64 ? my : -64;
//     api.start({ x: down ? maxX : 0, y: down ? maxY : 0 });

//     const threshHold = 32;

//     if (my > threshHold && index + 8 < 64) {
//         if (!down) {
//             SwapDown();
//         }
//     } else if (my < -threshHold && index - 8 > 0) {
//         if (!down) {
//             SwapUp();
//         }
//     } else if (mx > threshHold && (index + 1) % 8 !== 0) {
//         if (!down) {
//             SwapRight();
//         }
//     } else if (mx < -threshHold && index % 8 !== 0) {
//         if (!down) {
//             SwapLeft();
//         }
//     }

//     function SwapDown() {
//         swap(8);
//     }
//     function SwapUp() {
//         swap(-8);
//     }
//     function SwapRight() {
//         swap(1);
//     }
//     function SwapLeft() {
//         swap(-1);
//     }

//     function swap(swap: number) {
//         const newBoard: itemProps[] = [];
//         board.forEach((item) => {
//             if (item.pos === props.pos) {
//                 newBoard.push({
//                     ...board[props.pos + swap],
//                     pos: board[props.pos].pos,
//                 });
//             } else if (item.pos === props.pos + swap) {
//                 newBoard.push({
//                     ...board[props.pos],
//                     pos: board[props.pos + swap].pos,
//                 });
//             } else {
//                 newBoard.push(item);
//             }
//         });
//         // setBoard(newBoard);
//         comboMaker(newBoard);
//     }
// });
// const comboMaker = (currentBoard: itemProps[]) => {
//     const newBoard: itemProps[] = currentBoard;
//     var currentType = currentBoard[0].type;
//     var inRow = 0;
//     const counted: number[] = [];
//     for (let index = 0; index < currentBoard.length; index++) {
//         if (!counted.includes(index)) {
//             const currentConnected: number[] = [];
//             const count = countConnected(
//                 index,
//                 currentBoard[index].type,
//                 currentBoard,
//                 currentConnected
//             );

//             if (count > 2) {
//                 currentConnected.forEach((i) => (newBoard[i].type = " "));
//                 newBoard[index].type = "🔥";
//             }
//             currentConnected.forEach((i) => counted.push(i));
//         }
//     }

//     setBoard(newBoard);
// };

// useEffect(() => {
//     const interval = setInterval(() => {
//         console.log("This will run every second!");
//         falling(board);
//     }, 1000);
//     return () => clearInterval(interval);
// }, [board]);

// const falling = (currentBoard: itemProps[]) => {
//     const fallingBoard = currentBoard;

//     for (let index = 0; index < currentBoard.length; index++) {
//         // if (index === 0) {
//         //     if (board[index].type === " ") {
//         //         fallingBoard[index].type = rndType();
//         //         updated = true;
//         //     }
//         // }
//         if (
//             index + 8 < 64 &&
//             currentBoard[index].type !== " " &&
//             currentBoard[index + 8].type === " "
//         ) {
//             console.log(
//                 `${index}: ${currentBoard[index].type} => ${index + 8}:${
//                     currentBoard[index + 8].type
//                 } `
//             );
//             fallingBoard[index].type = " ";
//             fallingBoard[index + 8].type = currentBoard[index].type;
//         }
//     }
//     setBoard(fallingBoard);
// };

// const countConnected = (
//     index: number,
//     type: itemTypes,
//     currentBoard: itemProps[],
//     counted: number[]
// ) => {
//     if (currentBoard[index].type === type) {
//         if (counted.includes(index)) {
//             return 0;
//         }
//         if (!possibleTypes.includes(type)) {
//             return 0;
//         }
//         counted.push(index);
//         var left = 0;
//         var right = 0;
//         var down = 0;
//         var up = 0;
//         if (index % 8 != 0) {
//             left = countConnected(index - 1, type, currentBoard, counted);
//         }
//         if (index % 8 != 7) {
//             right = countConnected(index + 1, type, currentBoard, counted);
//         }
//         if (index + 8 < 64) {
//             down = countConnected(index + 8, type, currentBoard, counted);
//         }
//         if (index - 8 > 0) {
//             up = countConnected(index - 8, type, currentBoard, counted);
//         }
//         return left + right + down + up + 1;
//     } else {
//         return 0;
//     }
// };
