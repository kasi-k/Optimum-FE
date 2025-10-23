import { useState } from "react";
import { ClipboardPenLine } from "lucide-react";
import Apply_Leave from "../Apply_Leave";
import Apply_WFH from "../Apply_WFH";
const WFH_Leave=({employeeId ,reportingPerson})=> {
  const [activeTab, setActiveTab] = useState("leave"); // leave | wfh
  const [applyModal, setApplyModal] = useState(false);

  console.log(employeeId);
  console.log(reportingPerson);
  
  

const leaves = [
  {
    sno: 1,
    dateApplied: "12.04.2025",
    leaveType: "Sick Leave",
    duration: "1 Day",
    reason: "Health issue",
    status: "Approved",
  },
  {
    sno: 2,
    dateApplied: "15.04.2025",
    leaveType: "Casual Leave",
    duration: "2 Days",
    reason: "Personal",
    status: "Pending",
  },
  {
    sno: 3,
    dateApplied: "20.04.2025",
    leaveType: "Earned Leave",
    duration: "5 Days",
    reason: "Family function",
    status: "Approved",
  },
  {
    sno: 4,
    dateApplied: "25.04.2025",
    leaveType: "Maternity Leave",
    duration: "30 Days",
    reason: "Childbirth",
    status: "Pending",
  },
  {
    sno: 5,
    dateApplied: "28.04.2025",
    leaveType: "Casual Leave",
    duration: "1 Day",
    reason: "Bank work",
    status: "Rejected",
  },
];

const wfhData = [
  {
    sno: 1,
    dateApplied: "10.04.2025",
    leaveType: "Work From Home",
    duration: "3 Days",
    reason: "Remote work request",
    status: "Approved",
  },
  {
    sno: 2,
    dateApplied: "18.04.2025",
    leaveType: "Work From Home",
    duration: "1 Day",
    reason: "Travel",
    status: "Pending",
  },
  {
    sno: 3,
    dateApplied: "22.04.2025",
    leaveType: "Work From Home",
    duration: "2 Days",
    reason: "Client meetings",
    status: "Approved",
  },
  {
    sno: 4,
    dateApplied: "25.04.2025",
    leaveType: "Work From Home",
    duration: "5 Days",
    reason: "Shift to native place",
    status: "Pending",
  },
  {
    sno: 5,
    dateApplied: "27.04.2025",
    leaveType: "Work From Home",
    duration: "1 Day",
    reason: "Medical appointment",
    status: "Rejected",
  },
];

  const currentData = activeTab === "leave" ? leaves : wfhData;

  return (
    <div>
      <div className="justify-between items-center flex m-2">
        <div className="flex gap-2 ">
        <button
          onClick={() => setActiveTab("leave")}
          className={`px-4 py-2 rounded-md font-medium cursor-pointer ${
            activeTab === "leave"
              ? "dark:bg-black/30 bg-overall_bg-light dark:text-white text-black"
              : " text-gray-600 dark:text-gray-300"
          }`}
        >
        Leaves
        </button>
        <button
          onClick={() => setActiveTab("wfh")}
          className={`px-4 py-2 rounded-md font-medium cursor-pointer ${
            activeTab === "wfh"
              ? "dark:bg-black/30 bg-overall_bg-light dark:text-white text-black"
              : " text-gray-600 dark:text-gray-300"
          }`}
        >
        WFH
        </button>
      </div>
        <p
          onClick={() => setApplyModal(true)}
          className="cursor-pointer w-fit flex items-center text-white gap-2 bg-select_layout-dark px-4 py-2 text-sm rounded-md"
        >
          <ClipboardPenLine size={18} />
          {activeTab === "leave" ? "Apply Leave" : "Apply WFH"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="dark:bg-overall_bg-dark bg-overall_bg-light border-b-2 pb-2 dark:border-layout-dark border-layout-light ">
              <th className="px-2 py-3 rounded-l-md">S.No</th>
              <th className="p-2">Date Applied</th>
              <th className="p-2">Type</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Reason</th>
              <th className="p-2 rounded-r-md">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, idx) => (
              <tr
                key={idx}
                className="dark:bg-overall_bg-dark bg-overall_bg-light border-b-2 dark:border-layout-dark border-layout-light rounded-lg text-center"
              >
                <td className="px-2 py-3 text-sm rounded-l-md">{item.sno}</td>
                <td className="p-2">{item.dateApplied}</td>
                <td className="p-2">{item.leaveType}</td>
                <td className="p-2">{item.duration}</td>
                <td className="p-2">{item.reason}</td>
                <td className="p-2 text-sm w-32 px-5 items-center rounded-r-md">
                  <p className="border w-28 dark:bg-layout-dark bg-layout-light text-gray-600 dark:text-white font-medium dark:border-layout-dark border-layout-light rounded-md py-1">
                    {item.status}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {applyModal &&
        (activeTab === "leave" ? (
          <Apply_Leave onclose={() => setApplyModal(false)}/>
        ) : (
          <Apply_WFH onclose={() => setApplyModal(false)} employeeId={employeeId} reportingPerson={reportingPerson} />
        ))}
    </div>
  );
}

export default WFH_Leave;
