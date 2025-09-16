import React from "react";
import { IoClose } from "react-icons/io5";

const Apply_WFH = ({ onclose }) => {
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
            Apply WFH
          </h1>
          <form>
            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">From Date</p>
              <input
                type="date"
                className="outline-none w-56 col-span-1 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
                name="date"
                id="date"
              />
            </div>
            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">To Date </p>
              <input
                type="date"
                className="outline-none w-56 col-span-1 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
                name="date"
                id="date"
              />
            </div>
            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Reason</p>
              <input
                type="text"
                placeholder="Enter your reason"
                className="outline-none w-56 col-span-1 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
                name="date"
                id="date"
              />
            </div>
          </form>
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
export default Apply_WFH;
