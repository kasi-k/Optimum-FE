import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

// ✅ Validation schema for Appointment
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  slot: yup.string().required("Slot is required"),
  doctor_name: yup.string().required("Doctor Name is required"),
  treatmentype: yup.string().required("Treatment Type is required"),
  notes: yup.string(),
});

const AddAppointments = ({ campaignId, onclose, fetchCampaignDetails }) => {
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data, campaign_id: campaignId };

      await axios.post(`${API}/appointment/create`, payload);
      toast.success("Appointment created successfully");
      fetchCampaignDetails?.(); // optional: refresh campaign data
      onclose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 grid z-20 justify-center items-center backdrop-blur-xs font-layout-font">
      <div className="relative w-96 lg:w-[600px] md:w-[500px] bg-layout-light dark:bg-layout-dark dark:text-white text-black p-6 rounded-lg shadow-lg drop-shadow-2xl">
        <button
          onClick={onclose}
          className="absolute -top-5 -right-4 bg-white dark:bg-layout-dark rounded-full shadow-md p-2"
        >
          <IoClose className="size-[22px]" />
        </button>

        <h1 className="text-center text-xl font-semibold mb-4 dark:text-white text-black">
          Create Appointment
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-8">
          {/* Name */}
          <div className="col-span-6 sm:col-span-3 ">
            <label className="font-medium">Patient Name</label>
            <input
              type="text"
              placeholder="Patient Name"
              {...register("name")}
              className="w-full p-2 mt-2 rounded-md border border-gray-600 bg-transparent"
            />
            {errors.name && <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Phone</label>
            <input
              type="text"
              placeholder="Phone"
              {...register("phone")}
              className="w-full p-2 mt-2  rounded-md border border-gray-600 bg-transparent"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-2  mt-2  rounded-md border border-gray-600 bg-transparent"
            />
            {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>}
          </div>
                <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full p-2  mt-2  rounded-md border border-gray-600 bg-transparent"
            />
            {errors.date && <p className="text-xs text-red-500 mt-0.5">{errors.date.message}</p>}
          </div>

          {/* Slot */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Slot</label>
            <input
              type="text"
              placeholder="Time Slot"
              {...register("slot")}
              className="w-full p-2  mt-2 rounded-md border border-gray-600 bg-transparent"
            />
            {errors.slot && <p className="text-xs text-red-500 mt-0.5">{errors.slot.message}</p>}
          </div>

          {/* Doctor Name */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Doctor Name</label>
            <input
              type="text"
              placeholder="Doctor"
              {...register("doctor_name")}
              className="w-full p-2  mt-2 rounded-md border border-gray-600 bg-transparent"
            />
            {errors.doctor_name && <p className="text-xs text-red-500 mt-0.5">{errors.doctor_name.message}</p>}
          </div>

          {/* Treatment Type */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Treatment Type</label>
            <input
              type="text"
              placeholder="Treatment"
              {...register("treatmentype")}
              className="w-full p-2  mt-2  rounded-md border border-gray-600 bg-transparent"
            />
            {errors.treatmentype && <p className="text-xs text-red-500 mt-0.5">{errors.treatmentype.message}</p>}
          </div>
    

          {/* Notes */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium ">Notes</label>
            <textarea
              rows={2}
              placeholder="Notes"
              {...register("notes")}
              className="w-full p-2 mt-2  rounded-md border border-gray-600 bg-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-6 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onclose}
              className="px-6 py-1.5 border border-gray-600 rounded-sm text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-1.5 rounded-sm ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white"}`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
