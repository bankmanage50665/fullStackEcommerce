import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function UserDetails({ user }) {
    return <>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-4">
                <User className="text-primary-600 h-8 w-8" />
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Phone className="text-gray-500 h-6 w-6" />
                <p className="text-gray-600">{user.phone}</p>
            </div>
            <div className="flex items-center space-x-4">
                <MapPin className="text-gray-500 h-6 w-6" />
                <p className="text-gray-600">{user.address}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-sm font-medium">{user.pin}</span>
                </div>
                <p className="text-gray-600">User PIN</p>
            </div>
        </div>

    </>
}