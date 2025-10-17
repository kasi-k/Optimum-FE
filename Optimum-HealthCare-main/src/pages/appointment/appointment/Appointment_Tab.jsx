import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../../../component/Pagination";
import Filter from "../../../component/Filter";
import { CiCalendar } from "react-icons/ci";
import { TbCalendarTime, TbFileExport } from "react-icons/tb";
import { HiArrowsUpDown } from "react-icons/hi2";
import { LuEye } from "react-icons/lu";
import { Pencil } from "lucide-react";

import Calendar from "./Calendar";
import CreateAppointment from "./CreateAppointment";
import Completed from "./Completed";
import Reschedule from "./Reschedule";
import ViewAppoinment from "./ViewAppoinment";
import EditAppointment from "./EditAppointment"; // assuming this exists

import { API, formatDate } from "../../../Constant";

const Appointment_Tab = () => {
  const itemsPerPage = 10;

  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // To implement controlled SearchBar
  const [filterParams, setFilterParams] = useState({
    fromdate: "",
    todate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [createAppointment, setCreateAppointment] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [viewCalendar, setViewCalendar] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [isView, setIsView] = useState(false);

  // Fetch appointments from API with pagination, search, and date filters
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/appointment/getallappointments`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
          fromdate: filterParams.fromdate,
          todate: filterParams.todate,
        },
      });

      setAppointments(res.data.data || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments whenever pagination, search term or filters change
  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line
  }, [currentPage, searchTerm, filterParams, createAppointment]);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };
  const STATUS_COLORS = {
    Pending: " text-yellow-500",
    Completed: " text-green-800",
    Confirmed: " text-blue-800",
    Cancelled: " text-red-800",
  };

  return (
    <>
      {!viewCalendar && (
        <div className="mt-16">
          <div className="relative">
            <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
              <p
                onClick={() => setCreateAppointment(true)}
                className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md"
              >
                <TbCalendarTime size={18} />
                Create Appointments
              </p>
              <p
                onClick={() => setViewCalendar(true)}
                className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md"
              >
                <CiCalendar size={18} className="stroke-1" />
                Calendar
              </p>
              <p className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
                <TbFileExport />
                Export
              </p>
              <Filter
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
              {/* Add search bar component here with searchTerm and setSearchTerm */}
            </div>
          </div>

          <div className="font-layout-font overflow-auto no-scrollbar">
            <div className="font-layout-font overflow-auto no-scrollbar">
              <table className="w-full xl:h-fit h-[703px] dark:text-white whitespace-nowrap">
                <thead>
                  <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
                    <th className="p-3.5 rounded-l-lg">S.no</th>
                    {[
                      "Token ID",
                      "Patient ID",
                      "Patient Name",
                      "Age",
                      "Treatment",
                      "Surgeon",
                      "Coordinator",
                      "Status",
                    ].map((heading) => (
                      <th key={heading} className="p-5">
                        <h1 className="flex items-center justify-center gap-1">
                          {heading}
                        </h1>
                      </th>
                    ))}
                    <th className="pr-2 rounded-r-lg">Action</th>
                  </tr>
                </thead>

                <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
                  {appointments.length > 0 ? (
                    appointments.map((data, index) => (
                      <tr
                        key={index}
                        className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                      >
                        <td className="rounded-l-lg">{index + 1}</td>
                        <td>{data.token_id}</td>
                        <td>
                          {" "}
                          {data.patient_type === "OPD"
                            ? data.opd_number
                            : data.ipd_number}
                        </td>

                        <td>{data.patient_name}</td>
                        <td>{data.age}</td>
                        <td>{data.treatment}</td>
                        <td>{data.surgeon_name}</td>
                        <td>{data.medical_coordinator}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              STATUS_COLORS[data.status] ||
                              "bg-gray-200 text-gray-800"
                            }`}
                          >
                            {data.status || "-"}
                          </span>
                        </td>

                        <td className="space-x-2 p-2.5 rounded-r-lg">
                          <button
                            className="cursor-pointer bg-blue-200 p-1.5 rounded-sm"
                            onClick={() => handleEdit(data)}
                          >
                            <Pencil size={16} className="text-blue-600" />
                          </button>
                          <button
                            className="cursor-pointer bg-green-200 p-1.5 rounded-sm"
                            onClick={() => {
                              setSelectedAppointment(data);
                              setIsView(true);
                            }}
                          >
                            <LuEye size={16} className="text-green-600" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="13"
                        className="text-center py-10 text-gray-500"
                      >
                        No appointments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {editModalOpen && selectedAppointment && (
            <EditAppointment
              onclose={() => setEditModalOpen(false)}
              appointment={selectedAppointment}
              onSuccess={fetchAppointments}
            />
          )}

          {createAppointment && (
            <CreateAppointment
              onclose={() => setCreateAppointment(false)}
              refresh={fetchAppointments}
              apiEndpoint="add"
            />
          )}

          {isModalOpen && selectedStatus === "completed" && (
            <Completed onclose={() => setIsModalOpen(false)} />
          )}

          {isModalOpen && selectedStatus === "reschedule" && (
            <Reschedule onclose={() => setIsModalOpen(false)} />
          )}

          {isView && (
            <ViewAppoinment
              onclose={() => setIsView(false)}
              data={selectedAppointment}
            />
          )}
        </div>
      )}

      {viewCalendar && <Calendar onclose={() => setViewCalendar(false)} />}
    </>
  );
};

export default Appointment_Tab;
