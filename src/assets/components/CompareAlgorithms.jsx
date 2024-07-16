import React, { useState, useEffect, useRef } from 'react';
import './CompareAlgorithms.css';
import { bubbleSort, selectionSort, insertionSort, removeStringFromArray } from '../utils';
import Sort from './Sort';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoRefreshOutline, IoPause, IoShuffleOutline, IoVolumeMediumOutline, IoVolumeMuteOutline } from "react-icons/io5";
import e from 'cors';

const CompareAlgorithms = ({ algorithmState, updateAlgorithmState }) => {
  const {
    algorithm1,
    algorithm2,
    inputArray,
    sortedArray,
    fullAlgorithm1,
    fullAlgorithm2
  } = algorithmState;

  const [previousArrays, setPreviousArrays] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const [delay, setDelay] = useState(100);
  const [child1IsRunning, setChild1IsRunning] = useState(false);
  const [child2IsRunning, setChild2IsRunning] = useState(false);
  const [child1IsDone, setChild1IsDone] = useState(false);
  const [child2IsDone, setChild2IsDone] = useState(false);
  const [shouldSort, setShouldSort] = useState(false);
  const [sortKey, setSortKey] = useState(0);
  const sortRefs = [useRef(null), useRef(null)];
  const inputArrayElem = useRef(null);
  const [dimension, setDimension] = useState(localStorage.getItem('dimension'));
  const [showGraph, setShowGraph] = useState(true);
  const [isVolume, setIsVolume] = useState(false);

  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === 'Enter') {
        setShouldSort(true);
      }
    };

    const inputArrayElement = document.getElementById('inputArray');
    if (inputArrayElement) {
      inputArrayElement.addEventListener('keypress', handleEnterKeyPress);
    }

    const storedArrays = localStorage.getItem('previousArrays');
    if (storedArrays) {
      setPreviousArrays(JSON.parse(storedArrays));
    }

    return () => {
      if (inputArrayElement) {
        inputArrayElement.removeEventListener('keypress', handleEnterKeyPress);
      }
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      setDimension(localStorage.getItem('dimension'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim(), 10));
    if (array.length < 2) {
      setShowGraph(false);
    }
  }, [inputArray]);

  useEffect(() => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim(), 10));
    if (!algorithm1 || !algorithm2 || array.some(isNaN) || array.length < 2) return;
    setShouldSort(true);
  }, [algorithm1, algorithm2]);

  useEffect(() => {
    if (shouldSort) {
      handleSort();
      setShowGraph(true);
      setShouldSort(false);
    }
  }, [shouldSort, algorithm1, algorithm2, inputArray]);

  useEffect(() => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim(), 10));
    if (!algorithm1 || !algorithm2 || array.some(isNaN) || array.length < 2) return;
    if (shouldSort) {
      setSortKey(prevKey => prevKey + 1);
    }
  }, [algorithm1, algorithm2, shouldSort]);

  const handleAlgorithmChange = (algorithm, type) => {
    const algorithmSelect = document.getElementById(type);
    const fullAlgorithm = algorithmSelect.options[algorithmSelect.selectedIndex].textContent;
    if (type === 'algorithm1') {
      updateAlgorithmState({ algorithm1: algorithm, fullAlgorithm1: fullAlgorithm });
    } else if (type === 'algorithm2') {
      updateAlgorithmState({ algorithm2: algorithm, fullAlgorithm2: fullAlgorithm });
    }
  };

  const handleInputChange = (event) => {
    updateAlgorithmState({ inputArray: event.target.value });
  };

  const handleSort = () => {
    const array = inputArray.split(',').map((num) => parseInt(num.trim(), 10));

    if (!algorithm1 || !algorithm2) {
      alert('Please select both algorithms.');
      return;
    } else if (array.some(isNaN)) {
      alert('Invalid input. Please enter a valid array of numbers.');
      return;
    } else if (array.length < 2) {
      alert('Array must have at least 2 elements.');
      return;
    }

    setShouldSort(true);
    const sortAlgorithm = (algorithm, array) => {
      switch (algorithm) {
        case 'bubble':
          return bubbleSort(array);
        case 'selection':
          return selectionSort(array);
        case 'insertion':
          return insertionSort(array);
        default:
          return [];
      }
    };

    const steps1 = sortAlgorithm(algorithm1, [...array]);
    const steps2 = sortAlgorithm(algorithm2, [...array]);

    updateAlgorithmState({
      sortedArray: [steps1[steps1.length - 1], steps2[steps2.length - 1]],
      sortingSteps: [steps1, steps2]
    });

    inputArrayElem.current.blur();

    const updatedPreviousArrays = [inputArray, ...removeStringFromArray(previousArrays, inputArray)];
    localStorage.setItem('previousArrays', JSON.stringify(updatedPreviousArrays));
    setPreviousArrays(updatedPreviousArrays);
  };

  const handlePreviousArrayClick = (array) => {
    updateAlgorithmState({ inputArray: array });
    if (algorithm1 && algorithm2) {
      setShouldSort(true);
    }
  };

  const handleInputFocus = () => {
    setIsInputActive(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputActive(false);
    }, 150);
  };

  const start = () => {
    if (!child1IsRunning && !child1IsDone) {
      sortRefs[0].current.start();
      setChild1IsRunning(true);
    }
    if (!child2IsRunning && !child2IsDone) {
      sortRefs[1].current.start();
      setChild2IsRunning(true);
    }
  };

  const pause = () => {
    if (child1IsRunning) {
      sortRefs[0].current.pause();
      setChild1IsRunning(false);
    }
    if (child2IsRunning) {
      sortRefs[1].current.pause();
      setChild2IsRunning(false);
    }
  };

  const restart = () => {
    sortRefs.forEach(ref => ref.current && ref.current.restart());
    setChild1IsDone(false);
    setChild2IsDone(false);
  };

  const setDelayForSorts = (delay) => {
    sortRefs.forEach(ref => ref.current && ref.current.setDelay(delay));
    setDelay(delay);
  }

  const previousStep = () => {
    if (!child1IsRunning && !child1IsDone) {
      sortRefs[0].current.previousStep();
    }
    if (!child2IsRunning && !child2IsDone) {
      sortRefs[1].current.previousStep();
    }
  }

  const nextStep = () => {
    if (!child1IsRunning && !child1IsDone) {
      sortRefs[0].current.nextStep();
    }
    if (!child2IsRunning && !child2IsDone) {
      sortRefs[1].current.nextStep();
    }
  }

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    updateAlgorithmState({ inputArray: arr.join(', ') });
    setSortKey(prevKey => prevKey + 1);
  }

  return (
    <div className='compare-algorithms-wrapper'>
      <div className="compare-algorithms-card">
        <div className='select-container'>
          <div>
            <label htmlFor="algorithm1">Select first sorting algorithm:</label>
            <select id="algorithm1" value={algorithm1} onChange={(e) => handleAlgorithmChange(e.target.value, 'algorithm1')}>
              <option value="" disabled>Select Algorithm</option>
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
          </div>

          <div>
            <label htmlFor="algorithm2">Select second sorting algorithm:</label>
            <select id="algorithm2" value={algorithm2} onChange={(e) => handleAlgorithmChange(e.target.value, 'algorithm2')}>
              <option value="" disabled>Select Algorithm</option>
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>
          </div>
        </div>

        <label htmlFor="inputArray">Enter Array:</label>

        <div className='input-wrapper'>
          <input
            type="text"
            id="inputArray"
            value={inputArray}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={inputArrayElem}
          />

          {isInputActive && (
            <div className="previous-arrays">
              {previousArrays.map((array, index) => (
                <div key={index} className='previous-array' onClick={() => handlePreviousArrayClick(array)}>
                  {array}
                </div>
              ))}
            </div>
          )}

          <button onClick={() => { setShouldSort(true) }}>Sort</button>
        </div>

        {showGraph && sortedArray && sortedArray.length > 0 && (
          <div>
            <p>Array length: {sortedArray[0].length}</p>
            <p>Sorted Array: {sortedArray[0].join(', ')}</p>
          </div>
        )}
      </div>

      {showGraph && fullAlgorithm1 && fullAlgorithm2 && inputArray && inputArray.length > 0 && sortedArray && sortedArray.length > 0 && (
        <div className='sort-anim-outer-wrapper'>
          <div
            className='sort-anim-wrapper'
            style={{
              flexDirection: dimension === '3d' && inputArray.split(',').map((num) => parseInt(num.trim(), 10)).length < 10 && 'row',
            }}
          >
            <Sort
              ref={sortRefs[0]}
              key={`sort1-${sortKey}`}
              algorithm={fullAlgorithm1}
              inputArray={inputArray.split(',').map((num) => parseInt(num.trim(), 10))}
              hideControls={true}
              setParentIsRunning={setChild1IsRunning}
              setChildIsDone={setChild1IsDone}
              ownVolume={isVolume}
              ownDelay={delay}
            />
            <Sort
              ref={sortRefs[1]}
              key={`sort2-${sortKey}`}
              algorithm={fullAlgorithm2}
              inputArray={inputArray.split(',').map((num) => parseInt(num.trim(), 10))}
              hideControls={true}
              setParentIsRunning={setChild2IsRunning}
              setChildIsDone={setChild2IsDone}
              ownVolume={isVolume}
              ownDelay={delay}
            />
          </div>

          <div className='sort-card-control-wrapper'>
            <div className="sort-card-controls-buttons">
              <button className='controller' onClick={previousStep} disabled={child1IsRunning || child2IsRunning || (child1IsDone && child2IsDone)}>
                <IoPlaySkipBack /> Previous
              </button>
              <button
                className='controller'
                onClick={() => {
                  if (child1IsRunning || child2IsRunning) {
                    pause();
                  } else {
                    child1IsDone && child2IsDone ? restart() : start();
                  }
                }}
              >
                {child1IsRunning || child2IsRunning ? <IoPause /> : ((child1IsDone && child2IsDone) ? <IoRefreshOutline /> : <IoPlay />)}
                {child1IsRunning || child2IsRunning ? 'Pause' : ((child1IsDone && child2IsDone) ? 'Restart' : 'Play')}
              </button>
              <button className='controller' onClick={nextStep} disabled={child1IsRunning || child2IsRunning || (child1IsDone && child2IsDone)}>
                <IoPlaySkipForward /> Next
              </button>
            </div>

            <div className='sort-card-controls-buttons sort-card-mid-buttons'>
              <button className="controller" disabled={child1IsRunning || child2IsRunning} onClick={() => { shuffleArray(inputArray.split(',').map((num) => parseInt(num.trim(), 10))) }}>
                <IoShuffleOutline />
              </button>
              <button className="controller" onClick={() => { setIsVolume(!isVolume) }}>
                {isVolume ? <IoVolumeMediumOutline /> : <IoVolumeMuteOutline />}
              </button>
            </div>

            <div className="delay-control i-control">
              <p>Delay</p>
              <input
                type="range"
                min="5"
                max="1000"
                step="5"
                defaultValue={delay}
                onChange={(e) => setDelayForSorts(parseInt(e.target.value))}
                disabled={child1IsRunning || child2IsRunning}
              />
              <p>{delay}ms</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareAlgorithms;