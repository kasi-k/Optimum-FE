import React from "react";
import { IoClose } from "react-icons/io5";

const AddUser = ({ onclose }) => {
  return (
    <div className=" font-layout-font fixed inset-0  grid justify-center items-center  backdrop-blur-xs  ">
      <div className=" mx-2 shadow-lg dark:bg-layout-dark bg-layout-light dark:text-white lg:w-[500px] md:w-[500px] w-96 rounded-lg ">
        <div className="grid  ">
          <button
            onClick={onclose}
            className=" place-self-end dark:bg-layout-dark bg-layout-light  rounded-full lg:-mx-4 md:-mx-4 -mx-2 lg:-my-5 md:-my-5  -my-3 lg:shadow-md md:shadow-md shadow-none  lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0 "
          >
            <IoClose className="size-[24px]" />
          </button>
          <h1 className="text-center font-bold text-xl py-2 my-2">Add User</h1>{" "}
          <form className=" my-5">
            <div className=" grid lg:grid-cols-12 md:grid-cols-12  items-center lg:gap-5 md:gap-5 gap-3 mb-6 mx-5 ">
            <label className="col-span-5 text-sm font-semibold">User ID</label>
              <input
                type="text"
                placeholder="Enter name"
                className="col-span-7  placeholder:dark:text-white placeholder:text-xs placeholder:font-light border border-gray-500 rounded-lg  h-11 px-2 "
              />
              <label className="col-span-5 text-sm font-semibold">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="col-span-7  placeholder:dark:text-white placeholder:text-xs placeholder:font-light border border-gray-500 rounded-lg  h-11 px-2 "
              />
              <label className="col-span-5 text-sm font-semibold  ">
                Email ID
              </label>
              <input
                type="text"
                placeholder="Enter email"
                className="col-span-7  placeholder:dark:text-white placeholder:text-xs placeholder:font-light border border-gray-500 rounded-lg  h-11 px-2 "
              />
                  <label className="col-span-5 text-sm font-semibold  ">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter mob.no"
                className="col-span-7  placeholder:dark:text-white placeholder:text-xs placeholder:font-light border border-gray-500 rounded-lg  h-11 px-2 "
              />
               <label className="col-span-5 text-sm font-semibold  ">Role</label>
              <select className="col-span-7  text-xs dark:bg-layout-dark bg-layout-light  border border-gray-500 rounded-lg  h-11 px-4 ">
                <option value="" selected disabled>
                  Select Role
                </option>
                <option value="">Super Admin</option>
                <option value="">Admin</option>
              </select>
            </div>

            <div className="   mx-5 flex justify-end gap-2 ">
              <button
                onClick={onclose}
                className="cursor-pointer  text-select_layout-dark border-select_layout-dark border px-8 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={onclose}
                className=" cursor-pointer bg-select_layout-dark dark:text-black px-6 py-2 rounded "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
