import * as React from 'react';
import { JsxElement } from 'typescript';

interface RangeInputProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (name: string, value: number) => void;
}
const RangeInput: React.FC<RangeInputProps> = ({
  name,
  value = 0.5,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
}) => {
  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(name, +e.target.value);
  };

  return (
    <span className="range-container">
      <input type="range" min={min} max={max} step={step} value={value} onChange={_handleChange} />
    </span>
  );
};

export default RangeInput;
