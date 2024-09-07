import { useContext } from "react";
import { Link } from "react-router-dom";


import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { currencyFormatter } from "../../middleware/formatter.js"



import CartContext from "../../context/CartContext";

export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);

  console.log(items)

  const totalQuantity = items.reduce((totalNumberOfItem, item) => {
    return totalNumberOfItem + item.quantity;
  }, 0);

  const totalPrice = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);





  return (
    <>


      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center">
            <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-700">Your cart is empty</h1>
            <p className="text-gray-500 mt-2">Add some products to start shopping</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Your Cart</h2>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item._id} className="py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${item.image[0]}`}
                      alt={item.name}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md mr-4 sm:mr-6"
                    />
                    <div>
                      <h3 className="text-md sm:text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                    </div>
                  </div>


                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center">
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-3 rounded-full transition duration-300 ease-in-out"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <FiMinus />
                      </button>
                      <span className="text-gray-700 font-medium mx-2 sm:mx-4">{item.quantity}</span>
                      <button
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-3 rounded-full transition duration-300 ease-in-out"
                        onClick={() => addToCart(item)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <span className="text-gray-800 font-semibold ml-4">
                      {currencyFormatter.format(item.price.toFixed(2))}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex justify-between items-center mb-2 sm:mb-4">
                <span className="text-gray-600 font-medium">Delivered will be</span>
                <span className="text-gray-800 text-sm  sm:text-xl">Within 3 days</span>
              </div>
              <div className="flex justify-between items-center mb-2 sm:mb-4">
                <span className="text-gray-600 font-medium">Total quantity:</span>
                <span className="text-gray-800 font-bold text-lg sm:text-xl">{totalQuantity}</span>
              </div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-gray-600 font-medium">Total:</span>
                <span className="text-gray-800 font-bold text-xl sm:text-2xl">
                  {currencyFormatter.format(totalPrice)}
                </span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 sm:py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>


    </>
  );
}
