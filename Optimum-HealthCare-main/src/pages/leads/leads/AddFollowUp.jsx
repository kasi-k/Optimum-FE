import React from "react";
import { IoClose } from "react-icons/io5";

const AddFollowUp = ({ onclose }) => {
  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs">
      <div className="mx-2 p-4 shadow-lg dark:bg-popup-gray bg-layout-light dark:bg-layout-dark rounded-lg  relative">
        <div className="grid p-4 text-layout_text-light dark:text-layout_text-dark">
          <button
            onClick={onclose}
            className="place-self-end dark:bg-popup-gray bg-white dark:bg-layout-dark absolute rounded-full -top-5 -right-4 lg:shadow-md md:shadow-md shadow-none lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0"
          >
            <IoClose className="size-[24px]" />
          </button>

          <h1 className="text-center font-semibold text-xl py-2 mb-4 dark:text-white text-black">Add Follow-up</h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 space-y-2 gap-4 dark:text-white text-black">
          
            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className=" ">Lead name</label>
              <input
                type="text"
                placeholder="name"
                className="p-2 rounded-md w-72 bg-transparent border border-[#454545] dark:placeholder:text-white placeholder:text-black"
              />
            </div>

         
            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className="">Follow up Date</label>
              <input
                type="date"
                placeholder="Start Date"
                className="p-2 rounded-md w-72 bg-transparent border border-[#454545] dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            {/* <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className="">Schedule Follow up</label>
              <input
                type="date"
                placeholder="End Date"
                className="p-2 rounded-md w-72 bg-transparent border border-[#454545] dark:placeholder:text-white placeholder:text-black"
              />
            </div>
            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" ">Convert Sales</label>
              <input
                type="text"
                placeholder="convert to sales"
                className="p-2 rounded-md w-72 bg-transparent border border-[#454545] dark:placeholder:text-white placeholder:text-black"
              />
            </div> */}
            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="">Notes</label>
              <textarea
              rows={5}
                placeholder="notes"
                className="p-2 rounded-md w-72 bg-transparent border border-[#454545] dark:placeholder:text-white placeholder:text-black"
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

export default AddFollowUp;
