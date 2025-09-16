import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LeadsTable from "./LeadsTable";
import AppointmentsTable from "./AppointmentsTable";
import InvoiceTable from "./InvoiceTable";

const ViewCampaign = () => {
  const [isOpenLeads, setIsOpenLeads] = useState(false);
  const [isOpenAppointments, setIsOpenAppointments] = useState(false);
  const [isOpenInvoice, setIsOpenInvoice] = useState(false);
  const toggleOpen = () => {
    setIsOpenLeads(!isOpenLeads);
  };
  const toggleOpen1 = () => {
    setIsOpenAppointments(!isOpenAppointments);
  };

  const toggleOpen2 = () => {
    setIsOpenInvoice(!isOpenInvoice);
  };
  return (
    <>
      <NavBar title="Campaign" pagetitle="View Campaign" />
      <div className="font-roboto-flex  grid lg:grid-cols-12 md:grid-cols-9 grid-cols-3 gap-3 dark:text-white my-6">
        <div className="col-span-3 p-4 space-y-4 dark:bg-layout-dark bg-white   w-full rounded-lg ">
          <p className="font-bold text-base">Campaign Details</p>
          <div className="grid  lg:grid-cols-5 grid-cols-4 gap-2 font-light text-xs">
            <p className="col-span-3">Name</p>
            <p className="col-span-1">Name</p>
            <p className="col-span-3">date</p>
            <p className="col-span-1">21.02.2025</p>
          </div>
        </div>
        <div className="col-span-3 p-4 space-y-4 dark:bg-layout-dark bg-white   w-full rounded-lg">
          <p className="font-bold text-base">Social Media Details</p>
          <div className="grid  lg:grid-cols-5 grid-cols-4 gap-2 font-light text-xs">
            <p className="col-span-3">Platform</p>
            <p className="col-span-1">Instagram</p>
            <p className="col-span-3">Link</p>
            <p className="col-span-1">link</p>
          </div>
        </div>
        <div className="col-span-3 p-4 space-y-4 dark:bg-layout-dark bg-white   w-full rounded-lg">
          <p className="font-bold text-base">Leads Details</p>
          <div className="grid  lg:grid-cols-5 grid-cols-4 gap-2 font-light text-xs">
            <p className="col-span-3">Leads Count</p>
            <p className="col-span-1">#23456</p>
            <p className="col-span-3">Appointments</p>
            <p className="col-span-1">456</p>
            <p className="col-span-3">Sales</p>
            <p className="col-span-1">788</p>
          </div>
        </div>
        <div className="col-span-3 p-4 space-y-4 dark:bg-layout-dark bg-white   rounded-lg">
          <p className="font-bold text-base">Leads</p>
          <div className="grid  lg:grid-cols-5 grid-cols-4 gap-2 font-light text-xs">
            <p className="col-span-3">Leads Cost</p>
            <p className="col-span-1">35</p>
            <p className="col-span-3">CAC</p>
            <p className="col-span-1">456</p>
          </div>
        </div>
        <div className="col-span-6 p-3.5 dark:bg-layout-dark bg-white flex justify-between items-center   w-full rounded-lg">
          <p className="font-bold text-base mx-4">Total Expense</p>
          <p className="text-select_layout-dark text-xs mx-4">00000</p>
        </div>
        <div className="col-span-6 p-3.5 dark:bg-layout-dark bg-white flex justify-between items-center   w-full rounded-lg">
          <p className="font-bold text-base mx-4">Total Revenue</p>
          <p className="text-select_layout-dark text-xs mx-4">00000</p>
        </div>
        <div className="col-span-12 p-3.5 dark:bg-layout-dark bg-white w-full rounded-lg">
          <div
            onClick={toggleOpen}
            className="mx-4 flex justify-between items-center  "
          >
            <p className="font-bold text-base ">Leads</p>
            <p className="">
              {isOpenLeads ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
        </div>
        {isOpenLeads && (
          <div className="w-full col-span-12">
            <LeadsTable />
          </div>
        )}
        <div className="col-span-12 p-3.5 dark:bg-layout-dark bg-white    w-full rounded-lg">
          <div
            onClick={toggleOpen1}
            className="mx-4 flex justify-between items-center  "
          >
            <p className="font-bold text-base ">Appointments</p>
            <p className="">
              {isOpenAppointments ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
        </div>
        {isOpenAppointments && (
          <div className="w-full col-span-12">
            <AppointmentsTable />
          </div>
        )}
        {/* <div className="col-span-12 p-3.5 dark:bg-layout-dark bg-white    w-full rounded-lg">
          <div
            onClick={toggleOpen2}
            className="mx-4 flex justify-between items-center  "
          >
            <p className="font-bold text-base ">Invoice</p>
            <p className="">
              {isOpenInvoice ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </p>
          </div>
        </div>
        {isOpenInvoice && <div className="w-full col-span-12"><InvoiceTable/></div>} */}
      </div>
    </>
  );
};

export default ViewCampaign;
