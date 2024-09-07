export default function OrderDetails({ orderedItems }) {

    
    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {orderedItems.map((item, index) => (
                <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Brand: {item.brand}</p>
                        

                    </div>
                </div>


            ))}
        </div>

        

    </>
}