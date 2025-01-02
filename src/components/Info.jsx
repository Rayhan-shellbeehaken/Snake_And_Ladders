import React, { useEffect, useState } from 'react'
import Dice from './Dice';
import { HiMiniLockOpen } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';
import {show, hide} from '../features/lock/lockSlice';
import { showButton, hideButton, disableButton } from '../features/button/buttonSlice';

const Info = () => {

  const [targetAttempt, setTargetAttempt] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);

  const [dice1, setDice1] = useState({index : 0, isLocked : false, rollIndexes : [0]});
  const [dice2, setDice2] = useState({index : 1, isLocked : false, rollIndexes : [0]});

  const locks = useSelector(state => state.lock.locks);
  const dispatch = useDispatch();

  const buttons = useSelector(state => state.button);

  const disabled = useSelector(state => state.button.disabled);

  const getRandomNumbers = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 4) {
        const num = Math.floor(Math.random() * 6); 
        randomNumbers.add(num);
    }
    return Array.from(randomNumbers);
  }

  const rolling = () => {
    dispatch(hide())
    dispatch(hideButton())
    dispatch(disableButton())
    setDice1({...dice1, isLocked : false});
    setDice2({...dice2, isLocked : false});
    const indexes1 = getRandomNumbers();
    const indexes2 = getRandomNumbers();
    if(!dice1.isLocked)
      setDice1({...dice1, rollIndexes : indexes1});
    if(!dice2.isLocked)
      setDice2({...dice2, rollIndexes : indexes2});
  }

  const handleSkip = () =>{
    dispatch(hide());
    dispatch(hideButton());
  }

  useEffect(() => {
    console.log(locks.visible)
    console.log(buttons)
    console.log("Dice 1 : " + dice1.rollIndexes);
    console.log("Dice 2 : " + dice2.rollIndexes);
  },[dice1, dice2])


  return (
    <div className='info'>
      <div>
        <h2>Target Attempt</h2>
        <h2>{targetAttempt}</h2>
      </div>

      <div>
        <h2>Attempts left</h2>
        <h2>{attemptsLeft}</h2>
      </div>

      <div>
        <h2>Current Position</h2>
        <h2>{attemptsLeft}</h2>
      </div>

      <div className='dice-container'>
        <div>
          <div>
            <Dice dice = {dice1}/>
            {locks.visible &&
              <a href='#' onClick={() => setDice1({...dice1, isLocked : !dice1.isLocked})}>
                {dice1.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
          <div>
            <Dice dice = {dice2}/>
            {locks.visible &&
              <a href='#' onClick={() => setDice2({...dice2, isLocked : !dice2.isLocked})}>
                {dice2.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
        </div>

        <div className='roll-button-container'>
          <a href='#' className={`roll ${disabled ? 'disabled' : ''}`} onClick={rolling}>{buttons.roll.name}</a>
          {buttons.skip.visible && 
            <a href='#' className='skip' onClick={handleSkip}>Skip</a>
          }
          
        </div>
        
      </div>
    </div>
  )
}

export default Info