import { useNavigate, json,  useParams } from "react-router-dom"
import { useState } from "react"
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import { getToken } from "../../middleware/getToken"


export default function UpdateOrderStatus({ order }) {



    const [isUpdating, setIsUpdating] = useState(false)
    const [isDeleteing, setIsDeleting] = useState(false)
    const [orderStatus, setOrderStatus] = useState()
    const [deliveryDate, setDeliveryDate] = useState()
    const [paymentStatus, setPaymentStatus] = useState()




    const params = useParams()



    const orderId = params.id

    const navigate = useNavigate()
    const token = getToken()




    function handleOnChangeUpdateStatus(event) {

        setOrderStatus(event.target.value)
    }



    async function handleUpdateOrderStatus() {

        try {


            setIsUpdating(true)
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderStatus: orderStatus, paymentStatus: paymentStatus, deliveredWillBe: deliveryDate })
            })

            const resData = await response.json()

            

            if (!response.ok) {
                throw new Error(resData.message || "Field to update order status.")
            }
            setIsUpdating(false)

        } catch (err) {
            setIsUpdating(false)
            throw json({ message: err || "Something went wrong, Field to update order status." }, { status: 500 })
        }

        navigate(`/admin/${orderId}`)


    }


    async function handleDeleteOrder() {


        try {
            setIsDeleting(true)

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })

            const resData = await response.json()

            console.log(resData)

            if (!response.ok) {
                throw new Error(resData.message || "Field to delete order .")
            }


        } catch (err) {
            setIsDeleting(false)
            throw json({ message: err || "Something went wrong, Field to delete order." }, { status: 500 })
        }
        setIsDeleting(false)
        navigate("/admin")


    }


    return <>
       

        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="deliveryStatus" className="block text-gray-700 font-medium">
                    Update Order Delivery Status
                </label>
                <select
                    name="deliveryStatus"
                    onChange={handleOnChangeUpdateStatus}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select status</option>
                    <option value="dispatch">Dispatch</option>
                    <option value="delivered">Delivered</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="paymentStatus" className="block text-gray-700 font-medium">
                    Update Order Payment Status
                </label>
                <select
                    name="paymentStatus"
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="">Select Payment status</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
            </div>

            <div className="mb-4">
                <label htmlFor="deliveredWillBe" className="block text-gray-700 font-medium">
                    Update Order Delivery Date
                </label>
                <input
                    type="date"
                    id="deliveredWillBe"
                    name="deliveredWillBe"
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="flex space-x-4">
                <button
                    disabled={isDeleteing}
                    onClick={handleDeleteOrder}
                    className={`flex items-center px-4 py-2 rounded-md text-white ${isDeleteing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:bg-red-800'
                        }`}
                >
                    {isDeleteing ? 'Deleting...' : <><FiTrash2 className="mr-2" />Delete Order</>}
                </button>

                <button
                    disabled={isUpdating}
                    onClick={handleUpdateOrderStatus}
                    className={`flex items-center px-4 py-2 rounded-md text-white ${isUpdating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-800'
                        }`}
                >
                    {isUpdating ? 'Updating...' : <><FiEdit className="mr-2" />Update</>}
                </button>
            </div>
        </div>
    </>
}