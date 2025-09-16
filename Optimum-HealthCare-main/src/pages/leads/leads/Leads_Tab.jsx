import React, { useEffect, useMemo, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../../component/Pagination";
import { LuEye } from "react-icons/lu";
import { Pencil } from "lucide-react";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import Filter from "../../../component/Filter";
import { TbFileExport } from "react-icons/tb";
import { useSearch } from "../../../component/SearchBar";
import { leadData } from "../../../component/Data";
import Edit_leads from "./Edit_leads";
import { useNavigate } from "react-router-dom";
import Create_Appoinment from "./Create_Appoinment";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { RiUserSharedLine } from "react-icons/ri";
import TransferLeads from "./TransferLeads";

const Leads_Tab = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Edit_lead, setEdit_lead] = useState(false);
  const [CreateAppoinment, setCreateAppoinment] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [transferLeads, setTransferLeads] = useState(false);

  const uniqueBDNames = useMemo(() => {
    const names = leadData
      .map((item) => item.bdName)
      .filter((name) => name && name !== "");
    return [...new Set(names)];
  }, []);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(leadData);
      return;
    }

    const lowerSearchTerm = searchTerm.toString().toLowerCase();

    const filtered = leadData.filter((item) =>
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
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = () => {
    if (!selectAll) {
      const allIds = paginatedData.map((_, index) => index + startIndex);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleTransferSave = () => {
    // Clear selection and close modal
    setSelectedRows([]);
    setSelectAll(false);
    setTransferLeads(false);
  };

  return (
    <>
      <div className="relative">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
          <button
            onClick={() => selectedRows.length > 0 && setTransferLeads(true)}
            disabled={selectedRows.length === 0}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md 
    ${
      selectedRows.length === 0
        ? "dark:bg-gray-500 bg-gray-400 text-white cursor-not-allowed"
        : "bg-select_layout-dark dark:text-white text-white cursor-pointer"
    }
  `}
          >
            <RiUserSharedLine size={18} />
            Transfer Leads
          </button>

          <p
            onClick={() => setCreateAppoinment(true)}
            className="cursor-pointer flex items-center text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md"
          >
            <RiStickyNoteAddLine size={18} />
            Create Appoinment
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
              <th className="p-4 rounded-l-lg">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>

              <th className="p-4">S.no</th>
              {[
                "Lead ID",
                "Lead Type",
                "Name",
                "Age",
                "Weight",
                "Circle",
                "BD Name",
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
                  <td className="rounded-l-lg">
                    <input
                      type="checkbox"
                      className="accent-blue-600"
                      checked={selectedRows.includes(index + startIndex)}
                      onChange={() => handleRowSelect(index + startIndex)}
                    />
                  </td>

                  <td>{index + 1}</td>
                  <td>{data.leadId}</td>
                  <td>{data.leadType}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.weight}</td>
                  <td>{data.circle}</td>
                  <td>{data.bdName || "Not yet Assigned"}</td>
                  <td className="space-x-2 pl-4 p-2.5 rounded-r-lg">
                    <button
                      onClick={() => {
                        setEdit_lead(true);
                      }}
                      className="cursor-pointer bg-blue-200 p-1.5 rounded-sm"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() =>
                        navigate("viewleads", {
                          state: { lead: data },
                        })
                      }
                      className="cursor-pointer bg-green-200 p-1.5 rounded-sm"
                    >
                      <LuEye size={16} className="text-green-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center py-10 text-gray-500">
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
      {}
      {Edit_lead && (
        <Edit_leads
          onclose={() => {
            setEdit_lead(false);
          }}
        />
      )}
      {CreateAppoinment && (
        <Create_Appoinment
          onclose={() => {
            setCreateAppoinment(false);
          }}
        />
      )}
      {transferLeads && (
        <TransferLeads
          onclose={() => setTransferLeads(false)}
          bdNames={uniqueBDNames}
          selectedLeads={selectedRows.map((index) => filteredData[index])}
          onSave={handleTransferSave}
        />
      )}
    </>
  );
};

export default Leads_Tab;
