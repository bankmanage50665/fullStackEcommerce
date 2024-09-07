import { useContext, useState } from "react"
import { Form, useNavigate, json } from "react-router-dom"
import { FiCreditCard, FiChevronDown } from 'react-icons/fi';






import CartContext from "../../context/CartContext"
import { userId } from "../../middleware/getToken"
import { futureDate } from "../../middleware/dateFormatter"
import { currencyFormatter } from "../../middleware/formatter";
import { getToken } from "../../middleware/getToken";


export default function Checkout() {
    const [isSubmiting, setIsSubmiting] = useState(false)


    const { items } = useContext(CartContext)

    const deleviryDate = futureDate(3)
    const token = getToken()







    const userid = userId()
    const navigate = useNavigate()

    const totalQuantity = items.reduce((totalNumberOfItem, item) => {
        return totalNumberOfItem + item.quantity;
    }, 0);

    const totalPrice = items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);


    async function handlePlaceOrder(e) {

        const formData = new FormData(e.target)
        const userData = Object.fromEntries(formData.entries())




        try {
            setIsSubmiting(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/place`, {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    items: items,
                    creator: userid,
                    totalPrice: totalPrice,
                    totalQuantity,
                    deliveredWillBe: deleviryDate
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })

            const resData = await response.json()

            console.log(resData)

            if (!response.ok) {
                throw new Error(resData.message)
            }

        } catch (err) {
            setIsSubmiting(false)
            throw json({ message: "Field to place order, Please try again later." }, { status: 404 })
        }
        setIsSubmiting(false)
        navigate("/orders")

    }

    return <>

        <div>

            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-gray-600 font-medium">Total:</span>
                <span className="text-gray-800 font-bold text-xl sm:text-2xl">
                    {currencyFormatter.format(totalPrice)}
                </span>
            </div>

            <Form
                onSubmit={handlePlaceOrder}
                className="p-6 bg-gray-400 w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto backdrop:blur-2xl"
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

                        required
                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block items-center mb-2 text-center font-semibold text-slate-950"
                    >
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        id="email"

                        required
                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>



                <div>
                    <label
                        htmlFor="phone"
                        className="block items-center mb-2 text-center font-semibold text-slate-950"
                    >
                        Phone Number
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        id="phone"
                        required
                        minLength={10}
                        maxLength={10}

                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label
                        htmlFor="city"
                        className="block items-center mb-2 text-center font-semibold text-slate-950"
                    >
                        City/Town
                    </label>
                    <input
                        name="city"
                        type="text"
                        id="city"

                        required
                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>


                <div>
                    <label
                        htmlFor="pin"
                        className="block items-center mb-2 text-center font-semibold text-slate-950"
                    >
                        Pin Code
                    </label>
                    <input
                        name="pin"
                        type="number"
                        id="pin"
                        required

                        minLength={6}
                        maxLength={6}
                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>



                <div>
                    <label
                        htmlFor="address"
                        className="block items-center mb-2 text-center font-semibold text-slate-950"
                    >
                        Address
                    </label>
                    <textarea
                        name="address"
                        id="address"
                        required
                        minLength={10}
                        placeholder=" House number, Street name or Ward number"
                        className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Method
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3 pr-10 appearance-none"
                            required
                        >
                            <option value="">Select payment method</option>

                            <option value="cod">Cash On Delivery</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FiChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div>
                    <button disabled={isSubmiting} className="px-4 py-1 bg-stone-400 rounded-md hover:font-bold hover:bg-stone-950 hover:text-white">
                        {isSubmiting ? "Order Placeing..." : "Place order"}
                    </button>
                </div>
            </Form>
        </div>

        {/* <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                <span className="text-gray-300 font-medium text-lg">Total:</span>
                <span className="text-luxury-gold font-bold text-3xl">
                    {currencyFormatter.format(totalPrice)}
                </span>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
                <InputField icon={<FiUser />} name="name" label="Name" type="text" required />
                <InputField icon={<FiMail />} name="email" label="Email" type="email" required />
                <InputField icon={<FiPhone />} name="phone" label="Phone Number" type="tel" required minLength={10} maxLength={10} />
                <InputField icon={<FiMapPin />} name="city" label="City/Town" type="text" required />
                <InputField icon={<FiMapPin />} name="pin" label="Pin Code" type="number" required minLength={6} maxLength={6} />

                <div className="relative">
                    <label htmlFor="address" className="text-gray-300 font-medium mb-2 block">Address</label>
                    <div className="relative">
                        <FiHome className="absolute top-3 left-3 text-gray-400" />
                        <textarea
                            name="address"
                            id="address"
                            required
                            minLength={10}
                            placeholder="House number, Street name or Ward number"
                            className="w-full bg-gray-700 text-white rounded-lg py-2 px-10 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="paymentMethod" className="text-gray-300 font-medium mb-2 block">Payment Method</label>
                    <div className="relative">
                        <FiCreditCard className="absolute top-3 left-3 text-gray-400" />
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            className="w-full bg-gray-700 text-white rounded-lg py-2 px-10 appearance-none focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                            required
                        >
                            <option value="">Select payment method</option>
                            <option value="cod">Cash On Delivery</option>
                        </select>
                        <FiChevronDown className="absolute top-3 right-3 text-gray-400" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmiting}
                    className="w-full bg-luxury-gold text-gray-900 font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmiting ? "Placing Order..." : "Place Order"}
                </button>
            </form>
        </div> */}

    </>
}