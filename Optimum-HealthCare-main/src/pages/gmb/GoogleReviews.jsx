import React, { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import Pagination from "../../component/Pagination";
import { googleReviews } from "../../component/Data";
import { CornerDownRight } from "lucide-react";
import Filter from "../../component/Filter";
import { TbFileExport } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useSearch } from "../../component/SearchBar";

const GoogleReviews = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSendReplyModal, setIsSendReplyModal] = useState(false);

  const itemsPerPage = 10;
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(googleReviews);
      return;
    }

    const lowerSearchTerm = searchTerm.toString().toLowerCase();

    const filtered = googleReviews.filter((item) =>
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

  const handleSubmitReplyModal = () => {
    setIsSendReplyModal(true);
  };
  return (
    <>
      <div className="relative">
        <div className="absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
          <p className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
            <TbFileExport />
            Export
          </p>
          <Filter />
        </div>
      </div>
      <div className="font-layout-font overflow-auto no-scrollbar">
        <table className=" w-full xl:h-fit h-[703px]  dark:text-white whitespace-nowrap">
          <thead>
            <tr className=" font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light ">
              <th className=" p-3.5 rounded-l-lg">S.no</th>
              {["Customer Name", "Date", "Ratings", "Comments"].map(
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
          <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600   cursor-default">
            {paginatedData.length > 0 ? (
              paginatedData.map((data, index) => (
                <tr
                  className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center "
                  key={index}
                >
                  <td className="rounded-l-lg ">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>{data["Customer Name"]}</td>
                  <td>{data["Date"]}</td>
                  <td>{data["Ratings"]}</td>
                  <td>{data["Comments"]}</td>
                  <td className="pl-4 p-2.5 rounded-r-lg">
                    {" "}
                    <p
                      onClick={handleSubmitReplyModal}
                      className="cursor-pointer bg-blue-200 text-blue-500 w-fit rounded-sm py-0.5 px-0.5"
                    >
                      {" "}
                      <CornerDownRight size={20} />
                    </p>
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
      {isSendReplyModal && (
        <div className=" font-layout-font fixed inset-0 flex justify-center items-center backdrop-blur-sm z-10">
          <div className="dark:bg-layout-dark bg-layout-light rounded-lg drop-shadow-md dark:text-white w-1/3">
            <p
              onClick={() => setIsSendReplyModal(false)}
              className="grid place-self-end -mx-4 -my-4 dark:bg-layout-dark bg-layout-light shadow-sm  py-2 px-2 rounded-full"
            >
              <IoClose className="size-[20px] " />
            </p>
            <div className="grid justify-center px-8 py-4 gap-6">
              <p className="text-center font-semibold text-lg">Send Reply</p>
              <form className="grid w-[460px]">
                <textarea
                  rows={4}
                  className=" border-[1px] border-[#454545] rounded-md outline-none px-4 py-8"
                  placeholder="Type Here"
                />
              </form>
            </div>
            <div className="flex justify-end items-center gap-4 my-4 mx-6 text-sm font-normal">
              <p
                className="cursor-pointer border border-select_layout-dark text-select_layout-dark  px-6 py-1.5 rounded-sm"
                onClick={() => setIsSendReplyModal(false)}
              >
                Cancel
              </p>
              <p
                onClick={() => setIsSendReplyModal(false)}
                className="cursor-pointer bg-select_layout-dark dark:text-black text-white px-6 py-1.5 rounded-sm"
              >
                Send
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleReviews;
