import React from 'react';
import Sort from './Sort';
import './SortContainer.css';

const InsertionSort = () => {
    return (
        <div className='sort-container'>
            <h2>Insertion Sort</h2>
            <Sort algorithm={'Insertion Sort'} />
            <div className='sort-definition'>
                <p>Insertion sort is a fundamental sorting algorithm that efficiently sorts small or nearly sorted datasets. It operates by iteratively inserting each element from an unsorted list into its correct position within a sorted portion of the list. This methodical approach makes insertion sort straightforward and effective for sorting small arrays or arrays with few elements out of order.</p>

                <p><strong>Key Characteristics:</strong></p>
                <ul>
                    <li><strong>Stability:</strong> Insertion sort is stable, meaning it preserves the relative order of equal elements in the sorted output.</li>
                    <li><strong>In-place:</strong> It operates directly on the input array, requiring only a constant amount of additional space for temporary variables.</li>
                </ul>

                <p><strong>Analogy to Playing Cards:</strong><br />
                    Imagine holding a hand of playing cards. You start with one card (the first element) and gradually insert each subsequent card (element) into its correct position among the already sorted cards. This method mimics how insertion sort builds the sorted array step-by-step.</p>

                <p><strong>Insertion Sort Algorithm:</strong></p>
                <p>To implement insertion sort:</p>
                <ol>
                    <li>Begin with the second element of the array, as the first element is inherently sorted.</li>
                    <li>Compare each element with the preceding elements in the sorted section of the array.</li>
                    <li>If an element is smaller, shift the larger elements one position to the right to make space for the current element.</li>
                    <li>Insert the element into its correct position.</li>
                    <li>Repeat until all elements are sorted.</li>
                </ol>

                <p><strong>Example:</strong><br />
                    Consider sorting an array [5, 2, 1, 9, 6] using insertion sort:
                    <ul>
                        <li>Start with [5] (first element is trivially sorted).</li>
                        <li>Insert 2 into its correct position: [2, 5].</li>
                        <li>Insert 1 into its correct position: [1, 2, 5].</li>
                        <li>Insert 9 into its correct position: [1, 2, 5, 9].</li>
                        <li>Insert 6 into its correct position: [1, 2, 5, 6, 9].</li>
                    </ul>
                    Array is now sorted.</p>

                <p>Insertion sort is efficient for small datasets or arrays that are already nearly sorted. While its average and worst-case time complexity is O(n^2), its simplicity and low overhead make it an attractive choice for certain scenarios where other algorithms might be more complex or unnecessary.</p>
            </div>
        </div>
    );
};

export default InsertionSort;


