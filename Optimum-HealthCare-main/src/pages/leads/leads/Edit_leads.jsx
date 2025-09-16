import React from "react";
import { IoClose } from "react-icons/io5";

const Edit_leads = ({ onclose }) => {
  return (
    <>
      <div className=" font-layout-font fixed inset-0 flex justify-center items-center backdrop-blur-sm z-10">
        <div className="dark:bg-layout-dark bg-layout-light rounded-lg drop-shadow-md dark:text-white w-fit h-fit">
          <p
            className="grid place-self-end -mx-4 -my-4 dark:bg-layout-dark bg-layout-light shadow-sm  py-2 px-2 rounded-full"
            onClick={onclose}
          >
            <IoClose className="size-[20px] " />
          </p>
          <div className="grid justify-center px-8 py-4 ">
            <p className="text-center font-semibold text-lg">Edit Leads</p>
            <div className="p-4">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex  col-span-2 justify-between items-center">
                  <label className="font-medium col-span-1">Leads ID</label>
                  <input
                    type="text"
                    placeholder="leads ID"
                    className="p-2 rounded-md w-72 bg-transparent border col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
                <div className="flex  col-span-2 justify-between items-center">
                  <label className="  font-medium col-span-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 rounded-md bg-transparent border w-72 col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
                <div className="flex  col-span-2 justify-between items-center gap-10">
                  <label className="font-medium col-span-1">Phone number</label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="p-2 rounded-md w-72 bg-transparent border col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
                <div className="flex col-span-2 justify-between items-center">
                  <label className="  font-medium col-span-1">Email ID</label>
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="p-2 rounded-md w-72 bg-transparent border col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
              
               
                <div className="flex  col-span-2 justify-between items-center">
                  <label className="  font-medium col-span-1">Location</label>
                  <input
                    type="text"
                    placeholder="Location"
                    className="p-2 rounded-md w-72 bg-transparent border col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
            
                <div className="flex sm:col-span-2 justify-between items-center">
                  <label className="  font-medium col-span-1">Status</label>
                  <input
                    type="text"
                    placeholder="Status"
                    className="p-2 rounded-md w-72 bg-transparent border col-span-1 border-gray-600 dark:placeholder:text-white placeholder:text-black"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 my-4 mx-6 text-sm font-normal">
            <p
              className="cursor-pointer border border-select_layout-dark text-select_layout-dark  px-6 py-1.5 rounded-sm"
              onClick={onclose}
            >
              Cancel
            </p>
            <p className="cursor-pointer bg-select_layout-dark text-white text-sm px-6 py-1.5 rounded-sm">
              Save
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit_leads;
