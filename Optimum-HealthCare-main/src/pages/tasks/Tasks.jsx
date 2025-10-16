import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../component/Pagination";
import { LuEye } from "react-icons/lu";
import { TbFileExport } from "react-icons/tb";
import Filter from "../../component/Filter";
import { useSearch } from "../../component/SearchBar";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, File, Pencil } from "lucide-react";
import { RiDeleteBinLine } from "react-icons/ri";
import NavBar from "../../component/NavBar";
import AddTasks from "./AddTasks";
import EditTasks from "./EditTasks";
import axios from "axios";
import { API, formatDate } from "../../Constant";
import { toast } from "react-toastify";
import DeleteModal from "../../component/DeleteModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addTasks, setAddTasks] = useState(false);
  const [edittasks, setEdittasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { searchTerm } = useSearch();
  const [filterParams, setFilterParams] = useState({
    fromdate: "",
    todate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
const [users, setUsers] = useState([]);

useEffect(() => {
  axios.get(`${API}/employee/getallemployees`)
    .then(res => setUsers(res.data.data))
    .catch(err => console.error(err));
}, []);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  const statusColorMap = {
    doing: "font-bold text-blue-700",
    completed: "font-bold text-green-700",
    incomplete: "font-bold text-red-700",
  };
  const user = JSON.parse(localStorage.getItem("employee"));

  // ✅ Fetch Tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/task/getalltasks`, {
        params: {
          role_name: user.role.role_name,
          employee_id: user.employee_id,
        },
      });
      console.log(res);

      setTasks(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, searchTerm, filterParams]);

  // ✅ Delete hospital
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/task/deletetask/${id}`);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };
  // Map IDs to names
// const tasksWithNames = tasks.map(task => ({
//   ...task,
//   assigned_to_name: task.assigned_to
//     .map(id => users.find(u => u.employee_id === id)?.name || id)
//     .join(", ")
// }));
// Filter tasks first based on role and employee
const filteredTasks = tasks.filter(task => {
  if (user.role.role_name === "admin") return true; // Admin sees all
  return task.assigned_to.includes(user.employee_id); // Employee sees only their tasks
});

const tasksWithNames = filteredTasks.map(task => {
  let assignedNames = [];

  if (user.role.role_name === "admin") {
    // Admin sees all assigned users
    assignedNames = task.assigned_to
      .map(id => users.find(u => u.employee_id === id)?.name || id);
  } else {
    // Employee sees only their own name
    assignedNames = task.assigned_to
      .filter(id => id === user.employee_id)
      .map(id => users.find(u => u.employee_id === id)?.name || id);
  }

  return {
    ...task,
    assigned_to_name: assignedNames.join(", "),
  };
});



  return (
    <>
      <div>
        <NavBar title="Tasks" pagetitle="Tasks" />
        <div className="font-layout-font flex justify-end items-center gap-2 pb-2">
          <button
            onClick={() => setAddTasks(true)}
            className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md"
          >
            <div className="relative w-6 h-6">
              <File className="absolute  w-6 h-6" />
              <AlertTriangle className="absolute left-1.5 top-2  w-3 h-3" />
            </div>
            <span>Add Task</span>
          </button>

          <p className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
            <TbFileExport />
            Export
          </p>

          <div className="cursor-pointer flex items-center gap-3 dark:text-white dark:bg-layout-dark bg-layout-light rounded-md">
            <Filter onFilterChange={setFilterParams} />
          </div>
        </div>
      </div>

      <div className="font-layout-font overflow-auto no-scrollbar">
        <table className="w-full xl:h-fit h-[703px] dark:text-white whitespace-nowrap">
          <thead>
            <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
              <th className="p-3.5 rounded-l-lg">S.no</th>
              {["Tasks", "Start Date", "Due Date", "Assigned to", "Status"].map(
                (heading) => (
                  <th key={heading} className="p-5">
                    <h1 className="flex items-center justify-center gap-1">
                      {heading} <HiArrowsUpDown className="dark:text-white" />
                    </h1>
                  </th>
                )
              )}
              <th className="pr-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  Loading tasks...
                </td>
              </tr>
            ) : tasksWithNames.length > 0 ? (
              tasksWithNames.map((data, index) => (
                <tr
                  className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                  key={data._id}
                >
                  <td className="rounded-l-lg">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{data.task_title}</td>
                  <td>{formatDate(data.start_date)}</td>
                  <td>{formatDate(data.due_date)}</td>
                  <td>
             {data.assigned_to_name}
                  </td>
                  <td className="first-letter:capitalize">
                    <span
                      className={` px-2 py-1 rounded-full text-sm ${
                        statusColorMap[data.status] || "text-gray-700"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>

                  <td className="pl-4 p-2.5 rounded-r-lg">
                    <button
                      className="cursor-pointer bg-[#BAFFBA] text-green-600 w-fit rounded-sm py-1.5 px-1.5"
                      onClick={() =>
                        navigate(`/tasks/viewtasks`, {
                          state: {
                            task: data,
                          },
                        })
                      }
                    >
                      <LuEye size={16} />
                    </button>{" "}
                    {/* <button
                      className="cursor-pointer bg-blue-200 w-fit rounded-sm py-1.5 px-1.5"
                      onClick={() => {
                        setSelectedTask(data);
                        setEdittasks(true);
                      }}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>{" "} */}
                    <button
                      onClick={() => {
                        setDeleteId(data._id);
                        setDeleteModal(true);
                      }}
                      className="cursor-pointer bg-pink-200 text-red-500 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <RiDeleteBinLine size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalPages * itemsPerPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {addTasks && (
        <AddTasks onclose={() => setAddTasks(false)} onSuccess={fetchTasks} />
      )}
      {edittasks && (
        <EditTasks task={selectedTask} onclose={() => setEdittasks(false)} />
      )}
      {deleteModal && (
        <DeleteModal
          title="task"
          onclose={() => setDeleteModal(false)}
          onConfirm={async () => {
            await handleDelete(deleteId);
            setDeleteModal(false);
          }}
        />
      )}
    </>
  );
};

export default Tasks;
