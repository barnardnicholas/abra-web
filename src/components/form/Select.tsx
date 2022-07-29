import React, { useState, useRef, useEffect, useMemo, SyntheticEvent } from 'react';

import { DropdownOption } from '../../types/DropdownOption';
import { FormInputProps, onChangeFunction } from '../../types/FormInputProps';

interface SelectProps extends FormInputProps<number | string | null> {
  name: string;
  search?: boolean;
  options?: DropdownOption<number | string>[];
  placeholder?: string;
  disabled?: boolean;
  value: string | number | null;
  onChange: onChangeFunction<number | string | null>;
}

function Select({
  name,
  search = false,
  disabled = false,
  value = null,
  options = [],
  onChange,
  placeholder = 'Select...',
}: SelectProps) {
  const [searchTerm, setSearch] = useState('');
  const node = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e: Event) {
    // inside click
    if (node?.current?.contains(e.target as Node)) {
      return;
    }

    // outside click
    setIsOpen(false);
  }

  function handleKeyDown() {
    console.log('keydown');
  }

  function intGetSelected() {
    return options.find(item => item.value === value);
  }

  function intGetFilteredOptions() {
    if (!search || !searchTerm) return options;
    return options.filter(opt =>
      opt.label
        .replace(/[^A-Z0-9]/gi, '')
        .toLowerCase()
        .includes(searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase()),
    );
  }

  function handleSearchChange(e: SyntheticEvent) {
    e.preventDefault();

    setSearch((e.target as HTMLTextAreaElement).value);
  }

  function handleChange(val: number | string | null) {
    if (value === val) return;
    onChange(name, val);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const filteredOptions = useMemo(intGetFilteredOptions, [search, searchTerm, options]);
  const selected = useMemo(intGetSelected, [value, options]);

  return (
    <div
      ref={node}
      onClick={() => !disabled && setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={`form-select ${disabled ? 'disabled' : ''}`}>
        {!selected ? (
          <p className="placeholder">{placeholder}</p>
        ) : (
          <>
            <p>{selected.label}</p>
            {!disabled && (
              <button
                type="button"
                className="remove"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  handleChange(null);
                }}
              >
                <i className="fal fa-times" />
              </button>
            )}
          </>
        )}
        <i className="arrow fal fa-angle-down" />
      </div>

      <div className={`form-select-options ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
        {search && !!options.length && (
          <div
            className="search"
            onClick={e => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            role="textbox"
            tabIndex={0}
          >
            <input
              className="form-input"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        )}
        <div className="options-list">
          {!filteredOptions.length && <p>There are no options to display</p>}

          {filteredOptions.map(opt => (
            <div
              key={`${opt.value}`}
              className={`option ${value === opt.value ? 'active' : ''}`}
              onClick={e => {
                e.preventDefault();
                handleChange(opt.value);
              }}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Select.defaultProps = {
  search: false,
  disabled: false,
  options: [],
  placeholder: 'Select...',
};

export default Select;
