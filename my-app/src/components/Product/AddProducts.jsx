import { useState } from "react";
import { Form, redirect, useSearchParams } from "react-router-dom";

export default function AddProducts() {
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
  };

  return (
    <>
      <Form
        onSubmit={submitForm}
        className="p-6 bg-stone-200 w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto"
      >
        <div>
          <label
            htmlFor="name"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Name
          </label>
          <input
            name="name"
            type="text"
            id="name"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="discription"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Description
          </label>
          <input
            name="discription"
            type="text"
            id="discription"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Image
          </label>
          <input
            name="image"
            type="text"
            id="image"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="brand"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Brand
          </label>
          <input
            name="brand"
            type="text"
            id="brand"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="material"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Material
          </label>
          <input
            name="material"
            type="text"
            id="material"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block items-center mb-2 text-center font-semibold text-slate-950"
          >
            Category
          </label>
          <input
            name="category"
            type="text"
            id="category"
            className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
          />
        </div>
        <div>
          <button className="px-4 py-1 bg-stone-400 rounded-md hover:font-bold hover:bg-stone-950 hover:text-white">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
