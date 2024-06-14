import React, { useState } from 'react'
import './App.css'
import NavBar from './assets/components/NavBar'
import Algorithm from './assets/components/Algorithm'
import InsertionSort from './assets/components/InsertionSort'
import SelectionSort from './assets/components/SelectionSort'
import BubbleSort from './assets/components/BubbleSort'

function App() {
  const [selectedOption, setSelectedOption] = useState('Algorithm')

  return (
    <>
      <NavBar setSelectedOption={setSelectedOption} />
      <div className='app-container'>
        {selectedOption === 'Algorithm' && <Algorithm />}
        {selectedOption === 'InsertionSort' && <InsertionSort />}
        {selectedOption === 'SelectionSort' && <SelectionSort />}
        {selectedOption === 'BubbleSort' && <BubbleSort />}
      </div>
    </>
  )
}

export default App