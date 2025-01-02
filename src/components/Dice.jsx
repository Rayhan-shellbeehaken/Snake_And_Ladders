import React, { useEffect, useState } from 'react'

const Dice = ({dice}) => {
    const dices = ['/assets/dice_1.png', '/assets/dice_2.png', '/assets/dice_3.png', '/assets/dice_4.png', '/assets/dice_5.png', '/assets/dice_6.png'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let pos = 0;
        const interval = setInterval(() => {
            if(pos < dice.rollIndexes.length){
                setIndex(dice.rollIndexes[pos]);
                pos += 1;
            }else clearInterval(interval);
        }, 300);

        return () => clearInterval(interval);
    }, [dice]);

    return (
        <div className='dice-class'>
            <img src={dices[index]}></img>
        </div>
    )
}

export default Dice