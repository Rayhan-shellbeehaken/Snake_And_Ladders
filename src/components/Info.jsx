import React, { useEffect, useState } from 'react'
import Dice from './Dice';
import { HiMiniLockOpen } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';
import {show, hide} from '../features/lock/lockSlice';
import { showButton, hideButton, disableButton } from '../features/button/buttonSlice';
import { changePostion } from '../features/pawn/pawnSlice';

const Info = () => {

  const [targetAttempt, setTargetAttempt] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [skipped, setSkipped] = useState(false);

  const [roll, setRoll] = useState({name : "Roll", status : false});

  const [uthse, setUthse] = useState(false);

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

  const dispatchAll = () => {
    // dispatch(hide())
    // dispatch(hideButton())
    dispatch(disableButton())
  }

  const pawnPostion = (pos1, pos2) => {
    const newPos = pos1 + pos2 + 2;
    dispatch(changePostion(newPos));
  }

  const diceState = () => {
    setDice1({...dice1, isLocked : false});
    setDice2({...dice2, isLocked : false});
    const indexes1 = getRandomNumbers();
    const indexes2 = getRandomNumbers();
    if(!dice1.isLocked) setDice1({...dice1, rollIndexes : indexes1});
    if(!dice2.isLocked) setDice2({...dice2, rollIndexes : indexes2});

    if(!uthse && ((indexes1[3] + 1 === 1) || (indexes2[3] + 1) === 1)) {
      setUthse(true);
      pawnPostion(indexes1[3], indexes2[3]);
    }
    if(uthse){
      pawnPostion(indexes1[3], indexes2[3]);
    }
  }

  const rolling = () => {
    if(!dice1.isLocked || !dice2.isLocked) setAttemptsLeft(attemptsLeft-1);
    roll.name === "Roll" ? setRoll({...roll, name : "Re-roll", status : !roll.status}) : setRoll({...roll, name : "Roll", status : !roll.status});
    dispatchAll();
    diceState();

  }

  const handleSkip = () =>{
    setRoll({...roll, name : "Roll", status : false});
    setSkipped(true);
    dispatch(hide());
    dispatch(hideButton());
  }

  const handleLock = (lock1) =>{
    if(lock1){
      if(dice2.isLocked) setDice2({...dice2, isLocked : false})
      setDice1({...dice1, isLocked : !dice1.isLocked})
    }else{
      if(dice1.isLocked) setDice1({...dice1, isLocked : false});
      setDice2({...dice2, isLocked : !dice2.isLocked})
    }
  }

  const generateRandom = () => {
    const val = Math.floor(Math.random() * (50 - 30 + 1)) + 30;
    return val;
  }

  useEffect(() => {
    const target = generateRandom();
    setTargetAttempt(target);
    setAttemptsLeft(target);
  },[]);


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
        <h2>{currentPosition}</h2>
      </div>

      <div className='dice-container'>
        <div>
          <div>
            <Dice dice = {dice1} skipped = {skipped} setSkipped = {setSkipped}/>
            {locks.visible &&
              <a href='#' onClick={() => handleLock(true)}>
                {dice1.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
          <div>
            <Dice dice = {dice2} skipped = {skipped} setSkipped = {setSkipped}/>
            {locks.visible &&
              <a href='#' onClick={() => handleLock(false)}>
                {dice2.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
        </div>

        <div className='roll-button-container'>
          <a href='#' className={`roll ${disabled ? 'disabled' : ''}`} onClick={rolling}>{roll.name}</a>
          {roll.status && 
            <a href='#' className={`skip ${disabled ? 'disabled' : ''}`} onClick={handleSkip}>Skip</a>
          }
        </div>
        
      </div>
    </div>
  )
}

export default Info