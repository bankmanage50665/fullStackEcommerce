import { FaShippingFast, FaMoneyCheckAlt, FaCalendarCheck, FaTag, FaBox } from 'react-icons/fa';


import UserDetails from "./UserDetail"
import OrderedItemDetails from "./OrderedItemDetails"
import UpdateOrderStatus from "./UpdateOrderStatus"

export default function RenderUserOrderDetails({ order }) {

    console.log(order)
    return <>
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 flex items-center">
                        <FaShippingFast className="text-blue-500 mr-2" />
                        Order delivery status:
                        <span className="font-semibold ml-2">{order.orderStatus}</span>
                    </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 flex items-center">
                        <FaMoneyCheckAlt className="text-green-500 mr-2" />
                        Order payment status:
                        <span className="font-semibold ml-2">{order.paymentStatus}</span>
                    </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 flex items-center">
                        <FaCalendarCheck className="text-purple-500 mr-2" />
                        Order delivered will be:
                        <span className="font-semibold ml-2">{order.deliveredWillBe}</span>
                    </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 flex items-center">
                        <FaTag className="text-yellow-500 mr-2" />
                        Total Price:
                        <span className="font-semibold ml-2">{order.totalPrice}</span>
                    </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-md">
                    <p className="text-gray-700 flex items-center">
                        <FaBox className="text-red-500 mr-2" />
                        Total quantity:
                        <span className="font-semibold ml-2">{order.totalQuantity}</span>
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {/* User Details */}
                <UserDetails user={order.user} />
            </div>

            <div className="mt-6">
                {/* Ordered Item Details */}
                <OrderedItemDetails orderedItems={order.items} />
            </div>

            <div className="mt-6">
                {/* Update Order Status */}
                <UpdateOrderStatus order={order} />
            </div>
        </div>

    </>
}