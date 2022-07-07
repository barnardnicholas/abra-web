import React from 'react';
import { FormInputProps } from '../../types/FormInputProps';

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  onChange,
  value,
  disabled,
  hideDisabled,
  label = '',
}) => {
  return (
    <div
      className={`checkbox ${disabled ? 'left grey-out' : ''} ${
        hideDisabled && disabled ? 'hide' : ''
      } `}
    >
      <input
        id={name}
        onChange={handleChange}
        type="checkbox"
        checked={value}
        name={name}
        disabled={disabled}
      />
      <label htmlFor={name}>
        {!!label.length && <span className="text">{label}</span>}
        <span className="outer">
          <span className="inner" />
        </span>
      </label>
    </div>
  );

  function handleChange() {
    const newVal = !value;
    onChange(name, newVal);
  }
};

interface ToggleSwitchProps extends FormInputProps<boolean> {
  hideDisabled?: boolean;
  label?: string;
}

export default ToggleSwitch;
