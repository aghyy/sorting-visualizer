export const bubbleSort = (array) => {
  let steps = []
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
      steps.push([...array])
    }
  }
  return steps
}

export const selectionSort = (array) => {
  let steps = []
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      steps.push([...array])
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }

    let temp = array[i]
    array[i] = array[minIndex]
    array[minIndex] = temp
    steps.push([...array])
  }
  return steps
}

export const insertionSort = (array) => {
  let steps = []
  for (let i = 1; i < array.length; i++) {
    let key = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j]
      j--
      steps.push([...array])
    }
    array[j + 1] = key
    steps.push([...array])
  }
  return steps
}

export const swap = (array, i, j) => {
  let c = array[i];
  array[i] = array[j];
  array[j] = c;
  return array;
}

export const formatTime = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 6000);
  const seconds = Math.floor((milliseconds % 6000) / 100);
  const remainingMilliseconds = milliseconds % 100;
  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(remainingMilliseconds)}`;
}

const padZero = (number) => {
  return number.toString().padStart(2, '0');
}

export const handleCopy = (setCopied, codeElement) => {
  const code = codeElement.textContent;
  navigator.clipboard.writeText(code);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 2000);
}

const unloadParticles = (particlesContainer, setBgKey) => {
  if (particlesContainer && particlesContainer.particles) {
    particlesContainer.particles.destroy();
    setBgKey(0);
  }
};

export const loadParticles = (setKey) => {
  setKey(prevKey => prevKey + 1);
};

export const handleAnimatedBg = (isChecked, setIsChecked, setBgKey, currentContainer) => {
  if (isChecked) {
    window.localStorage.setItem('animatedBg', 'false');
    document.body.classList.add('body-bg');
    unloadParticles(currentContainer, setBgKey);
  } else {
    window.localStorage.setItem('animatedBg', 'true');
    document.body.classList.remove('body-bg');
    loadParticles(setBgKey);
  }
  setIsChecked(!isChecked);
}

export const removeStringFromArray = (arr, str) => {
  return arr.filter(item => item !== str);
}
