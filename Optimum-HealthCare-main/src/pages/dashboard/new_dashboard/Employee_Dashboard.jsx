import React, { useEffect, useState } from "react";
import NavBar from "../../../component/NavBar";
import { TbProgress } from "react-icons/tb";
import { Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaStar } from "react-icons/fa";

const Employee_Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const statsData = [
    { title: "Leads", value: "1,245", footer: "Total Leads" },
    { title: "In Patient Details", value: "1,245", footer: "Total IPD" },
    { title: "Out Patient Details", value: "1,245", footer: "Total OPD" },
    { title: "Total Revenue", value: "1,245", footer: "Total Revenue" },
  ];

  const revenueData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 55 },
    { name: "Apr", value: 80 },
    { name: "May", value: 65 },
    { name: "Jun", value: 95 },
    { name: "Jul", value: 70 },
    { name: "Aug", value: 90 },
    { name: "Sep", value: 50 },
    { name: "Oct", value: 75 },
    { name: "Nov", value: 60 },
    { name: "Dec", value: 85 },
  ];

  const campaignData = [
    { name: "Instagram", value: 50 },
    { name: "X", value: 30 },
    { name: "Facebook", value: 20 },
  ];
  const COLORS = ["#F39C12", "#FF6384", "#FFCE56"];

  const follow_up = [
    {
      name: "Liam Harper",
      source: "Online",
      date: "2023-07-15",
      status: "New",
    },
    {
      name: "Olivia Bennett",
      source: "Referral",
      date: "2023-07-14",
      status: "Contacted",
    },
    {
      name: "Noah Carter",
      source: "Advertisement",
      date: "2023-07-13",
      status: "Qualified",
    },
    {
      name: "Emma Hayes",
      source: "Online",
      date: "2023-07-12",
      status: "New",
    },
  ];

  const appointments = [
    {
      patient: "Ava Morgan",
      department: "Cardiology",
      appointmentDate: "2023-07-20",
      doctor: "Dr. Ethan Clark",
    },
    {
      patient: "Lucas Foster",
      department: "Neurology",
      appointmentDate: "2023-07-21",
      doctor: "Dr. Sophia Reed",
    },
    {
      patient: "Isabella Hayes",
      department: "Pediatrics",
      appointmentDate: "2023-07-22",
      doctor: "Dr. Owen Bennett",
    },
    {
      patient: "Jackson Reed",
      department: "Orthopedics",
      appointmentDate: "2023-07-23",
      doctor: "Dr. Chloe Turner",
    },
  ];

  const events = [
    { title: "New Cardiology Wing Opening", date: "2023-07-10" },
    { title: "Pediatrics Department Expansion", date: "2023-07-05" },
    { title: "Hospital Anniversary Celebration", date: "2023-07-01" },
  ];

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* <NavBar title="Dashboard" pagetitle="Main Dashboard" /> */}
      <div className="my-2 grid grid-cols-1 lg:grid-cols-9 gap-3 ">
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="dark:bg-layout-dark bg-layout-light p-3 rounded-xl"
              >
                <div className="flex items-center justify-between border-l-4 border-[#81B2B8]">
                  <div className="mx-2">
                    <p className="text-green-600 text-[11px]">{stat.title}</p>
                    <p className="dark:text-white text-black text-lg font-semibold">
                      {stat.value}
                    </p>
                  </div>
                  <div className="dark:bg-[#25004C] bg-purple-800 rounded-xl p-2">
                    <TbProgress
                      size={18}
                      className="dark:text-purple-900 text-purple-500"
                    />
                  </div>
                </div>
                <p className="dark:text-white text-black pt-3 text-xs">
                  {stat.footer}
                </p>
              </div>
            ))}
          </div>
          <div className="md:col-span-1 lg:col-span-4 dark:text-white px-2 text-black rounded-xl">
            <p className="font-semibold text-xl mb-3">Today Follow-Up</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="dark:bg-black/30 border-b-2 pb-2 dark:border-overall_bg-dark border-overall_bg-light bg-layout-light">
                    <th className="p-2  rounded-l-md">Name</th>
                    <th className="p-2">Source</th>
                    <th className="p-2">Date</th>
                    <th className="p-2 rounded-r-md">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {follow_up.map((follow_up, idx) => (
                    <tr
                      key={idx}
                      className="dark:bg-black/30 border-b-2 dark:border-overall_bg-dark border-overall_bg-light bg-layout-light text-center"
                    >
                      <td className="px-2 py-3 text-sm rounded-l-md">
                        {follow_up.name}
                      </td>
                      <td className="p-2 text-sm font-semibold">
                        <span className=" text-sm font-normal">
                          {follow_up.source}
                        </span>
                      </td>
                      <td className="p-2 text-sm ">{follow_up.date}</td>
                      <td className="p-2 text-sm w-32 px-5 items-center rounded-r-md">
                        <p className="border w-28 dark:bg-overall_bg-dark bg-overall_bg-light text-gray-600 dark:text-white font-medium  dark:border-layout-dark border-layout-light rounded-md py-1">
                          {" "}
                          {follow_up.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:col-span-1 lg:col-span-4 dark:text-white px-2 text-black rounded-xl">
            <p className="font-semibold text-xl mb-3">Upcoming IPD/OPD</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="dark:bg-black/30 border-b-2 pb-2 dark:border-overall_bg-dark border-overall_bg-light bg-layout-light ">
                    <th className="px-2 py-3  rounded-l-md">Patient</th>
                    <th className="p-2">Department</th>
                    <th className="p-2">Appointment Date</th>
                    <th className="p-2 rounded-r-md">Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr
                      key={idx}
                      className="dark:bg-black/30 border-b-2 dark:border-overall_bg-dark border-overall_bg-light bg-layout-light rounded-lg text-center"
                    >
                      <td className="px-2 py-3 text-sm rounded-l-md">
                        {appt.patient}
                      </td>
                      <td className="p-2">{appt.department}</td>
                      <td className="p-2">{appt.appointmentDate}</td>
                      <td className="p-2 text-sm rounded-r-md">
                        {appt.doctor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-3 mt-6 lg:mt-0">
          <div className="dark:bg-layout-dark bg-layout-light dark:text-white text-black p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Star Performer of the Week</h2>
            <center>
              <p className="text-lg font-bold flex justify-center">
                Dr. Olivia Bennett{" "}
                <span className="flex items-center ml-2 gap-1 px-2 text-sm dark:bg-overall_bg-dark bg-overall_bg-light rounded-3xl ">
                  {" "}
                  4.9 <FaStar size={14} className="text-yellow-400" />
                </span>{" "}
              </p>
              <p className="text-xs text-gray-400 py-1">Neurology</p>
              <p className="text-xs text-gray-400 flex items-center justify-center">
                Top Rated Doctor
              </p>
            </center>
          </div>
          <div className="dark:bg-layout-dark bg-layout-light dark:text-white text-black p-4 rounded-xl">
            <h2 className="font-semibold mb-4">Latest Events & News</h2>
            <div className="relative border-l border-gray-500/50 ml-3">
              {events.map((event, idx) => (
                <div key={idx} className="mb-6 ml-4 relative">
                  <span className="absolute -left-8 flex items-center justify-center w-8 h-8 rounded-full dark:bg-layout-dark bg-layout-light">
                    <Calendar size={18} />
                  </span>
                  <div className="px-3">
                    <p className="text-sm">{event.title}</p>
                    <p className="text-sm text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dark:bg-layout-dark bg-layout-light dark:text-white text-black p-4 rounded-xl">
            <h2 className="font-semibold pb-2">My Notes</h2>
            <textarea
              name="notes"
              id="notes"
              className="w-full outline-none dark:bg-gray-600 bg-gray-200 dark:text-white text-black rounded-md px-2 py-1"
              rows={4}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee_Dashboard;
