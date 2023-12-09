'use client'
import ReactSelect from 'react-select'

interface SelectProps {
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    value,
    onChange,
    options,
    disabled
}) => {
    return (
        <ReactSelect
            isDisabled={disabled}
            value={value}
            onChange={onChange}
            isMulti
            options={options}
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
            classNames={{
                control: () => 'text-sm',
            }}
        />
    );
}

export default Select;