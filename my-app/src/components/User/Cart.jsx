import { useContext } from "react";
import CartContext from "../../context/CartContext";
import { useNavigate, json, Form } from "react-router-dom";
export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    console.log(items);

    try {
      const res = await fetch("http://localhost/orders/place", {
        method: "POST",
        body: JSON.stringify({ userData, items }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log(resData);
      navigate("/order");
    } catch (err) {
      throw json(
        { message: "Field to login user, Please try again later." },
        { status: 500 }
      );
    }
  };

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
                src={item.image}
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

      <div>
        <Form
          onSubmit={submitForm}
          className="p-6 backdrop-blur-sm w-80 h-auto mt-6 m-auto rounded-md shadow-xl md:w-1/2 md:m-auto"
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
              className="block items-center w-full rounded-md p-1 mb-4 focus:border-indigo-500"
            />
          </div>

          <div>
            <button className="px-4 py-1 bg-stone-400 rounded-md hover:font-bold hover:bg-stone-950 hover:text-white">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
