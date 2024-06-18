import React, { useState, useEffect } from 'react';
import Sort from './Sort';
import './SortContainer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { IoCopyOutline } from "react-icons/io5";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { handleCopy } from '../utils';

const InsertionSort = ({ codeStyle }) => {
  const [copied, setCopied] = useState(false);
  const [showSpan, setShowSpan] = useState(false);

  return (
    <div className='sort-container'>
      <h2>Insertion Sort</h2>
      <Sort algorithm={'Insertion Sort'} />
      <div className="sort-container-cards">
        <div className='sort-container-card'>
          <h4>Overview</h4>
          <div className="sort-container-card-content">
            <MathJaxContext>
              <p>Insertion sort is a fundamental sorting algorithm that efficiently sorts small or nearly sorted datasets. It operates by iteratively inserting each element from an unsorted list into its correct position within a sorted portion of the list. This methodical approach makes insertion sort straightforward and effective for sorting small arrays or arrays with few elements out of order.</p>

              <p><strong>Key Characteristics:</strong></p>
              <ul>
                <li><strong>Stability:</strong> Insertion sort is stable, meaning it preserves the relative order of equal elements in the sorted output.</li>
                <li><strong>In-place:</strong> It operates directly on the input array, requiring only a constant amount of additional space for temporary variables.</li>
              </ul>

              <p><strong>Analogy to Playing Cards:</strong></p>
              <p>Imagine holding a hand of playing cards. You start with one card (the first element) and gradually insert each subsequent card (element) into its correct position among the already sorted cards. This method mimics how insertion sort builds the sorted array step-by-step.</p>

              <p><strong>Insertion Sort Algorithm:</strong></p>
              <p>To implement insertion sort:</p>
              <ol>
                <li>Begin with the second element of the array, as the first element is inherently sorted.</li>
                <li>Compare each element with the preceding elements in the sorted section of the array.</li>
                <li>If an element is smaller, shift the larger elements one position to the right to make space for the current element.</li>
                <li>Insert the element into its correct position.</li>
                <li>Repeat until all elements are sorted.</li>
              </ol>

              <p><strong>Example:</strong></p>
              <p>Consider sorting an array [5, 2, 1, 9, 6] using insertion sort:</p>
              <ul>
                <li>Start with [5] (first element is trivially sorted).</li>
                <li>Insert 2 into its correct position: [2, 5].</li>
                <li>Insert 1 into its correct position: [1, 2, 5].</li>
                <li>Insert 9 into its correct position: [1, 2, 5, 9].</li>
                <li>Insert 6 into its correct position: [1, 2, 5, 6, 9].</li>
              </ul>
              <p>Array is now sorted.</p>

              <p className='inline-math'>Insertion sort is efficient for small datasets or arrays that are already nearly sorted. While its average and worst-case time complexity is <MathJax>{"\\(O(n^2)\\)"}</MathJax>, its simplicity and low overhead make it an attractive choice for certain scenarios where other algorithms might be more complex or unnecessary.</p>
            </MathJaxContext>
          </div>
        </div>

        <div className="sort-container-vertical">
          <div className='sort-container-card'>
            <h4>Python Code for Insertion Sort</h4>
            <div
              className='copy-button'
              onMouseEnter={() => setShowSpan(true)}
              onMouseLeave={() => { setShowSpan(false); setCopied(false); }}>

              <button onClick={() => handleCopy(setCopied, document.querySelector('code.language-python'))}>
                <IoCopyOutline />
              </button>
              {showSpan && <span className='tooltip'>{copied ? 'Copied!' : 'Copy'}</span>}
            </div>
            <SyntaxHighlighter language='python' style={codeStyle}>
              {`def insertion_sort(arr):
  for i in range(1, len(arr)):
      key = arr[i]
      j = i - 1
      while j >= 0 and arr[j] > key:
          arr[j + 1] = arr[j]
          j -= 1
      arr[j + 1] = key

arr = [5, 2, 1, 9, 6]
insertion_sort(arr)
print(arr)`}
            </SyntaxHighlighter>
          </div>

          <div className="sort-container-card">
            <h4>Time Complexity</h4>
            <div className='sort-container-card-content'>
              <MathJaxContext>
                <div className='time-complexity'>
                  <p>Best-case time complexity: </p>
                  <MathJax>{"\\(O(n)\\)"}</MathJax>
                </div>
                <div className='time-complexity'>
                  <p>Average-case time complexity: </p>
                  <MathJax>{"\\(O(n^2)\\)"}</MathJax>
                </div>
                <div className='time-complexity'>
                  <p>Worst-case time complexity: </p>
                  <MathJax>{"\\(O(n^2)\\)"}</MathJax>
                </div>
              </MathJaxContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSort;