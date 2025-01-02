import React, { useState } from 'react'

const Board = () => {

    const boxes = [];
    let boxNo = 100;
    for(let i=1; i<=10; i++){
        const tempBox = [];
        for(let j=1; j<=10; j++){
            tempBox.push(
                <div key={boxNo}>{boxNo}</div>
            )
            boxNo--;
        }
        if(i%2 === 0) tempBox.reverse();
        boxes.push(...tempBox);
    }

    return (
        <div className='board-container'>
            <div className='board'>
                {boxes}        
            </div>
        </div>
        
    )
}

export default Board