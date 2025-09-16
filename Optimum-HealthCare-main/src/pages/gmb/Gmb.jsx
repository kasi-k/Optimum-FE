import React, { useState } from "react";
import { MessageSquareMore } from "lucide-react";
import { TbSettingsExclamation } from "react-icons/tb";
import GmbSettings from "./GmbSettings";
import GoogleReviews from "./GoogleReviews";
import NavBar from "../../component/NavBar";

const Gmb = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
    <NavBar  title="GMB"
        pagetitle={activeTab === "1" ? "GMB Settings" : "Google Reviews"}/>
    <div className="cursor-pointer flex justify-between items-center ">
      <div className="font-layout-font flex gap-2  py-2 dark:text-white">
        <p
          className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
            activeTab === "1" ? "dark:bg-layout-dark bg-layout-light " : ""
          }`}
          onClick={() => setActiveTab("1")}
        >
          <TbSettingsExclamation className="size-6 " />
          GMB Settings
        </p>
        <p
          className={`flex  gap-2  items-center  px-4 py-3 font-semibold rounded-sm text-sm ${
            activeTab === "2" ? "dark:bg-layout-dark bg-layout-light" : ""
          }`}
          onClick={() => setActiveTab("2")}
        >
          <MessageSquareMore /> Google Reviews
        </p>
      </div>
    </div>
    {activeTab === "1" ?<GmbSettings/>:<GoogleReviews/>}
    </>
  );
};

export default Gmb;
