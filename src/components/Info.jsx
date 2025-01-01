import React, { useState } from 'react'
import Dice from './Dice';
import { HiMiniLockOpen } from "react-icons/hi2";
import { HiMiniLockClosed } from "react-icons/hi2";

const Info = () => {

  const [targetAttempt, setTargetAttempt] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

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
            <Dice/>
            <a href='#'><HiMiniLockOpen /></a>
            <a href='#'><HiMiniLockClosed /></a>
          </div>
          <div>
            <Dice/>
            <a href='#'><HiMiniLockOpen /></a>
            <a href='#'><HiMiniLockClosed /></a>
          </div>
        </div>

        <div className='roll-button-container'>
          <a href='#'>Roll</a>
        </div>
        
      </div>

    </div>
  )
}

export default Info