import { swap } from './utils';

export const BubbleSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                array = swap(array, j, j + 1);
            }
            arraySteps.push(array.slice());
            colorKey[j] = 1;
            colorKey[j + 1] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[j + 1] = 0;
        }
        colorKey[arraySteps.length - 1 - i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
};

export const InsertionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    let i, j, key;
    for (i = 1; i < array.length; i++) {
        key = array[i];
        j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            arraySteps.push(array.slice());
            colorKey[i] = 3;
            if (i === j + 1) {
                colorKey[j + 1] = 3;
            } else {
                colorKey[j + 1] = 1;
            }
            colorKey[j] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[j + 1] = 0;
            colorKey[i] = 0;
            colorKey[j] = 0;
            j = j - 1
        }
        array[j + 1] = key;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
}

export const SelectionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();
    for (let i = 0; i < array.length - 1; i++) {
        let min_index = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min_index]) {
                min_index = j;
            }
            colorKey[min_index] = 1;
            colorKey[j] = 1;
            arraySteps.push(array.slice());
            colorSteps.push(colorKey.slice());
            colorKey[min_index] = 0;
            colorKey[j] = 0;
        }
        swap(array, min_index, i);
        colorKey[i] = 2;
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    }
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
}
