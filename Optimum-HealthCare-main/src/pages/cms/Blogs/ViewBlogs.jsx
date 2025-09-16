import React from "react";
import NavBar from "../../../component/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const ViewBlogs = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const post = state?.post;

  const paragraphs = post.description.split(/\n+/);
  const topContent = paragraphs.slice(0, 5);
  const bottomContent = paragraphs.slice(5);

  return (
    <>
      <NavBar title="Blogs" pagetitle="View Blogs" />
      <div className="pb-10">
        <div className="dark:bg-layout-dark bg-layout-light text-white rounded shadow-md mt-4 p-6 ">
          <div className="flex flex-col md:flex-row gap-6  ">
            <div className="">
              <img
                src={post.image}
                alt="Blog"
                className=" w-96 h-72 rounded-md"
              />
            </div>

            <div className=" space-y-2 mt-8">
              <div className="flex justify-between items-start">
                <p className="text-sm text-purple-300">{post.subTopic}</p>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleDateString("en-GB").replace(/\//g, ".")}
                </span>
              </div>

              <h1 className="text-2xl font-bold">
                {post.topic}: Causes, Prevention, and Treatment
              </h1>

              <div className="text-sm text-gray-200 space-y-2 ">
                {topContent.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-200 space-y-2 ">
            {bottomContent.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-end  relative ">
          <p
            onClick={() => navigate(-1)}
            className=" cursor-pointer absolute flex items-center gap-2 bg-select_layout-dark rounded-sm py-1.5 px-4 -bottom-12 right-0"
          >
            <IoArrowBackSharp /> back
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewBlogs;
