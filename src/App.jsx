import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import NavBar from './assets/components/NavBar';
import Algorithm from './assets/components/Algorithm';
import InsertionSort from './assets/components/InsertionSort';
import SelectionSort from './assets/components/SelectionSort';
import BubbleSort from './assets/components/BubbleSort';

function App() {
  const [selectedOption, setSelectedOption] = useState('Algorithm');
  const appContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const appContainer = appContainerRef.current;

      if (selectedOption !== 'InsertionSort' &&
        selectedOption !== 'SelectionSort' &&
        selectedOption !== 'BubbleSort') {

        appContainer.classList.remove('shadow-top');
        appContainer.classList.remove('shadow-bottom');

        return;
      }

      const scrollTop = appContainer.scrollTop;
      const scrollHeight = appContainer.scrollHeight;
      const clientHeight = appContainer.clientHeight;

      if (scrollTop > 0) {
        appContainer.classList.add('shadow-top');
      } else {
        appContainer.classList.remove('shadow-top');
      }

      if (scrollTop + clientHeight < scrollHeight) {
        appContainer.classList.add('shadow-bottom');
      } else {
        appContainer.classList.remove('shadow-bottom');
      }
    };

    const appContainer = appContainerRef.current;
    appContainer.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      appContainer.removeEventListener('scroll', handleScroll);
    };
  }, [selectedOption]);

  return (
    <>
      <NavBar setSelectedOption={setSelectedOption} />

      <div className="app-container" ref={appContainerRef}>
        {selectedOption === 'Algorithm' && <Algorithm />}
        {selectedOption === 'InsertionSort' && <InsertionSort />}
        {selectedOption === 'SelectionSort' && <SelectionSort />}
        {selectedOption === 'BubbleSort' && <BubbleSort />}
      </div>
    </>
  );
}

export default App;