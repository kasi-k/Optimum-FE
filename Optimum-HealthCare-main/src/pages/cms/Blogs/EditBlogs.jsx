import React, { useState } from "react";
import NavBar from "../../../component/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const EditBlogs = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const post = state?.post;

  const [paragraphs, setParagraphs] = useState(post.description.split(/\n+/));

  const topContent = paragraphs.slice(0, 5);
  const bottomContent = paragraphs.slice(5);

  const handleParagraphChange = (index, newText) => {
    const updated = [...paragraphs];
    updated[index] = newText;
    setParagraphs(updated);
  };

  return (
    <>
      <NavBar title="Blogs" pagetitle="Edit Blog" />
      <div className="pb-10">
        <div className="dark:bg-layout-dark bg-layout-light text-white rounded shadow-md mt-4 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Blog Image */}
            <div>
              <img
                src={post.image}
                alt="Blog"
                className="w-96 h-72 rounded-md object-cover"
              />
            </div>

            {/* Editable Fields */}
            <div className="space-y-2 mt-8 ">
              <div className="flex justify-between items-start">
                <input
                  type="text"
                  value={post.subTopic}
                  className="text-sm text-purple-300 bg-transparent outline-none "
                />
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("en-GB").replace(/\//g, ".")}
                </span>
              </div>

              <input
                type="text"
                value={post.topic}
                className="text-2xl font-bold bg-transparent outline-none "
              />

              <div className="text-sm text-gray-200 ">
                {topContent.map((para, idx) => (
                  <div
                    key={idx}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleParagraphChange(idx, e.target.innerText)
                    }
                    className="bg-transparent outline-none text-sm py-1 break-words "
                  >
                    {para}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-200  mt-6 ">
            {bottomContent.map((para, idx) => (
              <div
                key={idx + 5}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleParagraphChange(idx + 5, e.target.innerText)
                }
                className="bg-transparent outline-none text-sm py-1 break-words "
              >
                {para}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end items-center gap-4 mt-4 ">
          <p
            onClick={() => navigate(-1)}
            className="cursor-pointer dark:text-select_layout-dark  flex items-center gap-2 border border-select_layout-dark rounded-sm py-1.5 px-4 -bottom-12 right-0"
          >
            <IoArrowBackSharp /> Back
          </p>
          <p
            onClick={() => navigate(-1)}
            className="cursor-pointer  flex items-center gap-2 bg-select_layout-dark rounded-sm py-1.5 px-6 -bottom-12 right-0"
          >
           Save
          </p>
        </div>
      </div>
    </>
  );
};

export default EditBlogs;
