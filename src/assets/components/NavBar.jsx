import React, { useEffect, useState } from 'react';
import './NavBar.css';
import logo from '../images/sort.svg';
import { IoCaretDownOutline } from "react-icons/io5";

const NavBar = ({ setSelectedOption }) => {
    const [showSubMenuOuter, setShowSubMenuOuter] = useState(false);
    const [showSubMenuInner, setShowSubMenuInner] = useState(false);
    let timeoutOuter;
    let timeoutInner;

    const handleMouseLeaveOuter = () => {
        timeoutOuter = setTimeout(() => {
            setShowSubMenuOuter(false);
        }, 300);
    }
    
    const handleMouseLeaveInner = () => {
        timeoutInner = setTimeout(() => {
            setShowSubMenuInner(false);
        }, 300);
    }

    const handleMouseEnterOuter = () => {
        clearTimeout(timeoutOuter);
        setShowSubMenuOuter(true);
    }

    const handleMouseEnterInner = () => {
        clearTimeout(timeoutInner);
        setShowSubMenuInner(true);
    }

    return (
        <nav>
            <img src={logo} alt="sort-icon" className='logo' />

            <ul>
                <li>
                    <a href="#" onClick={() => setSelectedOption('Algorithm')}>Run Algorithm</a>
                </li>
                <li onMouseEnter={handleMouseEnterOuter} onMouseLeave={handleMouseLeaveOuter}>
                    <a className="sort-algorithm-a" href="#">
                        Sort Algorithms
                        <IoCaretDownOutline />
                    </a>
                    {(showSubMenuOuter || showSubMenuInner) && (
                        <ul className='inner-nav-sort' onMouseEnter={handleMouseEnterInner} onMouseLeave={handleMouseLeaveInner}>
                            <li>
                                <div className='inner-nav-a' onClick={() => setSelectedOption('InsertionSort')}>
                                    <p>Insertion Sort</p>
                                    <p className='nav-info-text'>Insertion Sort adds one item at a time to a sorted array. It is inefficient for large lists compared to quicksort, heapsort, or merge sort.</p>
                                </div>
                            </li>
                            <div className="vertical-nav-line"></div>
                            <li>
                                <div className='inner-nav-a' onClick={() => setSelectedOption('SelectionSort')}>
                                    <p>Selection Sort</p>
                                    <p className='nav-info-text'>Selection Sort repeatedly moves the smallest element to the front. It is inefficient for large lists compared to quicksort, heapsort, or merge sort.</p>
                                </div>
                            </li>
                            <div className="vertical-nav-line"></div>
                            <li>
                                <div className='inner-nav-a' onClick={() => setSelectedOption('BubbleSort')}>
                                    <p>Bubble Sort</p>
                                    <p className='nav-info-text'>Bubble Sort repeatedly swaps adjacent out-of-order elements. It is inefficient for large lists compared to quicksort, heapsort, or merge sort.</p>
                                </div>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;