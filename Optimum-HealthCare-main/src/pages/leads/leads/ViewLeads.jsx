import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import { MdModeEdit } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import AddFollowUp from "./AddFollowUp";
import profile from "../../../assets/images/profile.jpg";
import EditLeadDetails from "./EditLeadDetails";
import MultiDocuments from "./MultiDocuments";
import { UserPlus } from "lucide-react";

const ViewLeads = () => {
  const navigate = useNavigate();
  const [addFollowUp, setAddFollowUp] = useState(false);
  const [multidocuments, setMultidocuments] = useState(false);
  const [editLeadsDetails, setEditLeadsDetails] = useState(false);
  const location = useLocation();
  const { lead } = location.state || {};

  const fields = [
    { label: "Lead ID", value: lead.leadId },
    { label: "Created Date", value: lead.createdDate },
    { label: "Lead Type", value: lead.leadType },
    { label: "Name", value: lead.name },
    { label: "Age", value: lead.age },
    { label: "Weight", value: lead.weight },
    { label: "Circle", value: lead.circle },
    { label: "BD Name", value: lead.bdName || "—" },
    { label: "Comments", value: lead.comments },
    { label: "Status", value: lead.status },
    { label: "Lead Transfer", value: lead.leadTransfer },
  ];
  return (
    <>
      <NavBar title="Leads" pagetitle="View Leads" />
      <div className="font-layout-font mb-3 overflow-auto no-scrollbar">
        <div className="flex justify-end my-2 gap-2 ">
          <button
            onClick={() => setMultidocuments(true)}
            className="font-normal flex  items-center  gap-2 text-sm bg-select_layout-dark rounded-md text-white px-6 py-2.5 "
          >
            <FaRegFileAlt size={20} /> Add Documents
          </button>
          <button
            onClick={() => setAddFollowUp(true)}
            className="font-normal flex  items-center  gap-2 text-sm bg-select_layout-dark rounded-md text-white px-6 py-2.5 "
          >
            <UserPlus size={20} /> Add FollowUp
          </button>
        </div>
        <div className="grid  gap-4 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 my-4 ">
          <div className=" dark:bg-[#454545] bg-purple-100 rounded-md drop-shadow-lg  ">
            <div className=" flex justify-between h-48"></div>
            <div className="dark:bg-layout-dark bg-layout-light flex justify-between items-center rounded-b-md p-4 ">
              <div className="mx-2 py-6">
                <span className="drop-shadow-md shadow-lg grid -mt-22  text-white font-semibold text-4xl bg-overall_bg-dark rounded-full  w-24 h-24 items-center justify-center ">
                  <img
                    src={profile}
                    alt="img"
                    className="w-30 rounded-full h-24"
                  />
                </span>
                <p className=" mt-4 mx-3 dark:text-white font-semibold ">
                  Name
                </p>
                <p className="my-1 mx-3 dark:text-gray-200  font-extralight text-sm">
                  8974612300
                </p>
              </div>
              <div className="grid -mt-36 mx-2 my-2">
                <button
                  className="flex items-center gap-1 px-4 bg-blue-200 text-blue-400 rounded-sm py-2"
                  onClick={() => setEditLeadsDetails(true)}
                >
                  <MdModeEdit />
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className="dark:bg-layout-dark bg-layout-light dark:text-white px-8 py-6 rounded-md drop-shadow-lg">
            <p className="font-semibold">Follow Up</p>
            <div className="mt-4 space-y-6 overflow-y-auto h-64 no-scrollbar pr-2">
              <div>
                <p className="font-semibold flex gap-4">
                  <span className="bg-blue-200 text-blue-400 px-2 py-2 rounded">
                    <FaRegFileAlt />
                  </span>
                  Next Follow up on 30/09/2024
                </p>
                <p className="text-xs mx-12 dark:text-gray-400 font-extralight">
                  Note
                </p>
                <p className="text-sm mx-12 font-extralight dark:text-gray-50">
                  Ravikumar 27/09/2024,10:00am
                </p>
              </div>
               <div>
                <p className="font-semibold flex gap-4">
                  <span className="bg-blue-200 text-blue-400 px-2 py-2 rounded">
                    <FaRegFileAlt />
                  </span>
                  Next Follow up on 30/09/2024
                </p>
                <p className="text-xs mx-12 dark:text-gray-400 font-extralight">
                  Note
                </p>
                <p className="text-sm mx-12 font-extralight dark:text-gray-50">
                  Ravikumar 27/09/2024,10:00am
                </p>
              </div>
               <div>
                <p className="font-semibold flex gap-4">
                  <span className="bg-blue-200 text-blue-400 px-2 py-2 rounded">
                    <FaRegFileAlt />
                  </span>
                  Next Follow up on 30/09/2024
                </p>
                <p className="text-xs mx-12 dark:text-gray-400 font-extralight">
                  Note
                </p>
                <p className="text-sm mx-12 font-extralight dark:text-gray-50">
                  Ravikumar 27/09/2024,10:00am
                </p>
              </div> <div>
                <p className="font-semibold flex gap-4">
                  <span className="bg-blue-200 text-blue-400 px-2 py-2 rounded">
                    <FaRegFileAlt />
                  </span>
                  Next Follow up on 30/09/2024
                </p>
                <p className="text-xs mx-12 dark:text-gray-400 font-extralight">
                  Note
                </p>
                <p className="text-sm mx-12 font-extralight dark:text-gray-50">
                  Ravikumar 27/09/2024,10:00am
                </p>
              </div>
              <div>
                <p className="font-semibold flex gap-4">
                  <span className="bg-blue-200 text-blue-400 px-2 py-2 rounded">
                    <FaRegFileAlt />
                  </span>
                  Next Follow up on 30/09/2024
                </p>
                <p className="text-xs mx-12 dark:text-gray-400 font-extralight">
                  Note
                </p>
                <p className="text-sm mx-12 font-extralight dark:text-gray-50">
                  Ravikumar 27/09/2024,10:00am
                </p>
              </div>
            </div>
          </div>

          <div className=" grid text-sm  dark:bg-layout-dark bg-layout-light dark:text-white rounded-md drop-shadow-lg px-8 py-8 gap-2 ">
            <p className="mb-3 font-semibold">Leads Details</p>
            {fields.map((item, idx) => (
              <div key={idx} className="grid grid-cols-8 items-center">
                <span className="col-span-4 font-medium">{item.label}</span>
                <span className="col-span-4 text-end text-gray-600 dark:text-gray-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className=" grid text-sm  dark:bg-layout-dark bg-layout-light dark:text-white rounded-md drop-shadow-lg px-8 py-8 gap-2 ">
            <p className="mb-3 font-semibold">Added Documents</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end  mb-8 relative ">
        <p
          onClick={() => navigate("/leads")}
          className=" cursor-pointer text-lg dark:text-white absolute flex items-center gap-2 bg-select_layout-dark rounded-sm py-1.5 px-8 -bottom-10 right-0 "
        >
          <IoChevronBackSharp /> back
        </p>
      </div>
      {addFollowUp && <AddFollowUp onclose={() => setAddFollowUp(false)} />}
      {multidocuments && (
        <MultiDocuments onclose={() => setMultidocuments(false)} />
      )}
      {editLeadsDetails && (
        <EditLeadDetails onclose={() => setEditLeadsDetails(false)} />
      )}
    </>
  );
};

export default ViewLeads;
