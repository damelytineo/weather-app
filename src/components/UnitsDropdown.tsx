import React from 'react';
import iconDropdown from '../assets/images/icon-dropdown.svg';
import iconUnits from '../assets/images/icon-units.svg';



function UnitsDropdown() {
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
        <li><button type="button" className="dropdown-item">Switch to Imperial</button></li>
        <li><h6 className="dropdown-header">Temperature</h6></li>
        <li><button type="button" className="dropdown-item">Celcius (°C)</button></li>
        <li><button type="button" className="dropdown-item">Fahrenheit (°F)</button></li>
        <li><h6 className="dropdown-header">Wind Speed</h6></li>
        <li><button type="button" className="dropdown-item">km/h</button></li>
        <li><button type="button" className="dropdown-item">mph</button></li>
        <li><h6 className="dropdown-header">Precipitation</h6></li>
        <li><button type="button" className="dropdown-item">Millimeters (mm)</button></li>
        <li><button type="button" className="dropdown-item">Inches (in)</button></li>
      </ul>
    </div>
  );
}

export default UnitsDropdown;