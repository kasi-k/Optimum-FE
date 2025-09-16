import React, { useState } from "react";
import Logo_L from "../../../assets/images/Logo(light).png";
import Logo_D from "../../../assets/images/Logo(dark).png";
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { TbDirectionSign } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { MessageSquareMore } from "lucide-react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Editupdate from "./Editupdate";

const Website = () => {
  const navigate = useNavigate();
  const [editWebsite, setEditWebsite] = useState(false);

  const handleEditGmb = () => {
    setEditWebsite(true);
  };

  return (
    <>
      {!editWebsite && (
        <div className=" font-layout-font flex justify-between items-start">
          <div className="dark:bg-layout-dark dark:text-white bg-layout-light  p-6 space-y-4 w-96 font-medium">
            <img src={Logo_L} alt="logo" className="w-48 dark:hidden " />
            <img src={Logo_D} alt="logo" className="hidden w-48 dark:block " />
             <div className="relative">
                      <p
                        onClick={handleEditGmb}
                        className="cursor-pointer absolute -top-24 right-1 rounded-md flex gap-2 items-center bg-blue-200  text-blue-500 px-2 py-2.5   "
                      >
                        {" "}
                        <Pencil size={16} />
                       
                      </p>
                    </div>
            <p className="flex items-center gap-4 p-1.5">
              <span className="bg-[#D8CAFF] text-select_layout-dark rounded-full p-2">
                <GrLocation size={20} />
              </span>
              Location
            </p>
            <p className="flex items-center gap-4 p-1.5">
              <span className="bg-[#FCD8FF] text-[#F14EFE] rounded-full p-2">
                <FiPhone size={20} />
              </span>
              9678451230
            </p>
            <p className="flex items-center gap-4 p-1.5">
              <span className="bg-[#FFCDCD] text-[#FF4545] rounded-full p-2">
                <TbDirectionSign size={20} />
              </span>
              Directions
            </p>
            <p className="flex items-center gap-4 p-1.5">
              <span className="bg-[#FFC7D0] text-[#FB4A70] rounded-full p-2">
                <FiInfo size={20} />
              </span>
              About
            </p>
            <p className="flex items-center gap-4 p-1.5">
              <span className="bg-[#D9CDFF] text-select_layout-dark rounded-full p-2">
                <MessageSquareMore size={20} />
              </span>
              Review
            </p>
          </div>
        </div>
      )}
      {editWebsite && <Editupdate onclose={() =>setEditWebsite(false)}/>}
    </>
  );
};

export default Website;
