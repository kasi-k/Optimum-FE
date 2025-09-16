import React, { useState } from "react";
import NavBar from "../../component/NavBar";
import { IoBrowsersOutline } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import BlogTab from "./Blogs/BlogTab";
import WebsiteUpdates from "./website/WebsiteUpdates";

const Cms = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
      <NavBar
        title="CMS"
        pagetitle={activeTab === "1" ? "Website Updates" : "Blogs"}
      />
      <div className="cursor-pointer flex justify-between items-center ">
        <div className="font-layout-font flex gap-2  py-2 dark:text-white">
          <p
            className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "1" ? "dark:bg-layout-dark bg-layout-light " : ""
            }`}
            onClick={() => setActiveTab("1")}
          >
            <IoBrowsersOutline size={24} />
            Website Updates
          </p>
          <p
            className={`flex  gap-2  items-center  px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "2" ? "dark:bg-layout-dark bg-layout-light" : ""
            }`}
            onClick={() => setActiveTab("2")}
          >
            <CgWebsite size={24} />
            Blogs
          </p>
        </div>
      </div>
      {activeTab === "1" ? <WebsiteUpdates /> : <BlogTab />}
    </>
  );
};

export default Cms;
