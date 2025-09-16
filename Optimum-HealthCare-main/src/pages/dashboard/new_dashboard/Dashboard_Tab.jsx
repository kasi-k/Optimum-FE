import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import Admin_Dashboard from "../new_dashboard/Admin_Dashboard";
import Employee_Dashboard from "../new_dashboard/Employee_Dashboard";

const Dashboard_Tab = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <NavBar
        title="Dashboard"
        pagetitle={activeTab === "1" ? "Admin Dashboard" : activeTab === "2" ? "Employee Dashboard" : ""}
      />
      <div className="cursor-pointer flex justify-between items-center">
        <div className="font-layout-font flex gap-2 py-2 dark:text-white">
          <p
            className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "1" ? "dark:bg-layout-dark bg-layout-light" : ""
            }`}
            onClick={() => setActiveTab("1")}
          >
            Admin
          </p>
          <p
            className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "2" ? "dark:bg-layout-dark bg-layout-light" : ""
            }`}
            onClick={() => setActiveTab("2")}
          >
            Employee
          </p>
        </div>
      </div>

      {activeTab === "1" ? <Admin_Dashboard /> : activeTab === "2" ? <Employee_Dashboard /> : null}
    </>
  );
};

export default Dashboard_Tab;
