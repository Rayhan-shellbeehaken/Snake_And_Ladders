import React from 'react'
import './congratulation-module.css'
import { useSelector } from 'react-redux'

const Congratulation = () => {
    const position = useSelector(state => state.pawn.position);
    return (
        <div className={`congratulation ${position === 100 ? '' : 'hide-congo'}`}>
            Congratulation!!!
        </div>
    )
}

export default Congratulation