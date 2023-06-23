import React from 'react';
import { FormInputProps } from '../../types/FormInputProps';

function ToggleSwitch({
  name,
  onChange,
  value,
  disabled,
  hideDisabled,
  label = '',
}: ToggleSwitchProps) {
  function handleChange() {
    const newVal = !value;
    onChange(name, newVal);
  }

  return (
    <div
      className={`toggle-switch ${disabled ? 'left grey-out' : ''} ${
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
}

ToggleSwitch.defaultProps = {
  hideDisabled: false,
  label: '',
};

interface ToggleSwitchProps extends FormInputProps<boolean> {
  hideDisabled?: boolean;
  label?: string;
}

export default ToggleSwitch;
