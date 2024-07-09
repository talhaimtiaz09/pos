import React from 'react';

interface ButtonProps {
  label: string;
  type: 'primary-green' | 'primary-white' | 'secondary';
  onClick: () => void;
  className?: string;  // Optional prop for additional classes
}

const Button: React.FC<ButtonProps> = ({ label, type, onClick, className }) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold text-lg transition duration-300';
  
  const typeStyles = {
    'primary-green': 'bg-green-400 text-slate-800 hover:bg-green-500',
    'primary-white': 'bg-white text-green-500 border border-green-500 hover:bg-green-400 hover:text-slate-800',
    'secondary': 'bg-gray-200 text-black border border-gray-400 hover:bg-gray-300 ',
  };

  return (
    <button className={`${baseStyles} ${typeStyles[type]} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
