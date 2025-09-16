import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import domtoimage from "dom-to-image-more";
import OPD_Details from "./OPD_Details";

const View_Patients = ({ patient, onclose }) => {
  const exportRef = useRef();

  const handleDownload = () => {
    const element = exportRef.current;
    domtoimage
      .toPng(element, {
        style: {
          margin: 0,
          padding: 0,
          overflow: "visible",
        },
        height: element.scrollHeight,
        width: element.scrollWidth,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${patient.name}_OPD_Details.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Download failed:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-10 m-0 p-0">
      <div className="dark:bg-layout-dark bg-layout-light rounded-lg drop-shadow-md dark:text-white w-fit h-fit m-0 px-4 py-3">
        <p
          className="grid place-self-end -mx-8 -my-4 dark:bg-layout-dark bg-layout-light shadow-sm py-2.5 px-2.5 rounded-full"
          onClick={onclose}
        >
          <IoClose size={20} />
        </p>

        <div
          ref={exportRef}
          style={{
            maxHeight: "700px",
          }}
          className="m-2  border rounded-2xl overflow-y-auto no-scrollbar dark:bg-layout-dark bg-white"
        >
          <OPD_Details patient={patient} />
        </div>

        <div className="w-full flex justify-end gap-2 px-3">
          <button
            // onClick={handleDownload}
            className="cursor-pointer  border border-select_layout-dark text-select_layout-dark  px-6 py-1.5 rounded-sm"
          >
            Share
          </button>
          <button
            onClick={handleDownload}
            className="cursor-pointer  border border-select_layout-dark text-select_layout-dark  px-6 py-1.5 rounded-sm"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default View_Patients;
