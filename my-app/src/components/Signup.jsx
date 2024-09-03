import { Form, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";




export default function Signup() {
  const [files, setFiles] = useState(null);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";
  const navigate = useNavigate();

  function handleGetFiles(files) {
    setFiles(files);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formElements = e.target.elements;

    try {
      formData.append("name", formElements.name.value);
      formData.append("email", formElements.email.value);
      formData.append("password", formElements.password.value);
      files.forEach((file) => formData.append("image", file));
      const res = await fetch("http://localhost:80/users/signup", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      console.log(resData)
      localStorage.setItem("token", resData.token);

      navigate("/login");
    } catch (err) { }
  };
  return (
    <>
      <Form
        onSubmit={submitForm}
        className="p-6 backdrop-blur-2xl w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto"
      >
        <div className="text-white items-center">
          <label
            htmlFor="name"
            className="block items-center mb-2 text-center font-semibold text-white text-2xl"
          >
            Name
          </label>
          <div className="flex ">
            <MdDriveFileRenameOutline className="text-white text-2xl" />
            <input
              name="name"
              type="text"
              placeholder="Enter Your Name"
              id="name"
              className="block items-center bg-transparent  text-white  w-full rounded-md p-1 mb-4 focus:bg-transparent focus:border-indigo-500 ml-5"
            />
          </div>
        </div>
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
