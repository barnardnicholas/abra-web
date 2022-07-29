import * as React from 'react';

interface RangeInputProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (name: string, value: number) => void;
}
function RangeInput({
  name,
  value = 0.5,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
}: RangeInputProps) {
  const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(name, +e.target.value);
  };

  return (
    <span className="range-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChangeInternal}
      />
    </span>
  );
}

RangeInput.defaultProps = {
  min: 0,
  max: 1,
  step: 0.01,
};

export default RangeInput;
