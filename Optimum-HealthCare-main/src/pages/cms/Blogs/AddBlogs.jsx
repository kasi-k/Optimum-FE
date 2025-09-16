
import React, { useState } from "react";

const AddBlogs = ({ onSubmit,onclose}) => {
  const [form, setForm] = useState({
    topic: "",
    subTopic: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    onclose();
    e.preventDefault();
    onSubmit(form);
    setForm({
      topic: "",
      subTopic: "",
      description: "",
      image: null,
    });

  };

  return (

    <form
      onSubmit={handleSubmit}
      
    >
        <div className="relative mt-4">
        <p onClick={handleSubmit} className=" cursor-pointer absolute -right-0 -top-16  px-4 py-1.5 bg-select_layout-dark rounded-md dark:text-white ">
          Save
        </p>
      </div>
      <div className="flex  gap-4  rounded-md dark:text-white">
      <div className="grid grid-cols-12 items-center gap-6 w-1/2 dark:bg-layout-dark bg-layout-light rounded-md  shadow-md p-6">
        <label className="col-span-4 ">Topic</label>
        <input
          type="text"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          className=" col-span-8 rounded border border-[#454545] px-2 py-1.5 "
          placeholder="Name"
        />

        <label className="col-span-4">Sub Topic</label>
        <input
          type="text"
          name="subTopic"
          value={form.subTopic}
          onChange={handleChange}
          className=" col-span-8 border border-[#454545] px-2 py-1.5 rounded"
          placeholder="Name"
        />

        <label className="col-span-4">Description</label>
        <textarea
          rows={8}
          name="description"
          value={form.description}
          onChange={handleChange}
          className=" col-span-8 border border-[#454545] px-2 py-2 placeholder:py-20  rounded"
          placeholder="Description"
        />
      </div>

      <div className="flex-1 w-full dark:bg-layout-dark bg-layout-light p-6 rounded-md shadow-md">
        <label className="block mb-2 my-8 mx-4">Upload Images</label>
        <label className="mx-auto w-1/3 h-28 border border-[#454545]  flex justify-center items-center cursor-pointer  rounded mt-8">
          +
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-4  w-1/3 h-28 "
          />
        )}
      </div>
      </div>
    </form>
  );
};

export default AddBlogs;
