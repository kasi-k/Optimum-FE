import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../Constant";

const schema = yup.object().shape({
  patient_type: yup.string().required("Select patient type"),
  patient_name: yup.string().required("Patient name is required"),
  age: yup.number().typeError("Enter valid age").required("Age is required"),
  gender: yup.string().required("Select gender"),
  treatment: yup.string().required("Treatment is required"),
  city: yup.string().required("City is required"),
  surgeon_name: yup.string().required("Surgeon name is required"),
  medical_coordinator: yup.string().required("Coordinator name required"),
  coordinator_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Coordinator number is required"),
  consultation_type: yup.string().when("patient_type", {
    is: "OPD",
    then: () => yup.string().required("Consultation type required"),
  }),
  op_time: yup.string().when("patient_type", {
    is: "OPD",
    then: () => yup.string().required("OP time required"),
  }),
  op_date: yup.string().when("patient_type", {
    is: "OPD",
    then: () => yup.string().required("OP date required"),
  }),
  surgery_date: yup.string().when("patient_type", {
    is: "IPD",
    then: () => yup.string().required("Surgery date required"),
  }),
  admission_time: yup.string().when("patient_type", {
    is: "IPD",
    then: () => yup.string().required("Admission time required"),
  }),
  ot_time: yup.string().when("patient_type", {
    is: "IPD",
    then: () => yup.string().required("OT time required"),
  }),
  hospital_name: yup.string().when("consultation_type", {
    is: "Office",
    then: () => yup.string().required("Hospital name required"),
  }),
  hospital_address: yup.string().when("consultation_type", {
    is: "Office",
    then: () => yup.string().required("Hospital address required"),
  }),
  amount: yup
    .number()
    .typeError("Enter valid amount")
    .required("Amount required"),
  payment_mode: yup.string().required("Select payment mode"),
});

const CreateAppointment = ({ onclose, campaignId, apiEndpoint }) => {
  const [loading, setLoading] = useState(false);
  const [consultationType, setConsultationType] = useState("Online");
  const [patientType, setPatientType] = useState("OPD");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTypeChange = (type) => {
    setPatientType(type);
    setValue("patient_type", type);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        consultation_type: patientType === "OPD" ? consultationType : null,
      };
      if (campaignId) payload.campaign_id = campaignId;
      await axios.post(`${API}/appointment/${apiEndpoint}`, payload);
      toast.success(`${patientType} created successfully`);
      onclose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-layout-dark dark:text-white rounded-lg shadow-lg p-6 w-[950px] max-w-full relative text-sm">
        <button
          onClick={onclose}
          className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">
          Create Appointment
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-3 gap-4"
        >
          {/* Row 1 */}
          <div>
            <label>Patient Type</label>
            <select
              {...register("patient_type")}
              value={patientType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full border border-gray-600 p-2 rounded-md bg-layout-dark text-white"
            >
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
            </select>
            {errors.patient_type && (
              <p className="text-red-500 text-xs">
                {errors.patient_type.message}
              </p>
            )}
          </div>

          <div>
            <label>Patient Name</label>
            <input
              {...register("patient_name")}
              placeholder="Full Name"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
            {errors.patient_name && (
              <p className="text-red-500 text-xs">
                {errors.patient_name.message}
              </p>
            )}
          </div>

          <div>
            <label>Age</label>
            <input
              {...register("age")}
              type="number"
              placeholder="Age"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
            {errors.age && (
              <p className="text-red-500 text-xs">{errors.age.message}</p>
            )}
          </div>

          {/* Row 2 */}
          <div>
            <label>Gender</label>
            <select
              {...register("gender")}
              className="w-full border border-gray-600 p-2 rounded-md bg-layout-dark text-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label>Treatment</label>
            <input
              {...register("treatment")}
              placeholder="Treatment type"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>

          <div>
            <label>City</label>
            <input
              {...register("city")}
              placeholder="City"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>

          {/* Row 3 */}
          <div>
            <label>Surgeon Name</label>
            <input
              {...register("surgeon_name")}
              placeholder="Surgeon"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>

          <div>
            <label>Coordinator</label>
            <input
              {...register("medical_coordinator")}
              placeholder="Coordinator"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>

          <div>
            <label>Coordinator No.</label>
            <input
              {...register("coordinator_number")}
              placeholder="10-digit number"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>

          {/* OPD Section */}
          {patientType === "OPD" && (
            <>
              <div>
                <label>Consultation</label>
                <select
                  {...register("consultation_type")}
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full border border-gray-600 p-2 rounded-md bg-layout-dark text-white"
                >
                  <option value="Online">Online</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              {consultationType === "Office" && (
                <>
                  <div>
                    <label>Hospital Name</label>
                    <input
                      {...register("hospital_name")}
                      placeholder="Hospital Name"
                      className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label>Hospital Address</label>
                    <input
                      {...register("hospital_address")}
                      placeholder="Hospital Address"
                      className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
                    />
                  </div>
                </>
              )}
              <div>
                <label>OP Time</label>
                <input
                  {...register("op_time")}
                  type="time"
                  className="w-full border border-gray-600 p-2 rounded-md"
                />
              </div>
              <div>
                <label>OP Date</label>
                <input
                  {...register("op_date")}
                  type="date"
                  className="w-full border border-gray-600 p-2 rounded-md"
                />
              </div>
            </>
          )}

          {/* IPD Section */}
          {patientType === "IPD" && (
            <>
              <div>
                <label>Surgery Date</label>
                <input
                  {...register("surgery_date")}
                  type="date"
                  className="w-full border border-gray-600 p-2 rounded-md"
                />
              </div>
              <div>
                <label>Admission Time</label>
                <input
                  {...register("admission_time")}
                  type="time"
                  className="w-full border border-gray-600 p-2 rounded-md"
                />
              </div>
              <div>
                <label>OT Time</label>
                <input
                  {...register("ot_time")}
                  type="time"
                  className="w-full border border-gray-600 p-2 rounded-md"
                />
              </div>
              <div>
                <label>Hospital Name</label>
                <input
                  {...register("hospital_name")}
                  placeholder="Hospital Name"
                  className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
                />
              </div>
              <div>
                <label>Hospital Address</label>
                <input
                  {...register("hospital_address")}
                  placeholder="Hospital Address"
                  className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
                />
              </div>
            </>
          )}

          {/* Payment */}
          <div>
            <label>Amount</label>
            <input
              {...register("amount")}
              type="number"
              placeholder="Amount"
              className="w-full border border-gray-600 p-2 rounded-md placeholder:text-gray-500"
            />
          </div>
          <div>
            <label>Payment Mode</label>
            <select
              {...register("payment_mode")}
              className="w-full border border-gray-600 p-2 rounded-md bg-layout-dark text-white"
            >
              {patientType === "OPD" ? (
                <>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="NetBanking">Net Banking</option>
                </>
              ) : (
                <>
                  <option value="Cash">Cash</option>
                  <option value="Reimbursement">Reimbursement</option>
                  <option value="EMI">EMI</option>
                </>
              )}
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-3 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onclose}
              className="border border-gray-600 px-4 py-1.5 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-1.5 rounded-md text-white ${
                loading
                  ? "bg-gray-400"
                  : "bg-select_layout-dark hover:bg-blue-700"
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

export default CreateAppointment;
