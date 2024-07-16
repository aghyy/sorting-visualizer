import React, { useState, useRef, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { bubbleSort, selectionSort, insertionSort, removeStringFromArray } from '../utils';
import './Algorithm.css';

const AlgorithmSelectionCard = ({ updateAlgorithmState, algorithmState }) => {
    const {
        algorithm,
        inputArray,
        sortedArray,
        sortingSteps,
        showAnimation,
        displayAnimation,
        displaySteps,
        keyVal,
    } = algorithmState;

    const [previousArrays, setPreviousArrays] = useState([]);
    const [isInputActive, setIsInputActive] = useState(false);
    const inputArrayElem = useRef(null);
    const [shouldSort, setShouldSort] = useState(false);

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
    }, [algorithm, inputArray, showAnimation, sortingSteps, displayAnimation]);

    useEffect(() => {
        if (shouldSort) {
            handleSort();
            setShouldSort(false);
        }
    }, [shouldSort, algorithm, inputArray]);

    const handleAlgorithmChange = (event) => {
        updateAlgorithmState({ algorithm: event.target.value });
        const array = inputArray.split(',').map((num) => parseInt(num.trim()));
        if (array.some(isNaN) || array.length < 2) return;
        setShouldSort(true);
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
        } else if (array.length < 2) {
            alert('Array must have at least 2 elements.');
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

        inputArrayElem.current.blur();

        const updatedPreviousArrays = [inputArray, ...removeStringFromArray(previousArrays, inputArray)];
        localStorage.setItem('previousArrays', JSON.stringify(updatedPreviousArrays));
        setPreviousArrays(updatedPreviousArrays);
    };

    const handlePreviousArrayClick = (array) => {
        updateAlgorithmState({ inputArray: array });
        if (algorithm) {
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

    return (
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
            <div className="switches">
                <div className="switch-container">
                    <span onClick={() => { updateAlgorithmState({ displaySteps: !algorithmState.displaySteps }) }}>Show sorting steps</span>
                    <ToggleSwitch isChecked={displaySteps} setIsChecked={(value) => updateAlgorithmState({ displaySteps: value })} />
                </div>
            </div>
            <button onClick={handleSort}>Sort</button>
            <button onClick={handleShowAnimation}>Show animation</button>

            {sortedArray && sortedArray.length > 0 && (
                <div>
                    <p>Array length: {sortedArray.length}</p>
                    <p>Sorted Array: {sortedArray.join(', ')}</p>
                </div>
            )}
            {sortingSteps && sortingSteps.length > 0 && <p>Steps needed: {sortingSteps.length}</p>}
        </div>
    );
};

export default AlgorithmSelectionCard;