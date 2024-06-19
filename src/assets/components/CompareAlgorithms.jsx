import React, { useState, useEffect, useRef } from 'react';
import './CompareAlgorithms.css';
import { bubbleSort, selectionSort, insertionSort } from '../utils';
import Sort from './Sort';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoRefreshOutline, IoPause } from "react-icons/io5";

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
    const [delay, setDelay] = useState(500);
    const [child1IsRunning, setChild1IsRunning] = useState(false);
    const [child2IsRunning, setChild2IsRunning] = useState(false);
    const [child1IsDone, setChild1IsDone] = useState(false);
    const [child2IsDone, setChild2IsDone] = useState(false);
    const sortRefs = [useRef(null), useRef(null)];
    const inputArrayElem = useRef(null);

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

    const handleAlgorithmChange = (algorithm, type) => {
        const algorithmSelect = document.getElementById(type);
        const fullAlgorithm = algorithmSelect.options[algorithmSelect.selectedIndex].textContent;
        if (type === 'algorithm1') {
            updateAlgorithmState({ algorithm1: algorithm, fullAlgorithm1: fullAlgorithm });
        } else {
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
        }

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

        const updatedPreviousArrays = [inputArray, ...previousArrays];
        if (!previousArrays.includes(inputArray)) {
            localStorage.setItem('previousArrays', JSON.stringify(updatedPreviousArrays));
            setPreviousArrays(updatedPreviousArrays);
        }
    };

    const handlePreviousArrayClick = (array) => {
        updateAlgorithmState({ inputArray: array });
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

                    <button onClick={handleSort}>Sort</button>
                </div>

                {sortedArray && sortedArray.length > 0 && (
                    <div>
                        <p>Sorted Array: {sortedArray[0].join(', ')}</p>
                    </div>
                )}
            </div>

            {fullAlgorithm1 && fullAlgorithm2 && inputArray && inputArray.length > 0 && sortedArray && sortedArray.length > 0 && (
                <div>
                    <div className='sort-anim-wrapper'>
                        <Sort
                            ref={sortRefs[0]}
                            key={0}
                            algorithm={fullAlgorithm1}
                            inputArray={inputArray.split(',').map((num) => parseInt(num.trim(), 10))}
                            hideControls={true}
                            setParentIsRunning={setChild1IsRunning}
                            setChildIsDone={setChild1IsDone}
                        />
                        <Sort
                            ref={sortRefs[1]}
                            key={1}
                            algorithm={fullAlgorithm2}
                            inputArray={inputArray.split(',').map((num) => parseInt(num.trim(), 10))}
                            hideControls={true}
                            setParentIsRunning={setChild2IsRunning}
                            setChildIsDone={setChild2IsDone}
                        />
                    </div>
                    <div className="delay-control">
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="100"
                            defaultValue={500}
                            onChange={(e) => setDelayForSorts(parseInt(e.target.value))}
                            disabled={child1IsRunning || child2IsRunning}
                        />
                        <p>Delay: {delay}ms</p>
                    </div>
                    <div className="sort-card-controls-buttons">
                        <button className='controller' onClick={previousStep} disabled={child1IsRunning || child2IsRunning || (child1IsDone && child2IsDone)}>
                            <IoPlaySkipBack />
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
                        </button>
                        <button className='controller' onClick={nextStep} disabled={child1IsRunning || child2IsRunning || (child1IsDone && child2IsDone)}>
                            <IoPlaySkipForward />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompareAlgorithms;