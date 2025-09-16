import React, { useState } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div className="w-full dark:bg-layout-dark dark:text-white bg-layout-light h-fit  p-8 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-medium ">Gallery</h2>
        <label className="bg-select_layout-dark  dark:text-white px-4 py-2 rounded-md cursor-pointer">
          Add Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery item ${index + 1}`}
            className="rounded-lg  h-40 overflow-auto w-40"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
