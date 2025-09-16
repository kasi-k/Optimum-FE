import React from "react";
import { IoClose } from "react-icons/io5";

const Edit_Profile = ({ onclose }) => {
  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs">
      <div className="mx-2 p-4 shadow-lg dark:bg-popup-gray bg-layout-light dark:bg-layout-dark rounded-lg drop-shadow-2xl w-auto  relative">
        <div className="grid p-4 text-layout_text-light dark:text-layout_text-dark">
          <button
            onClick={onclose}
            className="place-self-end dark:bg-popup-gray bg-white dark:bg-layout-dark absolute rounded-full -top-5 -right-4 lg:shadow-md md:shadow-md shadow-none lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0"
          >
            <IoClose className="size-[24px]" />
          </button>

          <h1 className="text-center font-semibold text-xl py-2 mb-4 dark:text-white text-black">
            Edit Personal Info
          </h1>
          <form className="">
            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Employee ID</p>
              <input
                type="text"
                placeholder="EMP001"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Name</p>
              <input
                type="text"
                placeholder="Name"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Designation</p>
              <input
                type="text"
                placeholder="Neurologist"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Gender</p>
              <input
                type="text"
                placeholder="Female"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Date of Birth</p>
              <input
                type="date"
                placeholder="2000-06-11"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Mobile Number</p>
              <input
                type="text"
                placeholder="00000 00000"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Email ID</p>
              <input
                type="email"
                placeholder="hdjhshfhfj@gmail.com"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Joining Date</p>
              <input
                type="date"
                placeholder="2024-06-11"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>

            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Language</p>
              <input
                type="text"
                placeholder="English"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
              />
            </div>
            <div className="grid grid-cols-2 mb-3 items-center gap-4 dark:text-white text-black">
              <p className="m-0">Address</p>
              <input
                type="text"
                placeholder="Chennai"
                className="outline-none placeholder:text-gray-400 w-56 p-2 rounded-md bg-transparent border border-gray-600 dark:text-white text-black"
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

export default Edit_Profile;
