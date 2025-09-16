import React, { useState } from "react";
import NavBar from "../../component/NavBar";
import { AlertTriangle, File } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import AddComments from "./AddComments";

const ViewTasks = () => {
  const [comments, setComments] = useState(false);
  return (
    <div>
      <NavBar title="tasks" pagetitle="View Tasks" />
      <div className="flex justify-end">
        <p className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md">
          <div className="relative w-6 h-6">
            <File className="absolute  w-6 h-6" />
            <AlertTriangle className="absolute left-1.5 top-2  w-3 h-3" />
          </div>
          Mark as complete
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3 my-3 dark:text-white text-black">
        <div className="bg-layout-light dark:bg-layout-dark p-4 rounded-md ">
          <p className="text-2xl text-center font-bold mb-3">Title</p>

          {[
            { name: "Task", value: "task" },
            { name: "Start Date", value: "12.01.2005" },
            { name: "Due Date", value: "12.01.2005" },
            { name: "Assigned To", value: "Priya" },
            { name: "Note", value: "task" },
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
        <div className="bg-layout-light dark:bg-layout-dark p-4 rounded-md ">
          <p className="text-2xl text-center font-bold mb-3">Attachments</p>

          {[{ name: "File", value: "file" }].map((heading, index) => (
            <div
              key={index}
              className="grid grid-cols-2 text-xs space-y-1 px-3 "
            >
              <p>{heading.name}</p>
              <p className="text-end text-gray-500">{heading.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-between mt-5 items-center">
        <p className="text-lg font-bold text-black dark:text-white">Comments</p>
        <button onClick={()=>{setComments(true)}} className="cursor-pointer flex items-center dark:text-white gap-2 bg-layout-light dark:bg-layout-dark w-fit px-4 py-2 text-sm rounded-md">
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
            {[1, 2, 3, 4].map((num, index) => (
              <tr
                key={index}
                className="border-b-2 text-sm dark:border-overall_bg-dark border-overall_bg-light text-center"
              >
                <td className="rounded-l-lg">
                  <p>{num}</p>
                </td>
                <td>
                  <p className="py-3">01.10.2005</p>
                </td>
                <td>
                  <p>10:30 pm</p>
                </td>
                <td>
                  <p>Priya</p>
                </td>
                <td>
                  <p>Area</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {comments && (<AddComments  onclose={() => setComments(false)}/>)}
    </div>
  );
};

export default ViewTasks;
