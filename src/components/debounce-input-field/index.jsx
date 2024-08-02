/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import debounceInput from "./config";

const DebouncedInput = ({ value, onChange, debounceTime = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(value);

  const debouncedOnChange = useCallback(debounceInput(onChange, debounceTime), [
    onChange,
    debounceTime,
  ]);

  useEffect(() => {
    displayValue && debouncedOnChange(displayValue);
  }, [displayValue]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return (
    <>
      <input
        type="text"
        value={displayValue}
        onChange={(e) => setDisplayValue(e.target.value)}
      />
    </>
  );
};

export default DebouncedInput;
