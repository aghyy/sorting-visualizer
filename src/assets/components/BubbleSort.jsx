import React, { useState, useEffect } from 'react';
import Sort from './Sort';
import './SortContainer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { IoCopyOutline, IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { handleCopy } from '../utils';

const BubbleSort = ({ codeStyle }) => {
  const [copied, setCopied] = useState(false);
  const [showSpan, setShowSpan] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    document.querySelector('.sort-container-card-content').scrollIntoView({ behavior: 'smooth' });
  }, [showInfo]);

  return (
    <div className='sort-container'>
      <div className="sort-container-cards bubble-sort-ovw">
        <Sort algorithm={'Bubble Sort'} key={'bubblesort-1'} />

        <div className="sort-container-vertical">
          <div className='sort-container-card'>
            <h4>Python Code for Bubble Sort</h4>
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
              {`def bubble_sort(arr):
  n = len(arr)
  for i in range(n - 1):
    for j in range(n - i - 1):
      if arr[j] > arr[j + 1]:
        arr[j], arr[j + 1] = arr[j + 1], arr[j]

arr = [5, 2, 1, 9, 6]
bubble_sort(arr)
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
              <p className='inline-math'>Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It is named for the way smaller or larger elements "bubble" to the top of the list. While not efficient on large datasets due to it's <MathJax>{"\\(O(n^2)\\)"}</MathJax> time complexity, bubble sort is easy to understand and implement.</p>

              <p><strong>Key Characteristics:</strong></p>
              <ul>
                <li><strong>Stability:</strong> Bubble sort is stable, meaning it preserves the relative order of equal elements in the sorted output.</li>
                <li><strong>In-place:</strong> It operates directly on the input array, requiring only a constant amount of additional space for temporary variables.</li>
              </ul>

              <p><strong>Analogy to Sorting:</strong></p>
              <p>Imagine sorting a row of people standing in height order. In bubble sort, you start at one end of the row, compare each pair of adjacent people, and swap them if they are out of order. This process is repeated until the entire row is sorted, resembling bubbles rising to the surface.</p>

              <p><strong>Bubble Sort Algorithm:</strong></p>
              <ol>
                <li>Start at the beginning of the array.</li>
                <li>Compare each pair of adjacent elements.</li>
                <li>If they are in the wrong order (larger followed by smaller), swap them.</li>
                <li>Repeat this process for each pair of adjacent elements throughout the array.</li>
                <li>Continue iterating through the array until no more swaps are needed, indicating the array is sorted.</li>
              </ol>

              <p><strong>Example:</strong></p>
              <p>Consider sorting an array [5, 2, 1, 9, 6] using bubble sort:</p>
              <ul>
                <li>First pass: [2, 1, 5, 6, 9] (swaps 5 and 2, 9 and 6).</li>
                <li>Second pass: [1, 2, 5, 6, 9] (no swaps needed).</li>
              </ul>
              <p>Array is now sorted.</p>

              <p>Bubble sort is suitable for educational purposes or sorting small datasets where simplicity is more important than speed. Its inefficiency on larger datasets makes it less practical for real-world applications compared to more advanced algorithms like quicksort or mergesort.</p>
            </MathJaxContext>
          </div>
        }
      </div>
    </div>
  );
};

export default BubbleSort;