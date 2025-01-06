import React from 'react'
import Board from './components/Board'
import Info from './components/Info'
import Congratulation from './components/Congratulation'

const App = () => {
    return (
      <div className='app-class'>
        <Board/>
        <Info/>
        <Congratulation/>
      </div>
    )
}

export default App