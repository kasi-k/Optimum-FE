import React, { Suspense, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import {
  LayoutDashboard,
  FileWarning,
  Receipt,
  CalendarClock,
  FileBarChart,
  Wallet,
  Settings,
} from "lucide-react";
import { File, AlertTriangle } from "lucide-react";
import { Clipboard, DollarSign } from "lucide-react";
import Header from "./Header";
import Logo from "../../assets/images/icon.png";
import Logo_L from "../../assets/images/Logo(light).png";
import Logo_D from "../../assets/images/Logo(dark).png";
import NavBar from "../../component/NavBar";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const Menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={23} />,
      to: "/dashboard",
    },
      {
      title: "Tasks",
      icon:  (
        <div className="relative w-6 h-6">
          <File className="absolute  w-6 h-6" />
          <AlertTriangle className="absolute left-1.5 top-2  w-3 h-3" />
        </div>
      ),
      to: "/tasks",
    },
    // { title: "GMB", icon: <FileWarning size={23} />, to: "/gmb" },
    {
      title: "Leads",
      icon:<HiOutlineClipboardList  size={23}/>,
      to: "/leads",
    },
    // { title: "CMS", icon: <Receipt size={23} />, to: "/cms" },
    { title: "Association", icon: <Receipt size={23} />, to: "/association" },
    { title: "Appointment", icon: <CalendarClock size={23} />, to: "/appointment" },
    {
      title: "Finance",
      icon: (
        <div className="relative w-6 h-6">
          <Clipboard className="absolute " />
          <DollarSign className="absolute left-1 top-2 w-3 h-3" />
        </div>
      ),
      to: "/finance",
    },
    { title: "HR", icon: <TbAddressBook  size={23} />, to: "/hr" },
    { title: "Reports", icon: <FileBarChart size={23} />, to: "/reports" },
    // { title: "Subscription", icon: <Wallet size={23} />, to: "/subscription" },
    { title: "Settings", icon: <Settings size={23} />, to: "/setting" },
  ];

  return (
    <>
      <div className="font-layout-font w-screen h-screen flex relative sm:static  bg-overall_bg-light dark:bg-overall_bg-dark ">
        <div
          className={`${
            !open
              ? `sm:static absolute sm:w-[320px] w-4/5 z-10 sm:z-0`
              : `sm:w-28 hidden  `
          }  h-screen  sm:block dark:bg-layout-dark bg-layout-light overflow-auto no-scrollbar`}
        >
          <div
            className={`${!open ? `pl-3 pt-3` : ` pt-6 `}`}
            onClick={() => setOpen(!open)}
          >
            <IoMdMenu
              size={28}
              className={`${
                !open
                  ? `text-2xl text-layout_text-light dark:text-layout_text-dark`
                  : `hidden`
              }`}
            />

            <div className="px-2 flex justify-center w-full  items-center pb-3  ">
              {!open ? (
                <>
                  <img
                    src={Logo_L}
                    alt="logo"
                    className="w-40 dark:hidden -ml-6"
                  />
                  <img
                    src={Logo_D}
                    alt="logo"
                    className="hidden w-40 dark:block -ml-6"
                  />
                </>
              ) : (
                <img src={Logo} alt="logo" className="w-20" />
              )}
            </div>
          </div>
          <ul>
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                <NavLink to={menu.to}>
                  <li
                    className={`flex justify-start w-full pl-8 gap-3 my-1.5  items-center hover:bg-select_layout-light dark:hover:bg-select_layout-dark py-2  text-layout_text-light dark:text-layout_text-dark  hover:font-semibold hover:text-hover-text-light dark:hover:text-hover-text-dark ${
                      location.pathname && location.pathname.startsWith(menu.to)
                        ? "dark:bg-select_layout-dark bg-select_layout-light font-semibold text-white"
                        : ""
                    }`}
                  >
                    <span className="text-layout_text-light bg-overall_bg-light dark:bg-overall_bg-dark dark:text-layout_text-dark p-2 rounded-md ">
                      {menu.icon}
                    </span>
                    <p
                      className={`${open && `hidden`} font-layout-font text-base`}
                    >
                      {menu.title}
                    </p>
                  </li>
                </NavLink>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div
          className={`${
            !open ? `sm:p-4  sm:blur-none blur-sm` : ` sm:p-4 px-1.5`
          } w-screen h-screen overflow-auto no-scrollbar`}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Layout;
