import { useState } from "react";
import { Form, json, useNavigate } from "react-router-dom";
import useHttpHooks from "../hooks/useHttpHook";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";




export default function Login() {
  const [isSubmiting, setIsSubmiting] = useState()
  const navigate = useNavigate();
  const { sendRequest } = useHttpHooks();
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const resData = await sendRequest(
        "http://localhost/users/login",
        "POST",
        JSON.stringify(userData),
        {
          "Content-Type": "application/json",
        }
      );
      localStorage.setItem("token", resData.token);

      navigate("/products");
    } catch (err) {
      throw json(
        { message: "Field to login user, Please try again later." },
        { status: 500 }
      );
    }
  };

  return (
    <>
      <Form
        onSubmit={submitForm}
        className="p-6 backdrop-blur-2xl w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto"
      >

        <div className="text-white items-center">
          <label
            htmlFor="email"
            className="block items-center mb-2 text-center font-semibold text-white text-2xl"
          >
            Email
          </label>
          <div className="flex ">
            <MdOutlineEmail className="text-white text-2xl" />
            <input
              name="email"
              type="email"
              placeholder="Enter Your E-mail"
              id="email"
              className="block items-center bg-transparent text-white  w-full rounded-md p-1 mb-4 focus:border-indigo-500 ml-5"
            />
          </div>
        </div>
        <div className="text-white items-center">
          <label
            htmlFor="password"
            className="block items-center mb-2 text-center font-semibold text-white text-2xl"
          >
            Password
          </label>
          <div className="flex ">
            <RiLockPasswordLine className="text-white text-2xl" />
            <input
              name="password"
              type="password"
              placeholder="Enter Your Password"
              id="password"
              className="block items-center bg-transparent text-white  w-full rounded-md p-1 mb-4 focus:border-indigo-500 ml-5"
            />
          </div>
        </div>


        <div>
          <button
            disabled={isSubmiting}
            className="px-4 py-1 bg-luxury-gold hover:bg-luxury-gold-hover rounded-md hover:font-bold hover:text-white text-white"
          >
            {isSubmiting ? "Submiting" : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
}
