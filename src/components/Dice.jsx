import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {show, hide} from '../features/lock/lockSlice';
import {showButton, hideButton, disableButton, enableButton} from '../features/button/buttonSlice';
import './dice-module.css';

const Dice = ({dice}) => {
    const dices = ['/assets/dice_1.png', '/assets/dice_2.png', '/assets/dice_3.png', '/assets/dice_4.png', '/assets/dice_5.png', '/assets/dice_6.png'];
    const [index, setIndex] = useState(0);

    const dispatch = useDispatch();


   const [roll, setRoll] = useState(true);

    useEffect(() => {
        let pos = 0;
        
        const interval = setInterval(() => {

            if(pos < dice.rollIndexes.length){
                setIndex(dice.rollIndexes[pos]);
                pos += 1;
            }else{
                if(dice.rollIndexes.length == 4){
                    dispatch(enableButton())
                }
                clearInterval(interval);
            }
        }, 300);

        return () => {
            clearInterval(interval);
        }
    }, [dice.rollIndexes]);

    return (
        <div className='dice-class'>
            <img src={dices[index]}></img>
        </div>
    )
}

export default Dice