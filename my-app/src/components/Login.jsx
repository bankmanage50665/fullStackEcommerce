import { useState } from "react";
import { Form, json, useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';


export default function Login() {
  const [isSubmiting, setIsSubmiting] = useState()
  const navigate = useNavigate();


  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());





    try {
      setIsSubmiting(true)
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        },
      }
      )

      const resData = await res.json()
      localStorage.setItem("userId", resData.userId)
      localStorage.setItem("userEmail", resData.email)
      localStorage.setItem("token", resData.token)
      console.log(resData)

      if (!res.ok) {
        throw new Error(resData.message)
      }



    } catch (err) {
      setIsSubmiting(false)
      throw json(
        { message: "Field to login user, Please try again later." },
        { status: 500 }
      );
    }


    navigate("/products")
    setIsSubmiting(false)
  };

  return (
    <>



      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>
          <Form method="post" className="space-y-6" onSubmit={submitForm}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <button
                disabled={isSubmiting}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaSignInAlt className="mr-2 h-5 w-5" />
                {isSubmiting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </Form>
          <p className="mt-8 text-sm text-center">
            Don't have an account?
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              <span className="flex items-center justify-center">
                <FaUserPlus className="mr-1" /> Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
