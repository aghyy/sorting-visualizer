import React from 'react';
import Sort from './Sort';
import './SortContainer.css';

const SelectionSort = () => {
  return (
    <div className='sort-container'>
      <h2>Selection Sort</h2>
      <Sort algorithm={'Selection Sort'} />
      <div className='sort-definition'>
        <p>Selection sort is a simple comparison-based sorting algorithm. It works by dividing the input list into two parts: the sorted portion at the left end and the unsorted portion at the right end. The algorithm repeatedly selects the smallest (or largest, depending on sorting order) element from the unsorted portion and swaps it with the leftmost unsorted element, expanding the sorted portion of the list one element at a time.</p>

        <p><strong>Key Characteristics:</strong></p>
        <ul>
          <li><strong>Stability:</strong> Selection sort is generally not stable, meaning it may change the relative order of equal elements in the sorted output.</li>
          <li><strong>In-place:</strong> It operates directly on the input array, requiring only a constant amount of additional space for temporary variables.</li>
        </ul>

        <p><strong>Analogy to Sorting:</strong></p>
        <p>Think of selection sort as sorting a deck of cards by repeatedly finding the smallest card from the unsorted portion and swapping it with the leftmost unsorted card. This process gradually builds up the sorted portion of the deck.</p>

        <p><strong>Selection Sort Algorithm:</strong></p>
        <ol>
          <li>Start with the entire array considered unsorted.</li>
          <li>Find the smallest element in the unsorted portion of the array.</li>
          <li>Swap it with the leftmost unsorted element.</li>
          <li>Expand the sorted portion to include this newly swapped element.</li>
          <li>Repeat until the entire array is sorted.</li>
        </ol>

        <p><strong>Example:</strong></p>
        <p>Consider sorting an array [5, 2, 1, 9, 6] using selection sort:</p>
        <ul>
          <li>First pass: [1, 2, 5, 9, 6] (swap 5 and 1).</li>
          <li>Second pass: [1, 2, 5, 9, 6] (no swaps needed).</li>
          <li>Third pass: [1, 2, 5, 6, 9] (swap 9 and 6).</li>
        </ul>
        <p>Array is now sorted.</p>

        <p>Selection sort is straightforward to implement and suitable for small datasets or cases where memory is limited. However, its O(n^2) time complexity makes it inefficient for large arrays compared to more advanced algorithms like quicksort or mergesort.</p>
      </div>
    </div>
  );
};

export default SelectionSort;