import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone number is required"),
  date: yup.string().required("Date is required"),
  slot: yup.string().required("Slot is required"),
  doctor_name: yup.string().required("Doctor name is required"),
  status: yup.string().required("Status is required"),
});

const CreateAppointment = ({ onclose }) => {
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
      phone: data.phone,
      date: data.date,
      slot: data.slot,
      doctor_name: data.doctor_name,
      status: data.status,
    };

    try {
      setLoading(true);
      await axios.post(`${API}/appointment/add`, payload);
      toast.success("Appointment created successfully");
      onclose();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error(error.response?.data?.message || "Failed to create appointment");
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
            Create Appointment
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 space-y-2 gap-4 dark:text-white text-black"
          >
            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Name</label>
              <input
                type="text"
                placeholder="patient name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("name")}
              />
              {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="mob.no"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("phone")}
              />
              {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Date</label>
              <input
                type="date"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("date")}
              />
              {errors.date && <p className="mt-0.5 text-xs text-red-500">{errors.date.message}</p>}
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Slot</label>
              <input
                type="text"
               placeholder="10:00 AM - 12:00 PM"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("slot")}
              />
              {errors.slot && <p className="mt-0.5 text-xs text-red-500">{errors.slot.message}</p>}
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Doctor</label>
              <input
                type="text"
                placeholder="doctor name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("doctor_name")}
              />
              {errors.doctor_name && <p className="mt-0.5 text-xs text-red-500">{errors.doctor_name.message}</p>}
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className="font-medium">Status</label>
              <input
                type="text"
                placeholder="completed/pending"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-gray-500 placeholder:text-black"
                {...register("status")}
              />
              {errors.status && <p className="mt-0.5 text-xs text-red-500">{errors.status.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end items-center gap-4 mt-4 mr-2 text-sm font-normal">
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
