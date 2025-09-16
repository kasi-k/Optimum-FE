import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { LuEye } from "react-icons/lu";
import { Pencil } from "lucide-react";
import { TbFileExport } from "react-icons/tb";
import Pagination from "../../../component/Pagination";
import Filter from "../../../component/Filter";
import { useSearch } from "../../../component/SearchBar";
import { AppointmentData } from "../../../component/Data";
import Calendar from "./Calendar";
import { CiCalendar } from "react-icons/ci";
import { TbCalendarTime } from "react-icons/tb";
import CreateAppointment from "./CreateAppointment";
import { IoClose } from "react-icons/io5";
import Completed from "./Completed";
import Reschedule from "./Reschedule";
import ViewAppoinment from "./ViewAppoinment";

const EditAppointmentModal = ({ onclose }) => {
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
            Edit Appointment
          </h1>

          <form className="grid grid-cols-1 sm:grid-cols-2 space-y-2 gap-4 dark:text-white text-black">
            {/* Channel */}
            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className=" font-medium">Name</label>
              <input
                type="text"
                placeholder="name"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="mob.no"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className="font-medium"> Date</label>
              <input
                type="date"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" font-medium">Slot</label>
              <input
                type="text"
                placeholder="Slot"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center">
              <label className=" font-medium">Doctor</label>
              <input
                type="text"
                placeholder="doctor"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>

            <div className="flex col-span-2 gap-5 justify-between items-center ">
              <label className=" font-medium">Status</label>
              <input
                type="text"
                placeholder="Status"
                className="p-2 rounded-md w-72 bg-transparent border border-gray-600 dark:placeholder:text-white placeholder:text-black"
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="w-full flex justify-end items-center gap-4 mt-4 mr-6 text-sm font-normal">
            <p
              onClick={onclose}
              className="cursor-pointer border border-select_layout-dark text-select_layout-dark px-6 py-1.5 rounded-sm"
            >
              Cancel
            </p>
            <p className="cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm">
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Appointment_Tab = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [createAppointment, setCreateAppointment] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewCalendar, setViewCalendar] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isview, setIsview] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(AppointmentData);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    const filtered = AppointmentData.filter((item) =>
      Object.values(item).some((value) => {
        const lowerValue = value.toString().toLowerCase();
        return (
          lowerValue === lowerSearchTerm ||
          (!isNaN(searchTerm) && lowerValue.includes(searchTerm)) ||
          lowerValue.startsWith(lowerSearchTerm)
        );
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setEditModalOpen(true);
  };

  const handleSave = (updatedData) => {
    const updatedList = filteredData.map((item) =>
      item.tokenNo === updatedData.tokenNo ? updatedData : item
    );
    setFilteredData(updatedList);
    setEditModalOpen(false);
  };

  return (
    <>
      {!viewCalendar && (
        <div className="mt-16">
          <div className="relative ">
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
              <Filter />
            </div>
          </div>

          <div className="font-layout-font overflow-auto no-scrollbar">
            <table className="w-full xl:h-fit h-[703px] dark:text-white whitespace-nowrap">
              <thead>
                <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
                  <th className="p-3.5 rounded-l-lg">S.no</th>
                  {[
                    "Token No",
                    "Name",
                    "Phone Number",
                    "Date",
                    "Slot",
                    "Status",
                  ].map((heading) => (
                    <th key={heading} className="p-5">
                      <h1 className="flex items-center justify-center gap-1">
                        {heading} <HiArrowsUpDown className="dark:text-white" />
                      </h1>
                    </th>
                  ))}
                  <th className="pr-2 rounded-r-lg">Action</th>
                </tr>
              </thead>

              <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
                {paginatedData.length > 0 ? (
                  paginatedData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                    >
                      <td className="rounded-l-lg">{startIndex + index + 1}</td>
                      <td>{data.tokenNo}</td>
                      <td>{data.name}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.date}</td>
                      <td>{data.slot}</td>
                      <td
                        className={`first-letter:uppercase
                               ${
                                 data.status === "reschedule"
                                   ? " text-blue-600"
                                   : data.status === "completed"
                                   ? " text-green-600"
                                   : data.status === "cancelled"
                                   ? " text-red-600"
                                   : " text-gray-600"
                               }`}
                      >
                        {data.status}
                      </td>
                      <td className="space-x-2 p-2.5 rounded-r-lg">
                        <button
                          className=" cursor-pointer bg-blue-200 p-1.5 rounded-sm"
                          onClick={() => handleEdit(data)}
                        >
                          <Pencil size={16} className="text-blue-600" />
                        </button>
                        <button
                          className=" cursor-pointer bg-green-200 p-1.5 rounded-sm"
                          onClick={() => {
                            // setSelectedStatus(data.status);
                            // setIsModalOpen(true);
                            setIsview(true)
                          }}
                        >
                          <LuEye size={16} className="text-green-600" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-gray-500">
                      No matching results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {editModalOpen && (
            <EditAppointmentModal onclose={() => setEditModalOpen(false)} />
          )}
          {createAppointment && (
            <CreateAppointment onclose={() => setCreateAppointment(false)} />
          )}

          {isModalOpen && selectedStatus === "completed" && (
            <Completed onclose={() => setIsModalOpen(false)} />
          )}
          {isModalOpen && selectedStatus === "reschedule" && (
            <Reschedule onclose={() => setIsModalOpen(false)} />
          )}
          {isview && (<>
           <ViewAppoinment onclose={() => setIsview(false)} />
          </>)}
        </div>
      )}
      {viewCalendar && <Calendar onclose={() => setViewCalendar(false)} />}
    </>
  );
};

export default Appointment_Tab;
