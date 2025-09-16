import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import MultiSelect from "../../component/MultiSelect";

const AddTasks = ({ onclose }) => {
  const [assigned, setAssigned] = useState([]);

  const options = [
    { value: "Priya", label: "Priya" },
    { value: "Arun", label: "Arun" },
    { value: "Rahul", label: "Rahul" },
    { value: "Meena", label: "Meena" },
  ];

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
            Add Tasks
          </h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-2">
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            <div className="col-span-2 text-black dark:text-white flex justify-between items-center">
              <label className="block col-span-1  font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600 "
              />
            </div>
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">
                Assigned to
              </label>
              <MultiSelect
                options={options}
                value={assigned}
                onChange={setAssigned}
                placeholder="Select team members..."
              />
            </div>
            <div className="col-span-2 text-black dark:text-white flex justify-between items-center">
              <label
                htmlFor="attachments"
                className="block col-span-1 font-medium mb-1"
              >
                Attachments
              </label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                multiple
                className="w-64 col-span-1 text-sm border border-gray-600 rounded-md file:mr-3 file:py-1.5 file:px-1 
             file:rounded-md file:border-0 file:text-sm file:font-medium 
             file:bg-gray-400 file:text-white hover:file:bg-gray-600
             text-black dark:text-white"
              />
            </div>

            <div className=" text-black  col-span-2  dark:text-white flex flex-col ">
              <label className="block   font-medium mb-1">Notes</label>
              <textarea
                className="w-full p-2 outline-none rounded-md bg-transparent border border-gray-600 text-black dark:text-white"
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

export default AddTasks;
