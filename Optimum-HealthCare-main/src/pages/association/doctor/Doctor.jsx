import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../../component/Pagination";
import { LuEye } from "react-icons/lu";
import { Pencil, Plus } from "lucide-react";
import Filter from "../../../component/Filter";
import { TbFileExport } from "react-icons/tb";
import { useSearch } from "../../../component/SearchBar";
import { useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import AddDoctor from "./AddDoctor";
import ViewDoctor from "./ViewDoctor";
import { toast } from "react-toastify";
import { API } from "../../../Constant";
import EditDoctor from "./EditDoctor";
import DeleteModal from "../../../component/DeleteModal";

const Doctor = () => {
  const [addDoctorModal, setAddDoctorModal] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 10;


  

  // ✅ Fetch Doctors - moved outside useEffect
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${API}/doctor/getalldoctors`);
      const list = res.data?.data || [];
      setFilteredData(list);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(lowerSearchTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/doctor/deletedoctor/${id}`);
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (error) {
      toast.error("Failed to delete doctor");
    }
  };

  const statusColorMap = {
    active: "text-green-600 font-semibold",
    inactive: "text-red-600 font-semibold",
    on_leave: "text-yellow-600 font-semibold",
  };

  return (
    <>
      <div className="relative">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
          <p
            onClick={() => setAddDoctorModal(true)}
            className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-3 py-2 text-sm rounded-md"
          >
            <Plus size={16} />
            Add Doctor
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
                "Doctor Name",
                "City",
                "Experience",
                "Specialization",
                "Contact",
                "Pending Payment",
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
                  className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                  key={data._id}
                >
                  <td className="rounded-l-lg">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{data.doctor_name}</td>
                  <td>{data.city}</td>
                  <td>{data.experience} yrs</td>
                  <td>{data.specialization}</td>
                  <td>{data.contact}</td>
                  <td>
                    {data.pending_payment > 0
                      ? `₹${data.pending_payment.toLocaleString()}`
                      : "No Pending"}
                  </td>
                  <td className="first-letter:uppercase">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        statusColorMap[data.status] || "text-gray-500"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="pl-4 p-2.5 rounded-r-lg">
                    <button
                      onClick={() => {
                        setDoctorId(data);
                        setViewModal(true);
                      }}
                      className="cursor-pointer bg-[#BAFFBA] text-green-600 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <LuEye size={16} />
                    </button>{" "}
                    <button
                      onClick={() => {
                        setDoctorId(data);
                        setEditModal(true);
                      }}
                      className="cursor-pointer bg-blue-200 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>{" "}
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
                <td colSpan="10" className="text-center py-10 text-gray-500">
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

      {addDoctorModal && (
        <AddDoctor
          onclose={() => {
            setAddDoctorModal(false);
            fetchDoctors();
          }}
        />
      )}

      {viewModal && (
        <ViewDoctor onclose={() => setViewModal(false)} doctors={doctorId} />
      )}
      {editModal && (
        <EditDoctor
          onclose={() => setEditModal(false)}
          doctors={doctorId}
          onSuccess={fetchDoctors}
        />
      )}
      {deleteModal && (
        <DeleteModal
          title="doctor"
          onclose={() => setDeleteModal(false)}
          onConfirm={async () => {
            try {
              await handleDelete(deleteId);
              setDeleteModal(false);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </>
  );
};

export default Doctor;
