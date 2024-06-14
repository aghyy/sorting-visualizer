import React, { useState } from 'react';
import './NavBar.css';
import logo from '../images/sort.svg';

const NavBar = ({ setSelectedOption }) => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="#" onClick={() => setSelectedOption('Algorithm')}>Algorithm</a>
                </li>
                <li>
                    <a href="#" onClick={() => setSelectedOption('InsertionSort')}>Insertion Sort</a>
                </li>
                <li>
                    <a href="#" onClick={() => setSelectedOption('SelectionSort')}>Selection Sort</a>
                </li>
                <li>
                    <a href="#" onClick={() => setSelectedOption('BubbleSort')}>Bubble Sort</a>
                </li>
            </ul>

            <img src={logo} alt="sort-icon" className='logo' />
        </nav>
    );
};

export default NavBar;