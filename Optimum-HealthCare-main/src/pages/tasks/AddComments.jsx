import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../Constant";

const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  commented_by: yup.string(),
  comment: yup.string().required("Comment cannot be empty"),
});

const AddComments = ({ onclose, task, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Combine date and time if needed
      const commentData = {
        date: data.date,
        time: data.time,
        commented_by: data.commented_by,
        comment: data.comment,
      };

      await axios.post(`${API}/task/addcomment/${task._id}`, commentData);

      toast.success("Comment added successfully");
      reset();
      onclose();
      onSuccess && onSuccess(); // Refresh comments list if parent wants
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add comment");
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
            Add Comment
          </h1>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 text-sm gap-4 px-4 py-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Date */}
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            {errors.date && (
              <p className="text-red-500 text-xs col-span-2">
                {errors.date.message}
              </p>
            )}

            {/* Time */}
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">Time</label>
              <input
                type="text"
                placeholder="10:30 pm"
                {...register("time")}
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            {errors.time && (
              <p className="text-red-500 text-xs col-span-2">
                {errors.time.message}
              </p>
            )}

            {/* Commented By */}
            <div className="col-span-2 flex justify-between text-black dark:text-white items-center">
              <label className="block col-span-1 font-medium mb-1">
                Commented By
              </label>
              <input
                type="text"
                placeholder="Priya"
                {...register("commented_by")}
                className="w-64 col-span-1 outline-none p-2 rounded-md bg-transparent border border-gray-600"
              />
            </div>
            {errors.commented_by && (
              <p className="text-red-500 text-xs col-span-2">
                {errors.commented_by.message}
              </p>
            )}

            {/* Comment */}
            <div className="col-span-2 flex flex-col text-black dark:text-white">
              <label className="block col-span-1 font-medium mb-1">
                Comment
              </label>
              <textarea
                placeholder="Enter description..."
                {...register("comment")}
                rows={4}
                className="w-64 col-span-1 p-2 outline-none rounded-md bg-transparent border border-gray-600 text-black dark:text-white"
              />
            </div>
            {errors.comment && (
              <p className="text-red-500 text-xs col-span-2">
                {errors.comment.message}
              </p>
            )}

            {/* Buttons */}
            <div className="col-span-2 w-full flex justify-end items-center gap-4 mt-4 mr-6 text-sm font-normal">
              <button
                type="button"
                onClick={onclose}
                className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm"
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

export default AddComments;
