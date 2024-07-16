import React, { useState, useEffect } from 'react';
import Sort from './Sort';
import './SortContainer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { IoCopyOutline, IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { handleCopy } from '../utils';

const SelectionSort = ({ codeStyle }) => {
  const [copied, setCopied] = useState(false);
  const [showSpan, setShowSpan] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    document.querySelector('.sort-container-card-content').scrollIntoView({ behavior: 'smooth' });
  }, [showInfo]);

  return (
    <div className='sort-container'>
      <div className="sort-container-cards selection-sort-ovw">
        <Sort algorithm={'Selection Sort'} key={'selectionsort-1'} />

        <div className="sort-container-vertical">
          <div className='sort-container-card'>
            <h4>Python Code for Selection Sort</h4>
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
              {`def selection_sort(arr):
  n = len(arr)
  for i in range(n):
    min_idx = i
    for j in range(i+1, n):
      if arr[j] < arr[min_idx]:
        min_idx = j
    arr[i], arr[min_idx] = arr[min_idx], arr[i]

arr = [5, 2, 1, 9, 6]
selection_sort(arr)
print(arr)`}
            </SyntaxHighlighter>
          </div>

          <div className="sort-container-card">
            <h4>Time Complexity</h4>
            <div className='sort-container-card-content'>
              <MathJaxContext>
                <div className='time-complexity'>
                  <p>Best-case time complexity: </p>
                  <MathJax>{"\\(O(n^2)\\)"}</MathJax>
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

      <div className='sort-container-card'>
        <div className="collapse-card">
          {showInfo ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
        </div>
        <h4
          style={{ borderBottomLeftRadius: showInfo ? 0 : '10px', borderBottomRightRadius: showInfo ? 0 : '10px' }}
          onClick={() => { setShowInfo(!showInfo) }}
        >
          Information
        </h4>
        {showInfo &&
          <div className="sort-container-card-content">
            <MathJaxContext>
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

              <p className='inline-math'>Selection sort is straightforward to implement and suitable for small datasets or cases where memory is limited. However, its <MathJax>{"\\(O(n^2)\\)"}</MathJax> time complexity makes it inefficient for large arrays compared to more advanced algorithms like quicksort or mergesort.</p>
            </MathJaxContext>
          </div>
        }
      </div>
    </div>
  );
};

export default SelectionSort;