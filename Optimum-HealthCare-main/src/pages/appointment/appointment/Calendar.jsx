import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { IoArrowBackSharp } from "react-icons/io5";

const appointments = [
  { date: "2025-04-06", status: "Confirmed" },
  { date: "2025-04-08", status: "Pending" },
  { date: "2025-04-08", status: "Confirmed" },
  { date: "2025-04-08", status: "Completed" },
  { date: "2025-04-13", status: "Pending" },
  { date: "2025-04-19", status: "Cancelled" },
  { date: "2025-04-30", status: "Completed" },
  { date: "2025-03-19", status: "Cancelled" },
  { date: "2025-03-30", status: "Completed" },
  { date: "2025-05-01", status: "Cancelled" },
  { date: "2025-05-02", status: "Completed" },
];

const statuses = {
  Confirmed: " text-green-600",
  Pending: " text-yellow-500",
  Cancelled: "text-red-500",
  Completed: " text-purple-500",
};

const barstatuses = {
  Confirmed: "bg-green-600 ",
  Pending: "bg-yellow-500 ",
  Cancelled: "bg-red-500 ",
  Completed: "bg-purple-500 ",
};

const Calendar = ({onclose}) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(3);

  const currentMonth = new Date(selectedYear, selectedMonth);
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  const years = Array.from({ length: 100 }, (_, i) => 1990 + i);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filteredAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.date);
    return (
      apptDate.getMonth() === selectedMonth &&
      apptDate.getFullYear() === selectedYear
    );
  });

  return (
    <>
    <div className="flex  dark:text-white text-black  ">
      {/* Calendar Section */}
      <div className="w-2/3 px-1 ">
        {/* Month & Year Select */}
        <div className="flex justify-between my-1 dark:bg-layout-dark bg-layout-light rounded-md px-2 py-2 items-center ">
          <div className="space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className=" dark:text-white text-black dark:bg-layout-dark bg-layout-light outline-none p-2 rounded"
            >
              {months.map((month, idx) => (
                <option key={idx} value={idx}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className=" dark:text-white text-black dark:bg-layout-dark bg-layout-light outline-none p-2 rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <span className="text-sm text-gray-400">Time zone</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center ">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div
              key={day}
              className="text-sm dark:bg-layout-dark bg-layout-light rounded-md p-4 "
            >
              {day}
            </div>
          ))}
          {Array.from({
            length: start.getDay() === 0 ? 6 : start.getDay() - 1,
          }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="dark:bg-layout-dark bg-layout-light rounded-md"
            ></div>
          ))}
          {days.map((day) => {
            const appt = appointments.find((appt) =>
              isSameDay(new Date(appt.date), day)
            );
            return (
              <div
                key={day}
                className=" h-18 dark:bg-layout-dark bg-layout-light rounded-md flex items-start "
              >
                {appt && (
                  <div
                    className={`w-2 h-full rounded-l-sm ${
                      barstatuses[appt.status]
                    }`}
                  />
                )}
                <div className="flex justify-center  items-center text-sm w-full h-full">
                  {format(day, "dd")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment List */}
      <div className="w-1/3 p-2 space-y-1">
        {filteredAppointments.map((appt, idx) => (
          <div
            key={idx}
            className="flex  justify-center items-center dark:bg-layout-dark  bg-layout-light rounded-md space-x-3"
          >
            <div
              className={`py-9 px-1 rounded-l-md ${barstatuses[appt.status]}`}
            ></div>
            <div className="flex-1 px-2 ">
              <p className="font-semibold ">Patient Name</p>
              <p className="text-sm text-gray-400">Consultant: Name</p>
            </div>
            <div className="flex flex-col items-end mx-2 ">
              <p className="text-sm text-gray-400 mb-2">
                {format(new Date(appt.date), "PPp")}
              </p>
              <span
                className={`text-sm  font-semibold px-2 ${
                  statuses[appt.status]
                }`}
              >
                {appt.status}
              </span>
            </div>
          </div>
        ))}
        
      </div>
    </div>
    <div className="flex justify-end  mb-8 relative ">
      <p onClick={onclose}  className=" cursor-pointer absolute flex items-center gap-2 bg-select_layout-dark rounded-sm py-1.5 px-4 -bottom-10 right-4 ">
      <IoArrowBackSharp /> back
      </p>
    </div>
    </>
  );
};

export default Calendar;
