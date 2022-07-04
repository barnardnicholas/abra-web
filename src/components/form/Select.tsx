import { useState, useRef, useEffect, useMemo, SyntheticEvent } from 'react';

import { DropdownOption } from '../../types/DropdownOption';
import { FormInputProps, onChangeFunction } from '../../types/FormInputProps';

interface SelectProps extends FormInputProps<number | string | null> {
    name: string;
    search?: boolean;
    options?: DropdownOption<number | string>[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    value: string | number | null;
    onChange: onChangeFunction<number | string | null>;
}

const Select: React.FC<SelectProps> = ({
    name,
    search = false,
    disabled = false,
    value = null,
    options = [],
    onChange,
    label = '',
    placeholder = 'Select...',
}) => {

    const [searchTerm, setSearch] = useState('');
    const node = useRef<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const filteredOptions = useMemo(_getFilteredOptions, [search, searchTerm, options]);
    const selected = useMemo(_getSelected, [value, options]);

    return (
            <div ref={node} onClick={() => !disabled && setIsOpen(!isOpen)}>
                <div
                    className={`form-select ${disabled ? 'disabled' : ''}`}
                >
                    {!selected ? (
                        <p className="placeholder">{placeholder}</p>
                    ) : (
                        <>
                            <p>{selected.label}</p>
                            {!disabled && (
                                <button
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

                {isOpen && (
                    <div className="form-select-options">
                        {search && !!options.length && (
                            <div className="search" onClick={e => e.stopPropagation()}>
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

                            {filteredOptions.map((opt, i) => (
                                <p
                                    key={`${opt.value} - ${i}`}
                                    className={`option ${value === opt.value ? 'active' : ''}`}
                                    onClick={e => {
                                        e.preventDefault();
                                        handleChange(opt.value);
                                    }}
                                >
                                    {opt.label}
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
    );

    function _getSelected() {
        return options.find(item => item.value === value);
    }

    function _getFilteredOptions() {
        if (!search || !searchTerm) return options;
        return options.filter(opt =>
            opt.label
                .replace(/[^A-Z0-9]/gi, '')
                .toLowerCase()
                .includes(searchTerm.replace(/[^A-Z0-9]/gi, '').toLowerCase()),
        );
    }

    function handleClick(e: Event) {
        // inside click
        if (node?.current?.contains(e.target as Node)) {
            return;
        }

        // outside click
        setIsOpen(false);
    }

    function handleSearchChange(e: SyntheticEvent) {
        e.preventDefault();

        setSearch((e.target as HTMLTextAreaElement).value);
    }

    function handleChange(val: number | string | null) {
        if (value === val) return;
        onChange(name, val);
    }
};

export default Select;
