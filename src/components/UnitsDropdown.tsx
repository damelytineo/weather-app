import React from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import iconUnits from '../assets/images/icon-units.svg';
import { Units } from '../types/weather';

interface UnitsDropdownProps {
  units: Units;
  setUnits: React.Dispatch<React.SetStateAction<Units>>;
}

function UnitsDropdown({ units, setUnits }: UnitsDropdownProps) {

  const switchToImperial = () => {
    setUnits({ temp: 'fahrenheit', wind: 'mph', precip: 'in' });
  };

  const handleTempChange = (tempUnit: 'celsius' | 'fahrenheit') => {
    setUnits((prevUnits) => ({ ...prevUnits, temp: tempUnit }));
  };

  const handleWindChange = (windUnit: 'km/h' | 'mph') => {
  };

  const handlePrecipChange = (precipUnit: 'mm' | 'in') => {
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src={iconUnits} alt="Dropdown Icon" />
        Units
        <img src={iconDropdown} alt="Units Icon" />
      </button>

      <ul className="dropdown-menu" id="dropdownMenu">
        <li>
          <button type="button" className="dropdown-item" onClick={switchToImperial}>
            Switch to Imperial
          </button></li>
        <li>
          <h6 className="dropdown-header">Temperature</h6>
        </li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handleTempChange('celsius')}>
            Celsius (°C)
          </button></li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handleTempChange('fahrenheit')}>
            Fahrenheit (°F)
          </button></li>
        <li><h6 className="dropdown-header">Wind Speed</h6></li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handleWindChange('km/h')}>
            km/h
          </button></li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handleWindChange('mph')}>
            mph
          </button></li>
        <li><h6 className="dropdown-header">Precipitation</h6></li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handlePrecipChange('mm')}>
            Millimeters (mm)
          </button></li>
        <li>
          <button type="button" className="dropdown-item" onClick={() => handlePrecipChange('in')}>
            Inches (in)
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UnitsDropdown;