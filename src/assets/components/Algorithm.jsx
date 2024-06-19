import React, { useEffect, useState, useRef } from 'react';
import './Algorithm.css';
import Sort from './Sort';
import { IoCloseOutline } from "react-icons/io5";
import AlgorithmSelectionCard from './AlgorithmSelectionCard';

const Algorithm = ({ algorithmState, updateAlgorithmState }) => {
  const {
    sortingSteps,
    displayAnimation,
    fullAlgorithm,
    inputtedArray,
    displaySteps,
    keyVal
  } = algorithmState;

  const mouseDownFromPopupRef = useRef(false);

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        updateAlgorithmState({ displayAnimation: false });
      }
    };

    if (displayAnimation) {
      document.addEventListener('keydown', handleEscapeKeyPress);
    }

    return () => {
      if (displayAnimation) {
        document.removeEventListener('keydown', handleEscapeKeyPress);
      }
    };
  }, [displayAnimation]);

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
      <AlgorithmSelectionCard algorithmState={algorithmState} updateAlgorithmState={updateAlgorithmState} />

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