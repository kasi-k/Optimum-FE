import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

// Yup schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  department: yup.string().required("Department is required"),
});

const AddEmployee = ({ onclose, createdByUser }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      department: data.department,
      created_by: createdByUser || "Admin",
    };

    try {
      setLoading(true);
      await axios.post(`${API}/employee/add`, payload); // 👈 your backend route
      toast.success("Employee created successfully");
      
      onclose();
    } catch (error) {
      console.error("Error creating employee:", error);
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

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
            Add Employee
          </h1>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 space-y-2 gap-4 dark:text-white text-black"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Name</label>
              <input
                type="text"
                placeholder="enter name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white text-black dark:text-white"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs col-span-2">
                {errors.name.message}
              </span>
            )}

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Department</label>
              <input
                type="text"
                placeholder="enter department"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white text-black dark:text-white"
                {...register("department")}
              />
            </div>
            {errors.department && (
              <span className="text-red-500 text-xs col-span-2">
                {errors.department.message}
              </span>
            )}

            {/* Buttons */}
            <div className=" col-span-2 flex justify-end items-center gap-4 mt-4  text-sm font-normal">
              <p
                onClick={onclose}
                disabled={loading}
                className={`cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Cancel
              </p>
              <button
                type="submit"
                disabled={loading}
                className={`cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-darkest-blue"
                }`}
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

export default AddEmployee;
