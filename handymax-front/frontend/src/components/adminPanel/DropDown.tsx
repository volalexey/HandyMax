import React, { useEffect, useRef, useState } from 'react';

interface DropDownProps {
  options: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const DropDown: React.FC<DropDownProps> = ({
  options,
  selectedValue,
  setSelectedValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string): void => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative cursor-pointer text-base font-medium select-none z-20" 
      ref={dropDownRef}
    >
      <div
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        by: {selectedValue}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-90' : '-rotate-90'
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute top-[120%] right-0 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                       p-2 m-0 min-w-[100px] list-none z-30 border border-gray-100 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => (
            <li
              key={option}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};