import React, { useEffect, useState } from 'react'
import Snakes from './Snakes';
import Ladders from './Ladders';
import { useSelector } from 'react-redux';
import './board-module.css';

const Board = () => {
    const position = useSelector(state => state.pawn.position);
    const boxes = [];
    let boxNo = 100;
    for(let i=1; i<=10; i++){
        const tempBox = [];
        for(let j=1; j<=10; j++){
            tempBox.push(
                <div key={boxNo} className='box'>
                    {boxNo === position ? (
                        <img src='/assets/pawn.png' className='pawn' alt='Pawn' />
                    ) : (
                        boxNo
                    )}
                </div>
            )
            boxNo--;
        }
        if(i%2 === 0) tempBox.reverse();
        boxes.push(...tempBox);
    }

    return (
        <div className='board-container'>
            <div className='board'>
                <Snakes/>
                <Ladders/>
                {boxes}        
            </div>
        </div>
    )
}

export default Board