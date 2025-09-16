import React from "react";
import { IoClose } from "react-icons/io5";

const Create_Appoinment = ({ onclose }) => {
  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs">
      <div className="mx-2 p-4 shadow-lg dark:bg-popup-gray bg-layout-light dark:bg-layout-dark rounded-lg drop-shadow-2xl lg:w-[500px] md:w-[500px] w-96 relative">
        <div className="grid p-4 text-layout_text-light dark:text-layout_text-dark">
          <button
            onClick={onclose}
            className="place-self-end dark:bg-popup-gray bg-white dark:bg-layout-dark absolute rounded-full -top-5 -right-4 lg:shadow-md md:shadow-md shadow-none lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0"
          >
            <IoClose className="size-[24px]" />
          </button>

          <h1 className="text-center font-semibold text-xl py-2 mb-4 dark:text-white text-black">
            Create Appoinment
          </h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 space-y-2 gap-4 dark:text-white text-black">
            {/* Channel */}

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Type</label>
              <select className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white text-black dark:text-white">
                <option value="OPD" className="text-black">OPD</option>
                <option value="IPD" className="text-black">IPD</option>
              </select>
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className=" font-medium">OP Date</label>
              <input
                type="date" 
                placeholder="OP Date"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" font-medium">Doctor</label>
              <input
                type="text"
                placeholder="Doctor name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            {/* End Date */}
            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className="font-medium">Hospital</label>
              <input
                type="text"
                placeholder="Enter the hospital name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            {/* Budget */}
            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" font-medium">Note</label>
              <textarea   className="p-2 rounded-md w-72 bg-transparent border
                border-gray-600 dark:placeholder:text-white
                placeholder:text-black">
              
              </textarea>
            </div>
          </form>

          {/* Buttons */}
          <div className="w-full flex justify-end items-center gap-4 mt-4 mr-6 text-sm font-normal">
            <p
              onClick={onclose}
              className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm"
            >
              Cancel
            </p>
            <p className="cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm">
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Appoinment;
