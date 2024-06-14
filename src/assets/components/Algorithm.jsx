import React, { useState } from 'react';
import './Algorithm.css';
import { bubbleSort, selectionSort, insertionSort } from '../utils';
import Sort from './Sort';

const Algorithm = () => {
  const [algorithm, setAlgorithm] = useState('');
  const [inputArray, setInputArray] = useState('');
  const [sortedArray, setSortedArray] = useState([]);
  const [sortingSteps, setSortingSteps] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayAnimation, setDisplayAnimation] = useState(false);
  const [fullAlgorithm, setFullAlgorithm] = useState('');
  const [inputtedArray, setInputtedArray] = useState([]);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  }

  const handleInputChange = (event) => {
    setInputArray(event.target.value);
  }

  const handleShowAnimation = (event) => {
    setShowAnimation(event.target.checked);

    const array = inputArray.split(',').map((num) => parseInt(num.trim()));

    if (algorithm === '' || array.some(isNaN) || !sortingSteps || sortingSteps.length === 0) return;
    setDisplayAnimation(event.target.checked);
  }

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
  }

  return (
    <div className="card-wrapper">
      <div className="card">
        <label htmlFor="algorithm">Select sorting algorithm:</label>
        <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange}>
          <option value="" disabled>-- Select Algorithm --</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>
        <label htmlFor="inputArray">Enter array:</label>
        <input type="text" id="inputArray" value={inputArray} onChange={handleInputChange} />
        <div className="checkbox-wrapper">
          <label htmlFor="showAnimation">Show Animation</label>
          <input type="checkbox" id="showAnimation" checked={showAnimation} onChange={handleShowAnimation} />
        </div>
        <button onClick={handleSort}>Sort</button>
        {sortedArray && sortedArray.length > 0 && (
          <p>Sorted Array: {sortedArray.join(', ')}</p>
        )}
      </div>

      {
        sortingSteps && sortingSteps.length > 0 && (
          <div className='card'>
            <h4>Sorting Steps:</h4>

            <div className="step-wrapper">
              {sortingSteps.map((step, index) => (
                <p key={index}>Step {index + 1}: {step.join(', ')}</p>
              ))}
            </div>
          </div>
        )
      }

      {
        displayAnimation && (
          <Sort algorithm={fullAlgorithm} inputArray={inputtedArray} />
        )
      }

    </div>
  );
};

export default Algorithm;