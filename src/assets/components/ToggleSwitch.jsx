import React, { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ setIsChecked, isChecked }) => {

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
