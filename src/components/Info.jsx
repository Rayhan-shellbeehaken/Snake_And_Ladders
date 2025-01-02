import React, { useEffect, useState } from 'react'
import Dice from './Dice';
import { HiMiniLockOpen } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";

const Info = () => {

  const [targetAttempt, setTargetAttempt] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const [lockVisible, setLockVisible] = useState(false);
  const [dice1, setDice1] = useState({index : 0, isLocked : false, rollIndexes : [0]});
  const [dice2, setDice2] = useState({index : 1, isLocked : false, rollIndexes : [0]});


  const getRandomNumbers = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 4) {
        const num = Math.floor(Math.random() * 6); 
        randomNumbers.add(num);
    }
    return Array.from(randomNumbers);
  }

  const rolling = () => {
    const indexes1 = getRandomNumbers();
    const indexes2 = getRandomNumbers();
    setDice1({...dice1, rollIndexes : indexes1});
    setDice2({...dice2, rollIndexes : indexes2});
  }

  useEffect(() => {
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
            {lockVisible &&
              <a href='#'>
                {dice1.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
          <div>
            <Dice dice = {dice2} />
            {lockVisible &&
              <a href='#'>
                {dice2.isLocked ? <HiMiniLockClosed /> : <HiMiniLockOpen />}
              </a>
            }
          </div>
        </div>

        <div className='roll-button-container'>
          <a href='#' onClick={rolling}>Roll</a>
        </div>
        
      </div>
    </div>
  )
}

export default Info