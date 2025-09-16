import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const MultiDocuments = ({ onclose }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // Convert FileList to array and append new files
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Here you can send files to backend or process them
    console.log("Saving files:", files);
    onclose();
  };

  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs">
      <div className="mx-2 p-3 shadow-lg dark:bg-popup-gray bg-layout-light dark:bg-layout-dark rounded-lg relative w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onclose}
          className="absolute rounded-full -top-5 -right-4 dark:bg-layout-dark bg-layout-light lg:shadow-md md:shadow-md shadow-none lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0"
        >
          <IoClose className="size-[24px]" />
        </button>

        <h1 className="text-center font-semibold text-xl py-2 mb-4 dark:text-white text-black">
          Add Documents
        </h1>

        {/* File input */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="block w-[400px] border rounded-xl text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                     file:rounded-sm file:border-0
                     file:text-sm file:font-semibold
                     file:bg-select_layout-dark file:text-white
                     hover:file:bg-select_layout-dark/90
                     mb-4"
        />

        {/* List of selected files */}
        {files.length > 0 && (
          <ul className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-1"
              >
                <span>{file.name}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="w-full flex justify-end items-center gap-4 mt-4 px-5 text-sm font-normal">
          <p
            onClick={onclose}
            className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm"
          >
            Cancel
          </p>
          <p
            onClick={handleSave}
            className="cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm"
          >
            Save
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiDocuments;
