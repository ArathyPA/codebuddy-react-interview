// import React, { useState } from 'react';
import './formInput.css';

const Forminput = props => {
  const { label, errorMessage, onChangefn, focused, setFocused, id, ...inputprops } = props;
  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      {label !== 'CountryCode*' && (
        <>
          <label>{label}</label>
          <input
            {...inputprops}
            onChange={onChangefn}
            onBlur={handleFocus}
            onFocus={() => inputprops.name === 'confirmpassword' && setFocused(true)}
            // focused={focused.toString()}
          />
        </>
      )}
      {label === 'CountryCode*' && (
        <>
          <label htmlFor="countryCode">{label}</label>
          <select name="countryCode" id="Countrycode" onChange={onChangefn} required>
            <option value="" disabled selected>
              Select
            </option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
        </>
      )}

      <span id="validation">{errorMessage}</span>
    </div>
  );
};

export default Forminput;
