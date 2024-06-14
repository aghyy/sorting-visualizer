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