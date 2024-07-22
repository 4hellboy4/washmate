import React from 'react';
import PropTypes from 'prop-types';

interface InputFieldProps {
  type?: string;
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AuthInputField: React.FC<InputFieldProps> = ({
  type = 'text',
  label,
  name,
  value,
  placeholder,
  onChange,
  className = '',
}) => {
  return (
    <div className={`input-field ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <br />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

AuthInputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default AuthInputField;
