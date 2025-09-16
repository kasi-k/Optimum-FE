import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import { profiledetailsData } from "../../../component/Data";
import { ClipboardPenLine, Pencil } from "lucide-react";
import profile from "../../../assets/images/profile.jpg";
import Apply_Leave from "./Apply_Leave";
import Edit_Profile from "./Edit_Profile";
import Dropdown from "../../../component/Dropdown";
import { Navigate, useNavigate } from "react-router-dom";
import Change_Password from "./Change_Password";
import WFH_Leave from "./wfh_leave/WFH_Leave";
const Profile = () => {
  const navigate = useNavigate();
  const [editprofile, setEditprofile] = useState(false);
  const [changepassword, setChangepassword] = useState(false);

  const profileFields = [
    { label: "Employee ID", key: "employeeId" },
    { label: "Name", key: "name" },
    { label: "Designation", key: "designation" },
    { label: "Gender", key: "gender" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Mobile Number", key: "mobileNumber" },
    { label: "Email ID", key: "emailId" },
    { label: "Joining Date", key: "joiningDate" },
    { label: "Language", key: "language" },
    { label: "Reporting Person", key: "reportingPerson" },
    { label: "Address", key: "address" },
  ];

   const dropdownItems = [
    // {
    //   label: "Edit Profile",
    //   onClick: () => setEditprofile(true),
    // },
    // {
    //   label: "Change Password",
    //   onClick: () => setChangepassword(true),
    // },
    {
      label: "Logout",
      onClick: () => navigate('/'),
    },
  ];

  return (
    <div>
      <NavBar title="Dashboard" pagetitle="Profile" />
      <div className="lg:grid grid-cols-12 flex flex-col gap-3 py-3">
        <div className="lg:col-span-5 flex flex-col gap-3  rounded-lg text-white">
          <div className="flex justify-between lg:mb-2  dark:bg-layout-dark bg-layout-light text-black dark:text-white rounded-lg p-4">
            <div className="flex items-center gap-4 ">
              <img className=" w-24 h-24 rounded-md border border-gray-500" src={profile} alt="" />
              <span>
                <p className="font-bold text-xl">Name</p>
                <p className="text-sm">
                  Designation: <span className="text-gray-500">Doctor</span>
                </p>
                <p className="text-sm">
                  Login: <span className="text-gray-500">9:30am</span>
                </p>
              </span>
            </div>
            <div className="p-2">
              <Dropdown items={dropdownItems} />
            </div>
          </div>
          <div className="dark:bg-layout-dark bg-layout-light text-black dark:text-white rounded-lg p-6">
            <p className="text-lg font-semibold pb-6">Profile info</p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              {profileFields.map(({ label, key }) => (
                <React.Fragment key={key}>
                  <div className="col-span-1">
                    <p className="text-sm font-semibold">{label}</p>
                  </div>
                  <div className="col-span-1 text-end">
                    <p className="text-sm text-gray-500">
                      {profiledetailsData[key] || "—"}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 md:grid-cols-1 dark:bg-layout-dark bg-layout-light h-fit px-4 py-2 rounded-xl dark:text-white text-black">
        <WFH_Leave />
        </div>
      </div>
     
      {editprofile && (<Edit_Profile onclose={()=>{setEditprofile(false)}}/>)}
      {changepassword && (<Change_Password onclose={()=>{setChangepassword(false)}}/>)}
    </div>
  );
};

export default Profile;
