import React from "react";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import ThemeToggle from "../../component/ThemeToggle";
import Title from "../../component/Title";
import Logo_L from "../../assets/images/Logo(light).png";
import Logo_D from "../../assets/images/Logo(dark).png";

const Header = ({ open, setOpen }) => {
  return (
    <div className="flex justify-between  py-2 mb-4 items-center">
      <div className="hidden sm:block">
        <Title title={"Dashboard"} sub_title={"Main Dashboard"} />
      </div>
      <div className=" flex items-center   w-screen sm:w-auto justify-between">
        <div className="sm:hidden flex  gap-4 items-center">
          <IoMdMenu
            className="text-2xl text-layout_text-light dark:text-layout_text-dark"
            onClick={() => setOpen(!open)}
          />
          {open && (
            <>
              <img src={Logo_L} alt="logo" className="w-36 dark:hidden -ml-6" />
              <img
                src={Logo_D}
                alt="logo"
                className="hidden w-36 dark:block -ml-6"
              />
            </>
          )}
        </div>
        <div className="bg-layout-light dark:bg-layout-dark flex rounded-4xl px-3 py-2 justify-between ">
          <div className="flex">
            <div className="md:flex hidden justify-center gap-2 items-center p-1 rounded-full outline-none bg-overall_bg-light dark:bg-overall_bg-dark">
              <CiSearch
                size={20}
                className="text-header_icons-light dark:text-header_icons-dark "
              />
              <input
                type="text"
                name="search"
                placeholder="search"
                id="search"
                className="placeholder:text-header_icons-light dark:placeholder:text-header_icons-dark text-header_icons-light dark:text-header_icons-dark w-36 bg-transparent outline-none"
              />
            </div>
            <div className="relative md:flex justify-center  items-center bg-overall_bg-light dark:bg-overall_bg-dark rounded-full mx-2 p-2 px-2.5 cursor-pointer">
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-black"></div>
              <GoBell className="size-5  text-header_icons-light dark:text-header_icons-dark" />
            </div>
          </div>
          <div className="flex  text-header_icons-light dark:text-header_icons-dark font-layout-font justify-center items-center gap-2">
            <p className="hidden lg:block font-layout-font">Profile name</p>
            <p className="bg-overall_bg-light dark:text-header_icons-dark text-header_icons-light dark:bg-overall_bg-dark rounded-full p-2 px-2.5">
              KA
            </p>
          </div>
          <span className="pl-2  ">
            <ThemeToggle />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
