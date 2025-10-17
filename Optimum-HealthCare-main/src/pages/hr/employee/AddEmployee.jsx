import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

// Yup schema including all fields
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  dob: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  department: yup.string().required("Department is required"),
  rpperson: yup.string().required("Reporting Person is required"),
  language: yup.string().required("Language is required"),
});

const AddEmployee = ({ onclose, createdByUser }) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch all employees for Reporting Person dropdown
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/employee/getallemployees`);
      setEmployees(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      created_by: createdByUser || "Admin",
    };

    try {
      setLoading(true);
      await axios.post(`${API}/employee/add`, payload);
      toast.success("Employee created successfully");
      onclose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "p-2 rounded-md w-full bg-transparent border border-gray-600 dark:border-gray-500 text-black dark:text-white placeholder:text-gray-400";

  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs">
      <div className="mx-2 p-4 shadow-lg dark:bg-popup-gray bg-layout-light dark:bg-layout-dark rounded-lg drop-shadow-2xl lg:w-[700px] md:w-[600px] w-96 relative">
        {/* Close Button */}
        <button
          onClick={onclose}
          className="place-self-end bg-white dark:bg-layout-dark absolute rounded-full -top-5 -right-4 lg:shadow-md md:shadow-md shadow-none lg:py-3 md:py-3 py-0 lg:px-3 md:px-3 px-0"
        >
          <IoClose className="size-[24px] text-white" />
        </button>

        {/* Form Title */}
        <h1 className="text-center font-semibold text-xl py-2 mb-4 dark:text-white text-black">
          Add Employee
        </h1>

        {/* Form */}
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 dark:text-white text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              {...register("name")}
              className={inputClass}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">{errors.name.message}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Date of Birth</label>
            <input type="date" {...register("dob")} className={inputClass} />
            {errors.dob && (
              <span className="text-red-500 text-xs">{errors.dob.message}</span>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Gender</label>
            <select {...register("gender")} className={inputClass}>
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-xs">{errors.gender.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              {...register("phone")}
              className={inputClass}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              {...register("email")}
              className={inputClass}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Address</label>
            <input
              type="text"
              placeholder="Enter full address"
              {...register("address")}
              className={inputClass}
            />
            {errors.address && (
              <span className="text-red-500 text-xs">{errors.address.message}</span>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Department</label>
            <input
              type="text"
              placeholder="Enter department"
              {...register("department")}
              className={inputClass}
            />
            {errors.department && (
              <span className="text-red-500 text-xs">{errors.department.message}</span>
            )}
          </div>

          {/* Reporting Person Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Reporting Person</label>
            <select {...register("rpperson")} className={inputClass}>
              <option value="">Select Reporting Person</option>
              {employees.map((emp) => (
                <option className="bg-layout-dark" key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
            {errors.rpperson && (
              <span className="text-red-500 text-xs">{errors.rpperson.message}</span>
            )}
          </div>

          {/* Language */}
          <div className="flex flex-col gap-1">
            <label className="font-medium">Language</label>
            <input
              type="text"
              placeholder="Enter language"
              {...register("language")}
              className={inputClass}
            />
            {errors.language && (
              <span className="text-red-500 text-xs">{errors.language.message}</span>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <p
              onClick={onclose}
              className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm"
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
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
