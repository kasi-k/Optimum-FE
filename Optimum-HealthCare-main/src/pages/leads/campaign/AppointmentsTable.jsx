import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FiTrash2 } from "react-icons/fi";
import DeleteModal from "../../../component/DeleteModal";
import { AppointmentsTableData} from "../../../component/Data";


const AppointmentsTable = () => {
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="">
      {AppointmentsTableData.length !==0 ?(   <div className="font-layout-font overflow-auto no-scrollbar h-48">
        <table className="w-full  dark:text-white whitespace-nowrap">
          <thead  >
            <tr className="font-semibold text-sm dark:bg-layout-dark bg-layout-light border-b-2 dark:border-overall_bg-dark border-overall_bg-light">
              <th className="py-4 px-2 rounded-l-lg">S.no</th>
              {[
                "Patient Name",
                "Contact Number",
                "Email",
                "Appointment Date",
                "Consultant",
                "Treatment type",
                "Notes",
           
              ].map((heading) => (
                <th key={heading} className="p-2">
                  <h1 className="flex items-center justify-center gap-1">
                    {heading} <HiArrowsUpDown className="dark:text-white" />
                  </h1>
                </th>
              ))}
              <th className="pr-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody className="dark:bg-layout-dark bg-layout-light rounded-2xl dark:text-gray-200 text-gray-600 cursor-default">
            {AppointmentsTableData && AppointmentsTableData.map((data,index) => (
              <tr
                key={index}
                className="border-b-2 dark:border-overall_bg-dark border-overall_bg-light text-center"
              >
                <td className="rounded-l-lg ">{index +1}</td>
                <td>{data.patientName}</td>
                <td>{data.contactNumber}</td>
                <td>{data.email}</td>
                <td>{data.appointmentDate}</td>
                <td>{data.consultant}</td>
                <td>{data.treatmentType}</td>
                <td>{data.notes}</td>
             
                <td className=" p-3 rounded-r-lg">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className=" cursor-pointer p-0.5 rounded-sm  bg-green-200 text-green-600"
                    >
                      <LuEye size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteModal(true)}
                      className=" cursor-pointer p-0.5 rounded-sm  bg-red-200 text-red-500"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>):(
        <div className="dark:bg-layout-dark bg-layout-light text-red-500 text-center py-4 font-semibold text-lg -mt-2 rounded-lg">
        <p>No Data Available !!!</p>
        </div>
      )}
   

      {deleteModal && (
        <DeleteModal onclose={() => setDeleteModal(false)} title="Leads" />
      )}
    </div>
  );
};

export default AppointmentsTable;