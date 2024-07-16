import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import { BubbleSort, InsertionSort, SelectionSort } from '../algorithms';
import { formatTime } from '../utils';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForward, IoRefreshOutline, IoPause, IoShuffleOutline, IoVolumeMediumOutline, IoVolumeMuteOutline, IoWarning } from "react-icons/io5";
import Bar3d from './Bar3d';
import Bar2d from './Bar2d';
import './Sort.css';
import { generateSound } from '../audioUtils';

const ALGORITHMS = {
  'Bubble Sort': BubbleSort,
  'Insertion Sort': InsertionSort,
  'Selection Sort': SelectionSort,
};

const Sort = forwardRef(({ algorithm, inputArray, hideControls, setParentIsRunning, setChildIsDone, ownVolume, ownDelay }, ref) => {
  const [array, setArray] = useState([]);
  const [arraySteps, setArraySteps] = useState([]);
  const [colorKey, setColorKey] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [count, setCount] = useState(25);
  const [delay, setDelay] = useState(ownDelay || 100);
  const [timeouts, setTimeouts] = useState([]);
  const [shouldGenerateSteps, setShouldGenerateSteps] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [forced2d, setForced2d] = useState(false);
  const [dimension, setDimension] = useState('');
  const [maxValue, setMaxValue] = useState(0);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertKey, setAlertKey] = useState(0);
  const [isVolume, setIsVolume] = useState(false);

  const generateSteps = useCallback((newArray, newArraySteps, newColorSteps) => {
    let arrayCopy = newArray.slice();
    let steps = newArraySteps.slice();
    let colorStepsCopy = newColorSteps.slice();

    ALGORITHMS[algorithm](arrayCopy, 0, steps, colorStepsCopy);

    setArraySteps(steps);
    setColorSteps(colorStepsCopy);
  }, [algorithm]);

  useEffect(() => {
    if (ownVolume) {
      setIsVolume(true);
    }
  }, [ownVolume]);

  useEffect(() => {
    if (ownDelay) {
      setDelay(ownDelay);
    }
  }, [ownDelay]);

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

  useEffect(() => {
    let biggest = Math.max(...array);
    setMaxValue(biggest);
    setAlertKey(alertKey + 1);
    if (array && array.length > 15) {
      setForced2d(true);
      setAlertMsg('Forced 2D mode enabled due to large array size');
    } else if (array && biggest > 200) {
      setForced2d(true);
      setAlertMsg('Forced 2D mode enabled due to large array values');
    } else {
      setForced2d(false);
    }
  }, [array, dimension]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (localStorage.getItem('dimension') !== dimension && !forced2d) {
        setDimension(localStorage.getItem('dimension'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    if (localStorage.getItem('dimension')) {
      setDimension(localStorage.getItem('dimension'));
    } else {
      localStorage.setItem('dimension', '3d');
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    setChildIsDone && setChildIsDone(false);
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
            setParentIsRunning && setParentIsRunning(false);
            setChildIsDone && setChildIsDone(true);
            stopTimer();
            isVolume && generateSound(440, 200);
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

  const restart = () => {
    inputArray && inputArray.length > 0 ? generateInputArray() : generateRandomArray();
  };

  let bars;

  if (dimension === '2d' || forced2d) {
    bars = array.map((value, index) => (
      <Bar2d
        key={index}
        index={index}
        value={value}
        color={colorKey[index] || 0}
        barHeight={(value / maxValue) * 100}
        length={array.length}
      />
    ));
  } else if (dimension === '3d') {
    bars = array.map((value, index) => (
      <Bar3d
        key={index}
        index={index}
        length={value}
        color={colorKey[index] || 0}
        changeArray={changeArray}
      />
    ));
  }

  let playButton;

  if (arraySteps.length === currentStep) {
    playButton = (
      <button className='controller' onClick={restart} disabled={isRunning}>
        <IoRefreshOutline /> Restart
      </button>
    );
  } else if (isRunning) {
    playButton = (
      <button className='controller' onClick={pause}>
        <IoPause /> Pause
      </button>
    );
  } else {
    playButton = (
      <button className='controller' onClick={start}>
        <IoPlay /> Play
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

  useImperativeHandle(ref, () => ({
    start,
    pause,
    setDelay,
    restart,
    previousStep,
    nextStep,
  }));

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    inputArray = arr;
    generateInputArray();
  }

  useEffect(() => {
    if (isVolume && currentStep && isRunning) {
      generateSound(600, delay < 100 ? 100 : delay);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!inputArray || inputArray.length === 0) generateRandomArray();
  }, [count]);

  const useDebounce = (callback, delay) => {
    const timerdb = useRef(null);

    const debouncedCallback = useCallback((...args) => {
      if (timerdb.current) {
        clearTimeout(timerdb.current);
      }
      timerdb.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }, [callback, delay]);

    return debouncedCallback;
  };

  const handleCountChange = useDebounce((newCount) => {
    setCount(newCount);
  }, 100);

  return (
    <div className='sort-card'>
      <h4>{algorithm}</h4>

      {forced2d && dimension === '3d' && alertMsg &&
        <div className='sort-alert' key={alertKey}>
          <IoWarning /> {alertMsg}
        </div>
      }

      <div className='sort-card-content'>
        <div className="timer">
          <p>{formatTime(timer)}</p>
        </div>
        <div className='sort-card-frame'>
          <div className='sort-bar-div sort-bar-container sort-bar-card'>{bars}</div>
        </div>
        {
          !hideControls && (
            <div className='sort-card-control-wrapper'>
              <div className='sort-card-controls'>
                <div className='sort-card-controls-buttons'>
                  <button className='controller' onClick={previousStep} disabled={isRunning}>
                    <IoPlaySkipBack /> Previous
                  </button>
                  {playButton}
                  <button className='controller' onClick={nextStep} disabled={isRunning}>
                    <IoPlaySkipForward /> Next
                  </button>
                </div>
              </div>
              <div className='sort-card-controls-buttons sort-card-mid-buttons'>
                <button className="controller shuffle-btn" disabled={isRunning} onClick={() => { inputArray && inputArray.length > 0 ? shuffleArray(array) : restart() }}>
                  <IoShuffleOutline />
                </button>
                <div className="shuffle-tooltip">{inputArray && inputArray.length > 0 ? 'Shuffle Array' : 'Generate new Array'}</div>
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
                  onChange={(e) => setDelay(parseInt(e.target.value))}
                  disabled={isRunning}
                />
                <p>{delay}ms</p>
              </div>

              {(!inputArray || inputArray.length === 0) && (
                <div className="count-control i-control">
                  <p>Array size</p>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    defaultValue={count}
                    onChange={(e) => handleCountChange(parseInt(e.target.value))}
                    disabled={isRunning}
                  />
                  <p>{count}</p>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
});

export default Sort;