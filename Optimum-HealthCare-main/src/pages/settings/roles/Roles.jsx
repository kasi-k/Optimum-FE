import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { TbFileExport } from "react-icons/tb";
import Filter from "../../../component/Filter";
import Pagination from "../../../component/Pagination";
import { RoleData } from "../../../component/Data";
import { useSearch } from "../../../component/SearchBar";
import { HiOutlineUserGroup } from "react-icons/hi2";
import DeleteModal from "../../../component/DeleteModal";

const Roles = () => {
  const { searchTerm } = useSearch(); // Get search term from context
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const itemsPerPage = 10;

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(RoleData); // Show all data if search is empty
      return;
    }

    const lowerSearchTerm = searchTerm.toString().toLowerCase();

    const filtered = RoleData.filter((item) =>
      Object.values(item).some((value) => {
        const lowerValue = value.toString().toLowerCase();

        // ✅ Exact match first
        if (lowerValue === lowerSearchTerm) return true;

        // ✅ Special handling for numbers
        if (!isNaN(searchTerm) && lowerValue.includes(searchTerm)) return true;

        // ✅ Progressive search (matches starting values)
        return lowerValue.startsWith(lowerSearchTerm);
      })
    );

    setFilteredData(filtered);
    setCurrentPage(1); // ✅ Reset to first page after search
  }, [searchTerm]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handleAddRole= () => {
    navigate("addrole");
  };

  const handleEditRole = () => {
    navigate("editrole");
  };


  return (
    <>
      <div className="relative">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
             <p onClick={handleAddRole} className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md">
                   
                     <HiOutlineUserGroup size={24}/> Add Role
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
              <th className="p-4 rounded-l-lg">S.no</th>
              {["Name", "Roles", "Created By"].map((heading) => (
                <th key={heading} className="p-5">
                  <h1 className="flex items-center justify-center gap-1">
                    {heading} <HiArrowsUpDown className="dark:text-white" />
                  </h1>
                </th>
              ))}
              <th className=" rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
            {paginatedData.length > 0 ? (
              paginatedData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
                >
                  <td className="rounded-l-lg ">{index + 1}</td>
                  <td>{data.Name}</td>
                  <td>{data.Roles}</td>
                  <td>{data.CreatedBy}</td>
                  <td className="space-x-2  p-2.5 rounded-r-lg">
                    <button
                      onClick={handleEditRole}
                      className=" cursor-pointer p-1.5 bg-blue-300 text-blue-500 rounded-sm mx-2"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                    onClick={ () =>setDeleteModal(true)}
                      className=" cursor-pointer mx-2 p-1.5  bg-pink-200 text-red-500 rounded-sm"
                    >
                      {" "}
                      <RiDeleteBinLine />
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
      {deleteModal && <DeleteModal onclose={ () =>setDeleteModal(false)} title="Role"/>}
    </>
  );
};

export default Roles;
