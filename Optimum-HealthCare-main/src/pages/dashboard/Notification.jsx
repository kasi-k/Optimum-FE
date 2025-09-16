import React from "react";
import { IoClose } from "react-icons/io5";

const Notification = ({ onclose }) => {
  const cards = Array(6).fill({
    initials: "KA",
    title: "Title",
    date: "13.03.2019",
    content:
      "Lorem ipsum dolor sit amet consectetur. Tortor eget id id adipiscing condimentum neque tincidunt. Donec molestie urna sed a euismod nibh mattis.",
  });
  return (
    <div className="font-layout-font fixed inset-0 grid z-20 justify-end items-center backdrop-blur-xs">
      <div className=" shadow-lg dark:bg-popup-gray p-6 bg-overall_bg-light dark:bg-overall_bg-dark rounded-lg drop-shadow-2xl w-[600px] h-screen relative">
        <div className="flex items-center justify-between mb-8 text-layout_text-light dark:text-layout_text-dark">
          <p className="text-center font-semibold text-2xl px-4 dark:text-white text-black">
            Notification
          </p>
          <button onClick={onclose} className=" dark:bg-popup-gray  ">
            <IoClose className="size-8" />
          </button>
        </div>
        <div className="h-[670px] no-scrollbar overflow-y-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="mb-3 px-4 dark:bg-layout-dark bg-layout-light p-4 rounded-2xl border-gray-800"
            >
              <div className="dark:text-white text-black pb-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button className="dark:bg-overall_bg-dark bg-overall_bg-light w-9 h-9 rounded-full flex items-center justify-center">
                    {card.initials}
                  </button>
                  <p className="text-xl">{card.title}</p>
                </div>
                <p className="text-sm text-gray-500">{card.date}</p>
              </div>
              <div className="dark:text-white text-black pl-2 border-l-2">
                <p className="text-md font-sans leading-snug">{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
