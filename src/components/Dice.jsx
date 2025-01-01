import React from 'react'

const Dice = () => {
    const dices = ['/assets/dice_1.png', ];
    return (
        <div className='dice-class'>
            <img src={dices[0]}></img>
        </div>
    )
}

export default Dice