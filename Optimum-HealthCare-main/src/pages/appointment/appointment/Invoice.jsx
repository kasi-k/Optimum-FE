import React, { useState } from "react";
import { GoPeople } from "react-icons/go";
import { TbCalendarTime, TbFileExport } from "react-icons/tb";
import NavBar from "../../../component/NavBar";
import { Filter } from "lucide-react";
import Logo_L from "../../../assets/images/Logo(light).png";
import Logo_D from "../../../assets/images/Logo(dark).png";
import{  useRef } from "react";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const [activeTab, setActiveTab] = useState("2");
  const invoiceRef = useRef(); 
  const isDisabled = activeTab === "2";
 const handleExport = () => {
    const element = invoiceRef.current;
    const opt = {
      margin:       0,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };
  return (
    <>
      <NavBar
        title="Appointment"
        // pagetitle={activeTab === "2" ? "Appointments" : "Patients"}
        pagetitle="Appoinments"
      />
      {/* <div className="cursor-pointer flex justify-between items-center">
        <div className="font-layout-font flex gap-2 py-2 dark:text-white">
          <p
            className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "1" ? "dark:bg-layout-dark bg-layout-light" : ""
            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => {
              if (!isDisabled) setActiveTab("1");
            }}
          >
            <GoPeople size={24} /> Patients
          </p>
          <p
            className={`flex gap-2 items-center px-4 py-3 font-semibold rounded-sm text-sm ${
              activeTab === "2" ? "dark:bg-layout-dark bg-layout-light" : ""
            }`}
            onClick={() => setActiveTab("2")}
          >
            <TbCalendarTime size={24} /> Appointments
          </p>
        </div>
      </div> */}
      <div className="relative mt-16">
        <div className="font-layout-font absolute -top-13 right-0 flex justify-end items-center gap-2 pb-2">
          <p   onClick={handleExport} className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
            <TbFileExport />
            Export
          </p>
          <p className="cursor-pointer flex items-center gap-1.5 dark:text-white dark:bg-layout-dark bg-layout-light px-4 py-2 rounded-md">
            <Filter />
            Filter
          </p>
        </div>
      </div>
      <div className="dark:bg-black rounded-md bg-white h-fit w-full  py-10 px-20"   >
       <div className="flex justify-center" ref={invoiceRef}>
         <div className=" w-3/12   dark:bg-layout-dark bg-layout-light">
          <div className="w-full flex pt-10 mb-20 justify-center">
            <img src={Logo_L} alt="logo" className="w-44 dark:hidden " />
            <img src={Logo_D} alt="logo" className="hidden w-44 dark:block " />
          </div>
          <div className="w-full px-8 text-layout_text-light dark:text-layout_text-dark ">
            <div className=" py-3  border-y">
              <p className="pt-2 pb-1.5 font-semibold text-xl">Invoice to:</p>
              <ul className=" space-y-2 mb-2 text-sm">
                <li>Name</li>
                <li>Address</li>
                <li>Phone Number</li>
                <li>Email ID</li>
              </ul>
            </div>
             <div className=" py-3 mt-32  border-y">
              <p className="pt-2 pb-1.5 font-semibold text-xl">Payment:</p>
              <ul className=" space-y-2 text-sm mb-2">
                <li>Payment mode</li>
                <li>Payment details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-9/12  dark:bg-[#474747] bg-overall_bg-light">
         <div className=" w-full justify-end flex px-20 py-12">
          <p className="font-layout-font text-7xl dark:text-layout_text-dark text-layout_text-light font-semibold ">Invoice</p>
         </div>
         <div className="p-4 px-10 w-full my-32">
      <table className="w-full text-left text-white border-collapse">
        <thead className="">
          <tr className=" text-center text-xl ">
            <th className="dark:bg-layout-dark bg-layout-light  text-layout_text-light dark:text-layout_text-dark font-light  rounded-l-2xl py-5 px-4 ">S.no</th>
            <th className="dark:bg-layout-dark bg-layout-light  text-layout_text-light dark:text-layout_text-dark font-light py-5 px-4">Item</th>
            <th className="dark:bg-layout-dark bg-layout-light  text-layout_text-light dark:text-layout_text-dark font-light py-5 px-4">Price</th>
            <th className="dark:bg-layout-dark bg-layout-light  text-layout_text-light dark:text-layout_text-dark font-light rounded-r-2xl py-5 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className=" text-center border-b  border-white">
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark">1</td>
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark">Name</td>
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark">Price</td>
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark">Total</td>
          </tr>
          <tr className=" border-b border-white">
            <td colSpan="3" className="py-2 px-4  text-layout_text-light dark:text-layout_text-dark  text-right pr-12 font-medium">
              Sub Total
            </td>
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark font-medium text-center">₹3452</td>
          </tr>
          <tr className=" border-white border-b ">
            <td colSpan="3" className="py-2 px-4  text-layout_text-light dark:text-layout_text-dark text-right pr-12 font-medium">
              Discount
            </td>
            <td className="py-4 px-4  text-layout_text-light dark:text-layout_text-dark text-center font-medium">₹3452</td>
          </tr>
        </tbody>
      </table>
    </div>
         <div className="mt-[276px] flex flex-col  w-full text-end px-10 dark:text-layout_text-dark text-layout_text-light ">
          <p>
            Name
          </p>
          <p>Signature</p>
         </div>
         <div className="mt-20  w-full text-center px-10 dark:text-layout_text-dark text-layout_text-light    ">
          <hr />
          <p className="pt-5 pb-10">Thank You</p>
         </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default Invoice;
