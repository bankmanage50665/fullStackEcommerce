import { Link } from "react-router-dom";
import { User, Mail, Package } from 'lucide-react';


export default function RenderAllUsers({ user }) {

    console.log(user)

    return <>
      

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
                <User className="text-primary-600 h-8 w-8" />
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div>
                <h4 className="text-gray-800 font-medium mb-2">Orders</h4>
                <ul className="space-y-2">
                    {user.orders.map((order, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <Package className="text-gray-500 h-5 w-5" />
                            <Link to={order} className="text-blue-500 hover:underline">
                                Order details {order.id}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    </>
}