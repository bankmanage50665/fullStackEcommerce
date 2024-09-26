import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaLock } from 'react-icons/fa';
import { json, redirect, Form, useNavigation, useActionData, Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const LoginWithOtp = () => {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);
    const isSubmitting = navigation.state === 'submitting'
    const data = useActionData()





    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true)
        // Add your OTP sending logic here
        const formData = new FormData(e.target)


        const userData = Object.fromEntries(formData.entries())

        setStep(2)

        try {

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/sendotp`, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await res.json();

            console.log(resData)
            if (!res.ok) {
                throw new Error(resData.message || "Field to loging user.");
            }
            setStep(2)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            throw json(
                { message: "Field to login  please try again later." },
                { status: 500 }
            );
        }

    };


    const inputClasses = "w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-300";
    const labelClasses = "block mb-2 text-sm font-medium text-gray-600";
    const buttonClasses = "w-full px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login with OTP</h2>
                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label htmlFor="phoneNumber" className={labelClasses}>
                                    <FaPhone className="inline mr-2" />
                                    Enter Mobile Number
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
                                    <span className="text-gray-600 font-semibold pl-4 mr-2">+91</span>
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        id="phoneNumber"
                                        type="tel"
                                        name="phoneNumber"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={`${inputClasses} border-0`}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                className={buttonClasses}
                            >
                                {loading ? (
                                    <PulseLoader color="#ffffff" size={10} />
                                ) : (
                                    "Send OTP"
                                )}
                            </motion.button>

                            <div className="text-center text-sm text-gray-600">
                                Not registered yet?
                                <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium transition-all">
                                    Register here
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <Form method="post" action='/login' className="space-y-6">
                            {data && data.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-md"
                                >
                                    {data.message}
                                </motion.div>
                            )}

                            <input
                                id="phoneNumber"
                                type="number"
                                name="phoneNumber"
                                value={phoneNumber}
                                hidden
                            />

                            <div>
                                <label htmlFor="otp" className={labelClasses}>
                                    <FaLock className="inline mr-2" />
                                    Enter OTP
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    id="otp"
                                    type="number"
                                    name="otp"
                                    className={inputClasses}
                                    placeholder="Enter your OTP"
                                    required
                                    minLength={4}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                                className={buttonClasses}
                            >
                                {isSubmitting ? (
                                    <PulseLoader color="#ffffff" size={10} />
                                ) : (
                                    "Verify OTP"
                                )}
                            </motion.button>

                            <div className="text-center text-sm text-gray-600">
                                Not registered yet?{' '}
                                <Link to="/signup" className="text-yellow-600 hover:text-yellow-700 font-medium transition-all">
                                    Register here
                                </Link>
                            </div>
                        </Form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LoginWithOtp;

export async function loginWithOtpAction({ request, params }) {
    const formData = await request.formData()
    const userData = {
        otp: formData.get("otp"),
        phoneNumber: formData.get("phoneNumber")

    }



    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (response.status === 404 || response.status === 500) {
            return response
        }


        const resData = await response.json();



        const token = resData.token


        localStorage.setItem('token', token)
        localStorage.setItem("userid", resData.userId)
        localStorage.setItem("userPhoneNumber", resData.phoneNumber)


        if (!response.ok) {
            throw new Error(resData.message || "Field to loging user.");
        }


    } catch (err) {

        throw json(
            { message: "Field to login  please try again later." },
            { status: 500 }
        );
    }

    return redirect("/products")

}