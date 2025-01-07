import React from 'react'
import './scorebox-module.css'

const ScoreBox = ({title,value}) => {
  return (
    <div className='score-box'>
        <h2>{title}</h2>
        <h2>{value}</h2>
    </div>
  )
}

export default ScoreBox