import React, { useState, useRef, useEffect } from "react";
import { BiFilterAlt } from "react-icons/bi";

const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Filter");

  const dropdownRef = useRef(null);

  const options = [
    { label: "This Month", value: "thisMonth" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "Last 6 Months", value: "last6Months" },
    { label: "Last 12 Months", value: "last12Months" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    onFilterChange(option.value); // Send filter key back to parent
  };

  return (
    <>
    <div ref={dropdownRef} className=" inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" cursor-pointer dark:bg-layout-dark bg-layout-light dark:text-white flex items-center px-4 py-2 gap-1.5 rounded-md"
      >
          <BiFilterAlt />
        {selectedOption}
      
      </button>

      {isOpen && (
        <div className="relative">
        <div className=" absolute right-0 mt-2 w-40 rounded-md shadow-lg  dark:bg-layout-dark bg-layout-light dark:text-white ">
          <div className="py-1 text-sm font-semibold">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left px-4 py-2 hover:bg-select_layout-dark "
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Filter;
