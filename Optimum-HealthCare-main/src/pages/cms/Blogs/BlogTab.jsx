import React, { useState } from "react";
import AddBlogs from "./AddBlogs";
import Blogs from "./Blogs";

const BlogTab = () => {
  const [posts, setPosts] = useState([]);
  const [addBlogs, setAddBlogs] = useState(false)
  
  const addPost = (newPost) => {
    setPosts((prev) => [...prev, newPost]);
  };


  return (
    <>
    {!addBlogs && 
    
      <div className="relative">
        <p onClick={() => setAddBlogs(true)}  className=" cursor-pointer absolute right-2 -top-13 px-4 py-1.5 bg-select_layout-dark rounded-md dark:text-white ">
          Add Blogs
        </p>
      </div>
}
{!addBlogs &&
      <div className="grid grid-cols-3 gap-4 w-full">
        {posts.map((post, idx) => (
          <Blogs key={idx} post={post} />
        ))}
      </div>
}
      {addBlogs && <AddBlogs onSubmit={addPost} onclose={() => setAddBlogs(false)}  />}
    </>
  );
};

export default BlogTab;
