import React, { useEffect, useState, useRef } from 'react';
import './Algorithm.css';
import { bubbleSort, selectionSort, insertionSort, formatTime } from '../utils';
import Sort from './Sort';
import ToggleSwitch from './ToggleSwitch';
import { IoCloseOutline } from "react-icons/io5";

const Algorithm = ({ algorithmState, updateAlgorithmState }) => {
  const {
    algorithm,
    inputArray,
    sortedArray,
    sortingSteps,
    showAnimation,
    displayAnimation,
    fullAlgorithm,
    inputtedArray,
    displaySteps,
    keyVal,
  } = algorithmState;

  const mouseDownFromPopupRef = useRef(false);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSort();
      }
    };

    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        updateAlgorithmState({ displayAnimation: false });
      }
    };

    const inputArrayElement = document.getElementById('inputArray');
    if (inputArrayElement) {
      inputArrayElement.addEventListener('keypress', handleEnterKeyPress);
    }

    if (displayAnimation) {
      document.addEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      if (inputArrayElement) {
        inputArrayElement.removeEventListener('keypress', handleEnterKeyPress);
      }
      if (displayAnimation) {
        document.removeEventListener('keydown', handleEscapeKeyPress);
      }
    };
  }, [algorithm, inputArray, showAnimation, sortingSteps, displayAnimation]);

  const handleAlgorithmChange = (event) => {
    updateAlgorithmState({ algorithm: event.target.value });
  };

  const handleInputChange = (event) => {
    updateAlgorithmState({ inputArray: event.target.value });
  };

  const handleShowAnimation = (event) => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim()));
    if (algorithm === '' || array.some(isNaN) || !sortingSteps || sortingSteps.length === 0) return;
    let algorithmSelect = document.getElementById('algorithm');
    updateAlgorithmState({
      fullAlgorithm: algorithmSelect.options[algorithmSelect.selectedIndex].textContent,
      inputtedArray: array,
      displayAnimation: true
    });
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
      updateAlgorithmState({
        displayAnimation: true,
        fullAlgorithm: algorithmSelect.options[algorithmSelect.selectedIndex].textContent,
        inputtedArray: inputArray.split(',').map((num) => parseInt(num.trim())),
        keyVal: keyVal + 1
      });
    }

    let steps = [];
    if (algorithm === 'bubble') {
      steps = bubbleSort(array);
    } else if (algorithm === 'selection') {
      steps = selectionSort(array);
    } else if (algorithm === 'insertion') {
      steps = insertionSort(array);
    }

    updateAlgorithmState({
      sortedArray: steps[steps.length - 1],
      sortingSteps: steps
    });
  };

  const handleMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      mouseDownFromPopupRef.current = true;
    }
  };

  const handleMouseUp = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
      if (mouseDownFromPopupRef.current) {
        updateAlgorithmState({ displayAnimation: false });
        mouseDownFromPopupRef.current = false;
      }
    }
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
        />
        <div className="switches">
          <div className="switch-container">
            <span>Show sorting steps</span>
            <ToggleSwitch isChecked={displaySteps} setIsChecked={(value) => updateAlgorithmState({ displaySteps: value })} />
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
        <div
          className='sort-popup-background'
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className='sort-popup-content'>
            <div className="close-button">
              <IoCloseOutline onClick={() => updateAlgorithmState({ displayAnimation: false })} />
            </div>
            <Sort key={keyVal} algorithm={fullAlgorithm} inputArray={inputtedArray} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Algorithm;