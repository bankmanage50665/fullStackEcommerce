import { useContext } from "react";
import CartContext from "../../context/CartContext";
export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  console.log(items)

  return (
    <>
      {items.length > 0 ? <h1>Cart</h1> : <h1>Nothing in your cart</h1>}
      <ul className="grid gap-4 px-4">
        {items &&
          items.map((item) => (
            <li
              key={item.id}
              className="flex items-center p-4 bg-gray-100 rounded-md shadow-md"
            >
              <img
                className="w-16 h-16 rounded-md object-cover mr-4"
                src={item.image[0]}
                alt={item.name}
              />
              <div className="flex flex-col">
                <h1 className="text-lg font-medium">{item.name}</h1>
                <div className="flex items-center text-sm mt-1">
                  <div className="mr-4">
                    <button
                      className="font-bold px-2 py-1 rounded-md bg-green-500 text-white"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                  <p className="mr-4">{item.quantity}</p>
                  <button
                    className="font-bold px-2 py-1 rounded-md bg-red-500 text-white"
                    onClick={() => removeFromCart(item.id)}
                  >
                    -
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
