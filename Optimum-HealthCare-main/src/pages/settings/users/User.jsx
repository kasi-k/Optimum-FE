import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import Pagination from "../../../component/Pagination";
import { useSearch } from "../../../component/SearchBar";
import { useNavigate } from "react-router-dom";
import Filter from "../../../component/Filter";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { TbFileExport } from "react-icons/tb";
import { RoleData } from "../../../component/Data";
import { LuUserRoundPlus } from "react-icons/lu";
import DeleteModal from "../../../component/DeleteModal";

const User = () => {
  const { searchTerm } = useSearch(); // Get search term from context
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [addUserModal, setAddUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
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
  const handleAddUser = () => {
    setAddUserModal(true);
  };
  const handleEditUser = () => {
    setEditUserModal(true);
  };
  const handleDeleteUser = () => {
    setDeleteModal(true);
  };

  return (
    <>
      <div className="relative">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
             <p onClick={handleAddUser} className="cursor-pointer flex items-center dark:text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md">
                 
                     <LuUserRoundPlus/>Add User
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
              {[
                "Name",
                "Roles",
                "Phone Number",
                "Email",
                "Status",
                "Created By",
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
                  <td className="rounded-l-lg ">{index + 1}</td>
                  <td>{data.Name}</td>
                  <td>{data.Roles}</td>
                  <td>{data.PhoneNumber}</td>
                  <td>{data.Email}</td>
                  <td>{data.Status}</td>
                  <td>{data.CreatedBy}</td>
                  <td className="flex items-center justify-center py-2.5">
                    <p
                      onClick={handleEditUser}
                      className=" cursor-pointer p-1.5 bg-blue-300 text-blue-500 rounded-sm mx-2"
                    >
                      <FiEdit2 />
                    </p>
                    <p
                      onClick={handleDeleteUser}
                      className=" cursor-pointer mx-2 p-1.5  bg-pink-200 text-red-500 rounded-sm"
                    >
                      {" "}
                      <RiDeleteBinLine />
                    </p>
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
      {addUserModal && <AddUser onclose={() => setAddUserModal(false)} />}
      {editUserModal && <EditUser onclose={() => setEditUserModal(false)} />}
        {deleteModal && <DeleteModal onclose={ ()=>setDeleteModal(false)} title="User"/>}
    </>
  );
};

export default User;
