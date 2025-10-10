import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../../component/Pagination";
import { LuEye } from "react-icons/lu";
import { Pencil, Plus } from "lucide-react";
import Filter from "../../../component/Filter";
import { TbFileExport } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSearch } from "../../../component/SearchBar";
import { API } from "../../../Constant";
import AddHospital from "./AddHospital";
import EditHospital from "./EditHospital";
import ViewHospital from "./ViewHospital";
import DeleteModal from "../../../component/DeleteModal";
import { toast } from "react-toastify";
import axios from "axios";

const Hospital = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const itemsPerPage = 10;

  // ✅ Fetch Hospitals from API
  const fetchHospitals = async () => {
    try {
      const res = await axios.get(`${API}/hospital/getallhospitals`);
      setFilteredData(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // ✅ Search filter
  useEffect(() => {
    if (!searchTerm) {
      fetchHospitals();
      return;
    }

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

  // ✅ Delete hospital
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/hospital/deletehospital/${id}`);
      toast.success("Hospital deleted successfully");
      fetchHospitals();
    } catch (err) {
      toast.error("Failed to delete hospital");
    }
  };

  const statusColorMap = {
    active: "font-bold text-green-700",
    inactive: "font-bold text-red-700",
  };

  return (
    <>
      <div className="relative">
        <div className="absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
          <p
            onClick={() => setAddModal(true)}
            className="cursor-pointer flex items-center gap-2 bg-select_layout-dark dark:text-white px-3 py-2 rounded-md"
          >
            <Plus size={16} />
            Add Hospital
          </p>
          <p className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
            <TbFileExport />
            Export
          </p>
          <Filter />
        </div>
      </div>

      <div className="overflow-auto no-scrollbar">
        <table className="w-full xl:h-fit h-[703px] dark:text-white whitespace-nowrap">
          <thead>
            <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
              <th className="p-3.5 rounded-l-lg">S.no</th>
              {[
                "Hospital Name",
                "City",
                "Address",
                "Specialization",
                "Contact",
                "Overdue Amount",
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

          <tbody className="dark:bg-layout-dark bg-layout-light text-gray-600 dark:text-gray-200">
            {paginatedData.length > 0 ? (
              paginatedData.map((hospital, index) => (
                <tr
                  className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                  key={hospital._id}
                >
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{hospital.hospital_name}</td>
                  <td>{hospital.city}</td>
                  <td>{hospital.address}</td>
                  <td>{hospital.specialization}</td>
                  <td>{hospital.contact}</td>
                  <td>
                    {hospital.overdue && hospital.overdue > 0
                      ? `₹${hospital.overdue.toLocaleString()}`
                      : "No Due"}
                  </td>
                  <td className="first-letter:uppercase">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        statusColorMap[hospital.status] || "text-gray-700"
                      }`}
                    >
                      {hospital.status}
                    </span>
                  </td>
                  <td className="pl-4 p-2.5 rounded-r-lg flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedHospital(hospital);
                        setViewModal(true);
                      }}
                      className="bg-[#BAFFBA] text-green-600 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <LuEye size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedHospital(hospital);
                        setEditModal(true);
                      }}
                      className="bg-blue-200 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(hospital._id);
                        setDeleteModal(true);
                      }}
                      className="bg-pink-200 text-red-500 w-fit rounded-sm py-1.5 px-1.5"
                    >
                      <RiDeleteBinLine size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">
                  No hospitals found.
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

      {addModal && (
        <AddHospital
          onclose={() => {
            setAddModal(false);
            fetchHospitals();
          }}
        />
      )}

      {viewModal && (
        <ViewHospital
          onclose={() => setViewModal(false)}
          hospital={selectedHospital}
        />
      )}

      {editModal && (
        <EditHospital
          onclose={() => setEditModal(false)}
          hospital={selectedHospital}
          onSuccess={fetchHospitals}
        />
      )}

      {deleteModal && (
        <DeleteModal
          title="hospital"
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

export default Hospital;
