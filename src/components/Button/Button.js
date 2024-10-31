import React from 'react';
import './button.css';

const Button = ({ onClick, children, type = 'primary',className }) => {
  return (
    <button className={`custom-button ${type} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;