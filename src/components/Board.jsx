import React, { useState } from 'react'

const Board = () => {

    const boxes = [];
    let boxNo = 100;
    for(let i=1; i<=10; i++){
        const tempBox = [];
        for(let j=1; j<=10; j++){
            tempBox.push(
                <div key={boxNo} className='box'>{boxNo}</div>
            )
            boxNo--;
        }
        if(i%2 === 0) tempBox.reverse();
        boxes.push(...tempBox);
    }

    return (
        <div className='board-container'>
            <div className='board'>
                <div className='snake-1'>
                    <img src='/assets/snake_1.png'></img>
                </div>
                <div className='snake-2'>
                    <img src='/assets/snake_2.png'></img>
                </div>
                <div className="snake-3">
                    <img src='/assets/snake_3.png'></img>
                </div>
                <div className='snake-4'>
                    <img src='/assets/snake_4.png'></img>
                </div>
                {boxes}        
            </div>
        </div>
        
    )
}

export default Board