import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { IoCaretDownOutline, IoInformationCircleOutline } from "react-icons/io5";
import Logo from './Logo';
import ToggleSwitch from './ToggleSwitch';
import { handleAnimatedBg } from '../utils';

const NavBar = ({ setSelectedOption, setBgKey, currentContainer, isBackgroundAnimated, setIsBackgroundAnimated }) => {
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

    const [showSubMenuOuterOptions, setShowSubMenuOuterOptions] = useState(false);
    const [showSubMenuInnerOptions, setShowSubMenuInnerOptions] = useState(false);
    let timeoutOuterOptions;
    let timeoutInnerOptions;

    const handleMouseLeaveOuterOptions = () => {
        timeoutOuterOptions = setTimeout(() => {
            setShowSubMenuOuterOptions(false);
        }, 300);
    }

    const handleMouseLeaveInnerOptions = () => {
        timeoutInnerOptions = setTimeout(() => {
            setShowSubMenuInnerOptions(false);
        }, 300);
    }

    const handleMouseEnterOuterOptions = () => {
        clearTimeout(timeoutOuterOptions);
        setShowSubMenuOuterOptions(true);
    }

    const handleMouseEnterInnerOptions = () => {
        clearTimeout(timeoutInnerOptions);
        setShowSubMenuInnerOptions(true);
    }

    const [isDotted, setIsDotted] = useState(false);

    useEffect(() => {
        if (isDotted) {
            document.body.classList.add('dotted');
            isBackgroundAnimated && handleAnimatedBg(isBackgroundAnimated, setIsBackgroundAnimated, setBgKey, currentContainer);
        } else {
            document.body.classList.remove('dotted');
        }
    }, [isDotted]);

    const [is2D, setIs2D] = useState(localStorage.getItem('dimension') === '3d');

    const handleDimensionChange = () => {
        localStorage.setItem('dimension', is2D ? '2d' : '3d');
        window.dispatchEvent(new Event('storage'));
        setIs2D(!is2D);
    }

    return (
        <nav>
            <Logo />

            <ul>
                <li>
                    <a href="#" onClick={() => setSelectedOption('RunAlgorithm')}>Run Algorithm</a>
                </li>
                <li>
                    <a href="#" onClick={() => setSelectedOption('CompareAlgorithm')}>Compare Algorithms</a>
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
                                    <p className='nav-info-text'>Insertion Sort adds one item at a time to a sorted array.</p>
                                </div>
                            </li>
                            <div className="vertical-nav-line"></div>
                            <li>
                                <div className='inner-nav-a' onClick={() => setSelectedOption('SelectionSort')}>
                                    <p>Selection Sort</p>
                                    <p className='nav-info-text'>Selection Sort repeatedly moves the smallest element to the front.</p>
                                </div>
                            </li>
                            <div className="vertical-nav-line"></div>
                            <li>
                                <div className='inner-nav-a' onClick={() => setSelectedOption('BubbleSort')}>
                                    <p>Bubble Sort</p>
                                    <p className='nav-info-text'>Bubble Sort repeatedly swaps adjacent out-of-order elements.</p>
                                </div>
                            </li>
                        </ul>
                    )}
                </li>
                <li onMouseEnter={handleMouseEnterOuterOptions} onMouseLeave={handleMouseLeaveOuterOptions}>
                    <a className="sort-algorithm-a" href="#">
                        Options
                        <IoCaretDownOutline />
                    </a>
                    {(showSubMenuOuterOptions || showSubMenuInnerOptions) && (
                        <div className='inner-nav-sort nav-options' onMouseEnter={handleMouseEnterInnerOptions} onMouseLeave={handleMouseLeaveInnerOptions}>
                            <div>
                                <p>Animated Background</p>
                                <ToggleSwitch isChecked={isBackgroundAnimated} setIsChecked={() => {
                                    setIsDotted(false);
                                    handleAnimatedBg(isBackgroundAnimated, setIsBackgroundAnimated, setBgKey, currentContainer);
                                }} />
                            </div>
                            <div>
                                <p>Dotted Background</p>
                                <ToggleSwitch isChecked={isDotted} setIsChecked={() => { setIsDotted(!isDotted) }} />
                            </div>
                            <div>
                                <div className='option-text'>
                                    <p>2D/3D</p>
                                    <IoInformationCircleOutline />
                                    <div className='dim-info-tooltip'>
                                        <p>If the array has more than 15 elements or any element exceeds 200, 2D will be enabled automatically.</p>
                                    </div>
                                </div>
                                <ToggleSwitch isChecked={is2D} setIsChecked={handleDimensionChange} />
                            </div>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;