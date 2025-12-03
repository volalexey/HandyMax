import { useState } from 'react';

const DropdownArrow = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`ml-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["più economico all'inizio", "Più popolare", "Più recente", "Migliori recensioni"];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="relative z-30 text-base inline-block ml-auto">
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center px-4 py-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition shadow-sm"
      >
        <span className="text-gray-500 mr-2">Ordina per:</span>
        <span className="font-semibold text-gray-900">{selectedOption}</span>
        <DropdownArrow isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul className="absolute top-[110%] right-0 w-[250px] bg-white border border-gray-200 rounded-lg shadow-xl list-none py-2 z-50">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-3 cursor-pointer text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              onClick={() => { setSelectedOption(option); setIsOpen(false); }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};