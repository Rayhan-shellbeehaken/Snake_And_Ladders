import React, { useEffect, useState } from 'react'
import Dice from './Dice';
import { HiMiniLockOpen } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";
import { useSelector, useDispatch } from 'react-redux';
import {show, hide} from '../features/lock/lockSlice';
import { hideButton, disableButton } from '../features/button/buttonSlice';
import { changePostion, reducePositiion } from '../features/pawn/pawnSlice';
import {getRandomNumbers, generateRandom} from '../utilities/utility';
import { snakes, ladders } from '../utilities/snake_and_ladder';
import './info-module.css';


const Info = () => {
  const [targetAttempt, setTargetAttempt] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const currentPosition = useSelector(state => state.pawn.position);
  const [roll, setRoll] = useState({name : "Roll", status : false});
  const [uthse, setUthse] = useState(false);
  const [dice1, setDice1] = useState({index : 0, isLocked : false, rollIndexes : [0]});
  const [dice2, setDice2] = useState({index : 1, isLocked : false, rollIndexes : [0]});
  const locks = useSelector(state => state.lock.locks);
  const dispatch = useDispatch();
  const disabled = useSelector(state => state.button.disabled);

  const diceState = () => {
    setDice1({...dice1, isLocked : false});
    setDice2({...dice2, isLocked : false});
    const indexes1 = getRandomNumbers();
    const indexes2 = getRandomNumbers();
    if(!dice1.isLocked) setDice1({...dice1, rollIndexes : indexes1});
    if(!dice2.isLocked) setDice2({...dice2, rollIndexes : indexes2});
  }

  const rolling = () => {
    if((!dice1.isLocked || !dice2.isLocked) && roll.status === false) setAttemptsLeft(attemptsLeft-1);
    roll.name === "Roll" ? setRoll({...roll, name : "Re-roll", status : !roll.status}) : setRoll({...roll, name : "Roll", status : !roll.status});
    roll.name === "Roll" ? dispatch(show()) : dispatch(hide())
    dispatch(disableButton())
    diceState();
  }

  const handleSkip = () =>{
    setRoll({...roll, name : "Roll", status : false});
    setDice1({...dice1, isLocked : false});
    setDice2({...dice2, isLocked : false});
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

  useEffect(() => {
    const target = generateRandom();
    setTargetAttempt(target);
    setAttemptsLeft(target);
  },[]);
  
  useEffect(() => {
    if(dice1.rollIndexes.length !== 0 && dice2.rollIndexes.length !==0){  
      if(!uthse && ((dice1.rollIndexes[3] + 1 === 1) || (dice2.rollIndexes[3] + 1) === 1) && roll.status == false){ 
        setUthse(true);
        firstMove();
      }
      if(uthse && roll.status == false){
        const newPos = dice1.rollIndexes[3] + dice2.rollIndexes[3] + 2;
        let endPos = currentPosition + newPos;
        let flag = false;
        flag = flag || laddersClimbingCheck(endPos);
        flag = flag || snakeBitingCheck(endPos);
        if(!flag) movementAnimation(endPos);
      }
    }
  }, [dice1.rollIndexes, dice2.rollIndexes, roll.status])

  const firstMove = () => {
    if(dice1.rollIndexes[3] + 1 === 1 && dice2.rollIndexes[3] + 1 === ladders[0].start){
      laddersClimbing(ladders[0].start, ladders[0].end, 0);
    }else if(dice2.rollIndexes[3] + 1 === 1 && dice1.rollIndexes[3] + 1 === ladders[0].start){
      laddersClimbing(ladders[0].start, ladders[0].end, 0);
    }else movementAnimation(currentPosition + dice1.rollIndexes[3] + dice2.rollIndexes[3] + 1);
  }

  const laddersClimbingCheck = (endPos) => {
    for(let i = 0; i<ladders.length ; i++){
      if(dice1.rollIndexes[3] + currentPosition + 1 === ladders[i].start){
        laddersClimbing(ladders[i].start, ladders[i].end, dice2.rollIndexes[3]+1);
        return true;
      }
      else if(dice2.rollIndexes[3] + currentPosition + 1 === ladders[i].start){
        laddersClimbing(ladders[i].start, ladders[i].end, dice1.rollIndexes[3]+1);
        return true;
      }else if(endPos === ladders[i].start){
        laddersClimbing(ladders[i].start, ladders[i].end, 0);
        return true;
      }
    }
    return false;
  }

  const snakeBitingCheck = (endPos) => {
    for(let i = 0; i<snakes.length; i++){
      if(dice1.rollIndexes[3] + currentPosition + 1 === snakes[i].start){
        snakeBiting(snakes[i].start, snakes[i].end, dice2.rollIndexes[3]+1);
        return true;
      }
      else if(dice2.rollIndexes[3] + currentPosition + 1 === snakes[i].start){
        snakeBiting(snakes[i].start, snakes[i].end, dice1.rollIndexes[3]+1);
        return true;
      }else if(endPos === snakes[i].start){
        snakeBiting(snakes[i].start, snakes[i].end, 0);
        return true;
      }
    }
    return false;
  }

  const laddersClimbing = (ladderStart, ladderEnd, dicePoint) => {
    movementAnimation(ladderStart, true)
    .then(() => {
      dispatch(changePostion(ladderEnd - ladderStart));
    })
    .then(() => {
      movementAnimation(currentPosition + dicePoint);
    })
    .catch((err) => console.log(err));
  }

  const snakeBiting = (snakeStart, snakeEnd, dicePoint) => {
    movementAnimation(snakeStart)
    .then(() => dispatch(reducePositiion(snakeStart - snakeEnd)))
    .then(() => movementAnimation(currentPosition + dicePoint))
    .catch((err) => console.log(err));
  }


  const movementAnimation = (endPos) => {
    if(endPos >= 100) endPos = currentPosition;
    return new Promise((resolve) => {
      let startPos = currentPosition;
      const interval = setInterval(() => {
        if(startPos < endPos){
          startPos += 1;
          dispatch(changePostion(1));
        }
        else{
          clearInterval(interval);
          resolve();
        }
      },500)
    })
  }

  useEffect(()=>{
    if(currentPosition === 100) dispatch(disableButton());
    console.log("Current Position : "+currentPosition);
  },[currentPosition]);
  
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
            <Dice dice = {dice1}/>
            {locks.visible &&
              <a href='#' onClick={() => handleLock(true)} className={`${disabled ? 'disabled' : ''}`}>
                {dice1.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
          <div>
            <Dice dice = {dice2}/>
            {locks.visible &&
              <a href='#' onClick={() => handleLock(false)} className={`${disabled ? 'disabled' : ''}`}>
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