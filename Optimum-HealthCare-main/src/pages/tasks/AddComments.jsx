import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import MultiSelect from "../../component/MultiSelect";

const AddComments = ({ onclose, task }) => {
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
            Add Comment
          </h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-4 px-4 py-2">
            <div className="col-span-2 flex justify-between  text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">Date</label>
              <input
                type="date"
                id="startDate"
                name="Start date"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">Time</label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="10:30 pm"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">
                Commented by
              </label>
              <input
                type="text"
                id="commented_by"
                name="commented_by"
                placeholder="Priya"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            <div className=" text-black flex justify-between col-span-2  dark:text-white  ">
              <label className="block  col-span-1 font-medium mb-1">
                Comment
              </label>
              <textarea
                className="w-64 col-span-1 p-2 outline-none rounded-md bg-transparent border border-gray-600 text-black dark:text-white"
                placeholder="Enter description..."
                rows={4}
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

export default AddComments;
