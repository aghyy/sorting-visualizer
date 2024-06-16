import React, { useEffect, useState } from 'react';
import './Algorithm.css';
import { bubbleSort, selectionSort, insertionSort } from '../utils';
import Sort from './Sort';
import ToggleSwitch from './ToggleSwitch';
import { IoCloseOutline } from "react-icons/io5";

const Algorithm = () => {
  const [algorithm, setAlgorithm] = useState('');
  const [inputArray, setInputArray] = useState('');
  const [sortedArray, setSortedArray] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayAnimation, setDisplayAnimation] = useState(false);
  const [fullAlgorithm, setFullAlgorithm] = useState('');
  const [inputtedArray, setInputtedArray] = useState([]);
  const [displaySteps, setDisplaySteps] = useState(false);
  const [keyVal, setKeyVal] = useState(0);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSort();
      }
    };

    const inputArrayElement = document.getElementById('inputArray');
    if (inputArrayElement) {
      inputArrayElement.addEventListener('keypress', handleEnterKeyPress);
    }

    return () => {
      if (inputArrayElement) {
        inputArrayElement.removeEventListener('keypress', handleEnterKeyPress);
      }
    };
  }, [algorithm, inputArray, showAnimation, sortingSteps]);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputArray(event.target.value);
  };

  const handleShowAnimation = (event) => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim()));
    if (algorithm === '' || array.some(isNaN) || !sortingSteps || sortingSteps.length === 0) return;
    let algorithmSelect = document.getElementById('algorithm');
    setFullAlgorithm(algorithmSelect.options[algorithmSelect.selectedIndex].textContent);
    setInputtedArray(array);
    setDisplayAnimation(true);
  };

  const handleSort = () => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim()));

    if (algorithm === '') {
      alert('Please select an algorithm.');
      return;
    } else if (array.some(isNaN)) {
      alert('Invalid input. Please enter a valid array of numbers.');
      return;
    }

    if (showAnimation) {
      let algorithmSelect = document.getElementById('algorithm');
      setDisplayAnimation(true);
      setFullAlgorithm(algorithmSelect.options[algorithmSelect.selectedIndex].textContent);
      setInputtedArray(inputArray.split(',').map((num) => parseInt(num.trim())));
      setKeyVal(keyVal + 1);
    }

    let steps = [];
    if (algorithm === 'bubble') {
      steps = bubbleSort(array);
    } else if (algorithm === 'selection') {
      steps = selectionSort(array);
    } else if (algorithm === 'insertion') {
      steps = insertionSort(array);
    }

    setSortedArray(steps[steps.length - 1]);
    setSortingSteps(steps);
  };

  return (
    <div className="card-wrapper">

      <div className="card">
        <label htmlFor="algorithm">Select sorting algorithm:</label>
        <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange}>
          <option value="" disabled>Select Algorithm</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>
        <label htmlFor="inputArray">Enter Array:</label>
        <input
          type="text"
          id="inputArray"
          value={inputArray}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSort();
            }
          }}
        />
        <div className="switches">
          <div className="switch-container">
            <span>Show sorting steps</span>
            <ToggleSwitch isChecked={displaySteps} setIsChecked={setDisplaySteps} />
          </div>
        </div>
        <button onClick={handleSort}>Sort</button>
        <button onClick={handleShowAnimation}>Show animation</button>
        {sortedArray && sortedArray.length > 0 && (
          <p>Sorted Array: {sortedArray.join(', ')}</p>
        )}
      </div>

      {displaySteps && sortingSteps && sortingSteps.length > 0 && (
        <div className='card sorting-step-card'>
          <h4>Sorting steps:</h4>
          <div className="step-wrapper">
            {sortingSteps.map((step, index) => (
              <p key={index}>Step {index + 1}: {step.join(', ')}</p>
            ))}
          </div>
        </div>
      )}

      {displayAnimation && (
        <div className='sort-popup-background' onClick={(e) => { e.target === e.currentTarget && setDisplayAnimation(false) }} >
          <div className='sort-popup-content'>
            <div className="close-button">
              <IoCloseOutline onClick={() => setDisplayAnimation(false)} />
            </div>
            <Sort key={keyVal} algorithm={fullAlgorithm} inputArray={inputtedArray} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Algorithm;