import React, { useState } from "react";
import NavBar from "../../component/NavBar";
import { AlertTriangle, File } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import AddComments from "./AddComments";
import axios from "axios";
import { API, formatDate } from "../../Constant";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewTasks = () => {
  const [comments, setComments] = useState(false);
  const location = useLocation();
  const taskData = location.state?.task;
  const navigate = useNavigate();

  const handleMarkComplete = async (taskData) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this task as complete?"
    );
    if (!confirmed) {
      toast.info("Task completion cancelled");
      return;
    }

    try {
      await axios.patch(`${API}/task/updatetask/${taskData._id}/status`, {
        status: "completed",
      });
      try {
        navigate("..");
      } catch (err) {
        console.error("Navigation or fetchTasks error:", err);
      }
      toast.success("Task marked as complete");
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      <NavBar title="tasks" pagetitle="View Tasks" />
      <div className="flex justify-end">
        {taskData?.status !== "completed" && (
          <button
            onClick={() => handleMarkComplete(taskData)}
            className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md"
          >
            <div className="relative w-6 h-6">
              <File className="absolute  w-6 h-6" />
              <AlertTriangle className="absolute left-1.5 top-2  w-3 h-3" />
            </div>
            <span> Mark as complete</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 my-3 dark:text-white text-black">
        <div className="bg-layout-light dark:bg-layout-dark p-4 rounded-md ">
          <p className="text-2xl text-center font-bold mb-3">Title</p>

          {[
            { name: "Task", value: taskData.task_title || "N/A" },

            {
              name: "Start Date",
              value: formatDate(taskData?.start_date) || "N/A",
            },
            {
              name: "Due Date",
              value: formatDate(taskData?.due_date) || "N/A",
            },
            { name: "Status", value: taskData?.status || "N/A" },

            { name: "Assigned To", value: taskData?.assigned_to || "N/A" },
            { name: "Note", value: taskData?.note || "N/A" },
          ].map((heading, index) => (
            <div
              key={index}
              className="grid grid-cols-2 text-xs space-y-1 px-3 "
            >
              <p>{heading.name}</p>
              <p className="text-end text-gray-500">{heading.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-layout-light dark:bg-layout-dark p-4 rounded-md">
          <p className="text-2xl text-center font-bold mb-3">Attachments</p>

          {taskData?.attachments && taskData.attachments.length > 0 ? (
            taskData.attachments.map((file, index) => {
              const fileUrl = file.filePath; // full URL to the file

              return (
                <div
                  key={file._id || index} // unique key if _id exists
                  className="grid grid-cols-2 text-xs space-y-1 px-3"
                >
                  <p>File {index + 1}</p>
                  <p className="text-end">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      View
                    </a>
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No Attachments</p>
          )}
        </div>
      </div>
      <div className=" flex justify-between mt-5 items-center">
        <p className="text-lg font-bold text-black dark:text-white">Comments</p>
        <button
          onClick={() => {
            setComments(true);
          }}
          className="cursor-pointer flex items-center dark:text-white gap-2 bg-layout-light dark:bg-layout-dark w-fit px-4 py-2 text-sm rounded-md"
        >
          <div className="relative w-6 h-6">
            <File className="absolute  w-6 h-6" />
            <AlertTriangle className="absolute left-1.5 top-2  w-3 h-3" />
          </div>
          Add Comment
        </button>
      </div>
      <div className="font-layout-font overflow-auto no-scrollbar my-3">
        <table className="w-full xl:h-fit  dark:text-white whitespace-nowrap">
          <thead>
            <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
              <th className="p-3.5 rounded-l-lg">S.no</th>
              {["Date", "Time", "Commented by", "Commented"].map((heading) => (
                <th key={heading} className="p-5">
                  <h1 className="flex items-center justify-center gap-1">
                    {heading} <HiArrowsUpDown className="dark:text-white" />
                  </h1>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
            {taskData?.comments && taskData.comments.length > 0 ? (
              taskData.comments.map((comment, index) => (
                <tr
                  key={index}
                  className="border-b-2 text-sm dark:border-overall_bg-dark border-overall_bg-light text-center"
                >
                  <td className="rounded-l-lg">
                    <p>{index + 1}</p>
                  </td>
                  <td>
                    <p className="py-3">{formatDate(comment.date) || "N/A"}</p>
                  </td>
                  <td>
                    <p>{comment.time || "N/A"}</p>
                  </td>
                  <td>
                    <p>{comment.commented_by || "N/A"}</p>
                  </td>
                  <td>
                    <p>{comment.comment || "N/A"}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">No Comments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {comments && (
        <AddComments onclose={() => setComments(false)} task={taskData} />
      )}
    </div>
  );
};

export default ViewTasks;
