import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../../component/Pagination";
import { LuEye } from "react-icons/lu";
import { Pencil } from "lucide-react";
import { TbFileExport } from "react-icons/tb";
import Filter from "../../../component/Filter";
import { useSearch } from "../../../component/SearchBar";
import { PatientsData } from "../../../component/Data";
import Edit_Patients from "./Edit_Patients";
import View_Patient from "./View_Patients";
import { RiDeleteBinLine } from "react-icons/ri";

const Patients = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editPatients, setEditPatients] = useState(false);
  const [viewPatientModal, setViewPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(PatientsData);
      return;
    }

    const lowerSearchTerm = searchTerm.toString().toLowerCase();

    const filtered = PatientsData.filter((item) =>
      Object.values(item).some((value) => {
        const lowerValue = value.toString().toLowerCase();
        if (lowerValue === lowerSearchTerm) return true;
        if (!isNaN(searchTerm) && lowerValue.includes(searchTerm)) return true;
        return lowerValue.startsWith(lowerSearchTerm);
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="relative">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
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
              {["Patient ID", "Name", "Phone Number", "Email Id", "Location", "Status"].map((heading) => (
                <th key={heading} className="p-3.5">
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
                <tr key={index} className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center">
                  <td className="rounded-l-lg">{startIndex + index + 1}</td>
                  <td>{data.leadId}</td>
                  <td>{data.name}</td>
                  <td>{data.phoneNumber}</td>
                  <td>{data.emailId}</td>
                  <td>{data.location}</td>
                  <td>{data.status}</td>
                  <td className="space-x-2 rounded-r-lg p-2.5">
                    <button
                      className="bg-blue-200 p-1.5 rounded"
                      onClick={() => {
                        setSelectedPatient(data);
                        setEditPatients(true);
                      }}
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button
                      className="bg-pink-200 text-red-500 p-1.5 rounded"
                      onClick={() => {
                        setSelectedPatient(data);
                        setViewPatientModal(true);
                      }}
                    >
                      <RiDeleteBinLine  size={16} />
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

      {editPatients && selectedPatient && (
        <Edit_Patients
          patient={selectedPatient}
          onclose={() => {
            setEditPatients(false);
            setSelectedPatient(null);
          }}
        />
      )}

      {viewPatientModal && selectedPatient && (
        <View_Patient
          patient={selectedPatient}
          onclose={() => {
            setViewPatientModal(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );
};

export default Patients;
