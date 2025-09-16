import React from "react";
import Logo_L from "../../assets/images/Logo(light).png";
import Logo_D from "../../assets/images/Logo(dark).png";
import { GrLocation } from "react-icons/gr";
import { FiPhone } from "react-icons/fi";
import { VscGlobe } from "react-icons/vsc";
import { TbDirectionSign } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { AiOutlineSave } from "react-icons/ai";


const EditGmbSet = ({onclose}) => {
  return (
    <>
      <div className="font-layout-font flex justify-between items-start">
        <div className="dark:bg-layout-dark dark:text-white bg-layout-light  rounded-md p-6 space-y-2.5 w-1/3  font-medium">
          <img src={Logo_L} alt="logo" className="w-48 dark:hidden " />
          <img src={Logo_D} alt="logo" className="hidden w-48 dark:block " />
          <p className="flex items-center gap-4 p-1.5">
            <span className="bg-[#D8CAFF] text-select_layout-dark rounded-full p-2">
              <GrLocation size={20} />
            </span>
            <input
              type="text"
              className="border border-[#454545] py-2 px-2 rounded-md dark:placeholder:text-white placeholder:text-black font-normal w-64"
              placeholder="Location"
            />
          </p>
          <p className="flex items-center gap-4 p-1.5">
            <span className="bg-[#FCD8FF] text-[#F14EFE] rounded-full p-2">
              <FiPhone size={20} />
            </span>
            <input
              type="text"
              className="border border-[#454545] py-2 px-2 rounded-md dark:placeholder:text-white placeholder:text-black font-normal w-64"
              placeholder="00000000"
            />
          </p>
          <p className="flex items-center gap-4 p-1.5">
            <span className="bg-[#D2E2FF] text-[#5784F5] rounded-full p-2 ">
              <VscGlobe size={20} />
            </span>
            <input
              type="text"
              className="border border-[#454545] py-2 px-2 rounded-md dark:placeholder:text-white placeholder:text-black  font-normal w-64"
              placeholder="website link"
            />
          </p>
          <p className="flex items-center gap-4 p-1.5">
            <span className="bg-[#FFCDCD] text-[#FF4545] rounded-full p-2">
              <TbDirectionSign size={20} />
            </span>
            <input
              type="text"
              className="border border-[#454545] py-2 px-2 rounded-md dark:placeholder:text-white placeholder:text-black font-normal w-64"
              placeholder="Directions"
            />
          </p>
          <p className="flex items-center gap-4 p-1.5">
            <span className="bg-[#FFC7D0] text-[#FB4A70] rounded-full p-2">
              <FiInfo size={20} />
            </span>
            <textarea
              rows={4}
              className="border border-[#454545] py-4 px-2 rounded-md dark:placeholder:text-white placeholder:text-black  font-normal w-64"
              placeholder="About"
            />
          </p>
         
        </div>
        <div className="relative">
          <p onClick= {onclose} className=" cursor-pointer absolute -top-13 right-2.5 flex gap-2 items-center bg-select_layout-dark px-4 py-2.5 text-white rounded-lg ">
            {" "}
            <AiOutlineSave size={16} />
            Save
          </p>
        </div>
      </div>
    </>
  );
};

export default EditGmbSet;
