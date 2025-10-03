import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

// ✅ Validation schema for Leads
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  source: yup.string().required("Source is required"),
  notes: yup.string(),
  status: yup.string().required("Lead status is required"),
  consultant: yup.string().required("Consultant is required"),
  age: yup.string().required("Age is required"),
  weight: yup.string().required("Weight is required"),
  circle: yup.string().required("Circle is required"),
});

const AddLeads = ({ onclose, campaignId1, fetchCampaignDetails }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { ...data, campaign_id: campaignId1 };
      await axios.post(`${API}/lead/add`, payload);

      fetchCampaignDetails(); // Refresh campaign details
      toast.success("Lead created successfully");
      onclose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 grid place-items-center backdrop-blur-sm">
      <div className="relative w-96 lg:w-[700px] md:w-[500px] p-6 rounded-lg bg-layout-light dark:bg-layout-dark  dark:text-white shadow-lg">
        <button
          onClick={onclose}
          className="absolute -top-4 -right-4 p-2 rounded-full shadow-md bg-white dark:bg-layout-dark"
        >
          <IoClose size={22} />
        </button>

        <h1 className="text-center text-xl font-semibold mb-4 text-black dark:text-white">
          Create Lead
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-8 text-black dark:text-white">
          {/* Name */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Name</label>
            <input type="text" placeholder="Lead Name" {...register("name")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Phone</label>
            <input type="text" placeholder="Phone" {...register("phone")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Email</label>
            <input type="email" placeholder="Email" {...register("email")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Source */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Source</label>
            <input type="text" placeholder="Source" {...register("source")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.source && <p className="text-xs text-red-500">{errors.source.message}</p>}
          </div>

          {/* Lead Status */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Lead Status</label>
            <select {...register("status")} className="p-2 w-full rounded-md border border-gray-600 bg-layout-light dark:bg-layout-dark dark:text-white">
              <option value="">Select</option>
              <option value="new">New</option>
              <option value="follow-up">Follow-up</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
          </div>

          {/* Consultant */}
          <div className="col-span-6 sm:col-span-3">
            <label className="font-medium">Consultant</label>
            <input type="text" placeholder="Consultant" {...register("consultant")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.consultant && <p className="text-xs text-red-500">{errors.consultant.message}</p>}
          </div>

          {/* Age */}
          <div className="col-span-6 sm:col-span-2">
            <label className="font-medium">Age</label>
            <input type="text" placeholder="Age" {...register("age")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
          </div>

          {/* Weight */}
          <div className="col-span-6 sm:col-span-2">
            <label className="font-medium">Weight</label>
            <input type="text" placeholder="Weight" {...register("weight")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
          </div>

          {/* Circle */}
          <div className="col-span-6 sm:col-span-2">
            <label className="font-medium">Circle</label>
            <input type="text" placeholder="Circle" {...register("circle")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
            {errors.circle && <p className="text-xs text-red-500">{errors.circle.message}</p>}
          </div>

          {/* Notes */}
          <div className="col-span-6">
            <label className="font-medium">Notes</label>
            <textarea rows={4} placeholder="Notes" {...register("notes")} className="p-2 w-full border rounded-md bg-transparent border-gray-600"/>
          </div>

          {/* Buttons */}
          <div className="col-span-6 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onclose} className="border px-6 py-1.5 rounded-sm border-gray-600 text-gray-600">Cancel</button>
            <button type="submit" disabled={loading} className={`px-6 py-1.5 rounded-sm ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-select_layout-dark text-white"}`}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeads;
