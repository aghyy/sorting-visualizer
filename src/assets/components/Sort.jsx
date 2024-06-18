import React, { useState, useEffect, useCallback } from 'react';
import { BubbleSort, InsertionSort, SelectionSort } from '../algorithms';
import { formatTime } from '../utils';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoRefreshOutline, IoPause } from "react-icons/io5";
import Bar from './Bar';
import './Sort.css';

const ALGORITHMS = {
    'Bubble Sort': BubbleSort,
    'Insertion Sort': InsertionSort,
    'Selection Sort': SelectionSort,
};

const Sort = ({ algorithm, inputArray }) => {
    const [array, setArray] = useState([]);
    const [arraySteps, setArraySteps] = useState([]);
    const [colorKey, setColorKey] = useState([]);
    const [colorSteps, setColorSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [count, setCount] = useState(10);
    const [delay, setDelay] = useState(500);
    const [timeouts, setTimeouts] = useState([]);
    const [shouldGenerateSteps, setShouldGenerateSteps] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const generateSteps = useCallback((newArray, newArraySteps, newColorSteps) => {
        let arrayCopy = newArray.slice();
        let steps = newArraySteps.slice();
        let colorStepsCopy = newColorSteps.slice();

        ALGORITHMS[algorithm](arrayCopy, 0, steps, colorStepsCopy);

        setArraySteps(steps);
        setColorSteps(colorStepsCopy);
    }, [algorithm]);

    useEffect(() => {
        if (inputArray && inputArray.length > 0) {
            generateInputArray();
        } else {
            generateRandomArray();
        }
    }, []);

    useEffect(() => {
        if (shouldGenerateSteps && array.length > 0) {
            generateSteps(array, arraySteps, colorSteps);
            setShouldGenerateSteps(false);
        }
    }, [array, generateSteps, shouldGenerateSteps]);

    const clearTimeouts = () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
        setTimeouts([]);
    };

    const clearColorKey = () => {
        let blankKey = new Array(count).fill(0);
        setColorKey(blankKey);
        setColorSteps([blankKey]);
    };

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const generateInputArray = () => {
        resetTimer();
        clearTimeouts();
        clearColorKey();
        setArray(inputArray);
        setArraySteps([inputArray]);
        setCurrentStep(0);
        setShouldGenerateSteps(true);
        setCount(inputArray.length);
    }

    const generateRandomArray = () => {
        resetTimer();
        clearTimeouts();
        clearColorKey();
        const temp = [];

        for (let i = 0; i < count; i++) {
            temp.push(generateRandomNumber(50, 200));
        }

        setArray(temp);
        setArraySteps([temp]);
        setCurrentStep(0);
        setShouldGenerateSteps(true);
    };

    const changeArray = (index, value) => {
        let arr = array.slice();
        arr[index] = value;
        setArray(arr);
        setArraySteps([arr]);
        setCurrentStep(0);
        setShouldGenerateSteps(true);
    };

    const previousStep = () => {
        if (currentStep === 0 || isRunning) return;
        setCurrentStep(currentStep - 1);
        setArray(arraySteps[currentStep - 1]);
        setColorKey(colorSteps[currentStep - 1]);
    };

    const nextStep = () => {
        if (currentStep >= arraySteps.length - 1 || isRunning) {
            setColorKey(colorSteps[currentStep]);
            return;
        }

        const nextStepIndex = currentStep + 1;
        setCurrentStep(nextStepIndex);
        setArray(arraySteps[nextStepIndex]);
        setColorKey(colorSteps[nextStepIndex]);
    };

    const start = () => {
        clearTimeouts();
        setIsRunning(true);
        startTimer();

        let timeoutsArray = [];
        for (let i = currentStep; i < arraySteps.length; i++) {
            let timeout = setTimeout(() => {
                setCurrentStep((prev) => {
                    const newStep = prev + 1;
                    if (newStep < arraySteps.length) {
                        setArray(arraySteps[newStep]);
                        setColorKey(colorSteps[newStep]);
                    } else {
                        setIsRunning(false);
                        stopTimer();
                    }
                    return newStep;
                });
            }, delay * (i - currentStep));
            timeoutsArray.push(timeout);
        }

        setTimeouts(timeoutsArray);
    };

    const pause = () => {
        clearTimeouts();
        setIsRunning(false);
        stopTimer();
    };

    let bars = array.map((value, index) => (
        <Bar
            key={index}
            index={index}
            length={value}
            color={colorKey[index] || 0}
            changeArray={changeArray}
        />
    ));

    let playButton;

    if (arraySteps.length === currentStep) {
        playButton = (
            <button className='controller' onClick={() => { inputArray && inputArray.length > 0 ? generateInputArray() : generateRandomArray() }} disabled={isRunning}>
                <IoRefreshOutline />
            </button>
        );
    } else if (isRunning) {
        playButton = (
            <button className='controller' onClick={pause}>
                <IoPause />
            </button>
        );
    } else {
        playButton = (
            <button className='controller' onClick={start}>
                <IoPlay />
            </button>
        );
    }

    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 10);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isTimerRunning]);

    const startTimer = () => {
        setIsTimerRunning(true);
    }

    const stopTimer = () => {
        setIsTimerRunning(false);
    }

    const resetTimer = () => {
        setTimer(0);
    }

    return (
        <div className='sort-card'>
            <div className="timer">
                <p>{formatTime(timer)}</p>
            </div>
            <div className='sort-card-frame'>
                <div className='sort-bar-div sort-bar-container sort-bar-card'>{bars}</div>
            </div>
            <div className='sort-card-controls'>
                <div className='sort-card-controls-buttons'>
                    <button className='controller' onClick={previousStep} disabled={isRunning}>
                        <IoPlaySkipBack />
                    </button>
                    {playButton}
                    <button className='controller' onClick={nextStep} disabled={isRunning}>
                        <IoPlaySkipForward />
                    </button>
                </div>
            </div>
            <div className="delay-control">
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="100"
                    defaultValue={delay}
                    onChange={(e) => setDelay(parseInt(e.target.value))}
                    disabled={isRunning}
                />
                <p>Delay: {delay}ms</p>
            </div>
        </div>
    );
};

export default Sort;