import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { Pencil } from "lucide-react";
import ViewBlogs from "./ViewBlogs";
import { useNavigate } from "react-router-dom";

const Blogs = ({ post }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);


  const paragraphs = post.description.split(/\n+/);

  const displayedParagraphs = expanded ? paragraphs : paragraphs.slice(0, 1);

  const handleView = () =>{
    navigate("viewblog",{ state: { post } })
  }

  const handleEdit = () =>{
    navigate("editblog",{ state: { post } })
  }
  return (
    <>
      <div className="font-layout-font  overflow-auto dark:bg-layout-dark bg-layout-light dark:text-white p-4 rounded shadow-md mt-2 ">
        <img
          src={post.image}
          alt="Post"
          className="w-full size-56 rounded  shadow-md mb-4"
        />
        <p className="text-xs flex justify-between items-center text-select_layout-dark">
          {post.subTopic}{" "}
          <span className="text-xs dark:text-gray-300 font-light">
            {new Date().toLocaleDateString("en-GB").replace(/\//g, ".")}
          </span>
        </p>
        <h3 className="text-lg font-bold mb-1">{post.topic}: Causes…</h3>
        {displayedParagraphs.map((para, idx) => (
          <p key={idx} className="text-sm dark:text-gray-300 mb-1 break-words">
            {para}
          </p>
        ))}

        <div className="flex justify-end items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="bg-green-200 p-1.5 rounded"
            >
              <LuEye size={16} className="text-green-600" />
            </button>
            <button onClick = {handleEdit} className="bg-blue-200 p-1.5 rounded">
              <Pencil size={16} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Blogs;
