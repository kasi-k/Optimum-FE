import React, { useState, useEffect, useRef } from "react";
import { Search, Bell } from "lucide-react";
import { useSearch } from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import Notification from "../pages/dashboard/Notification";

const NavBar = ({ pagetitle, title }) => {
  const navigate = useNavigate()
  const { searchTerm, setSearchTerm } = useSearch();
  const dropdownRef = useRef(null);
const [notification, setNotification] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div className=" font-layout-font flex-wrap flex justify-between items-center text-sm my-1.5 dark:text-white overflow-auto no-scrollbar">
          <div className="mx-2  space-y-1">
            <div className="flex gap-1 font-normal text-base">
              <p className="">{title}</p>/<p>{pagetitle}</p>
            </div>
            <p className=" font-bold text-lg my-1">{pagetitle}</p>
          </div>

          <div className="flex justify-center lg:p-2 md:p-2 p-1.5 lg:gap-2 md:gap-2 gap-1.5 bg-layout-light dark:bg-layout-dark items-center text-center dark:text-white rounded-full">
            <p className="lg:mx-1 md:mx-1 mx-0 flex lg:gap-2 md:gap-2 gap-1.5 rounded-full items-center lg:p-2 md:p-2 p-1.5 dark:bg-overall_bg-dark bg-overall_bg-light">
              <Search className="size-5" />
              <input
                type="text"
                className="w-48 outline-0"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </p>
            <p className="dark:bg-overall_bg-dark bg-overall_bg-light lg:p-2 md:p-2 p-1.5 rounded-full"
            onClick={()=>{setNotification(true)}}>
              <Bell className="size-5" />
            </p>
            <div className=" flex  items-center gap-2 text-xs text-nowrap ">
              Profile name
              <span className="">
                <div className="">
                  <button className="dark:bg-overall_bg-dark bg-overall_bg-light w-9 h-9 rounded-full flex items-center justify-center"
                  onClick={()=>{navigate('/dashboard/profile')}}>
                    KA
                  </button>
                </div>
              </span>
            </div>
            <div className="pb-0.5 ">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      {notification && (<Notification onclose={()=>{setNotification(false)}}/>)}
    </>
  );
};

export default NavBar;
