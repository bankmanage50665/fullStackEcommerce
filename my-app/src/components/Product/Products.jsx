import {
  json,
  Link,
  useLoaderData,
} from "react-router-dom";
import CartContaxt from "../../context/CartContext";
import { useContext, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { userId } from "../../middleware/getToken";



export default function Products() {
  const { addToCart } = useContext(CartContaxt);
  const products = useLoaderData();
  const userid = userId()




  function handleAddToCart(product) {
    addToCart(product);
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {products &&
          products.allProduct.map((product) => (
            <li
              key={product.id}
              className="flex flex-col rounded-lg shadow-lg bg-white  overflow-hidden transition-all duration-300 transform hover:scale-105"
            >
              {/* Image Carousel */}
              <Carousel
                autoplay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
                className="w-full"
              >
                {product.image.map((img) => (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                    className="w-full object-cover h-full sm:h-64 lg:h-80"
                    alt={product.name}
                  />
                ))}
              </Carousel>

              {/* Product Info */}
              <div className="flex flex-col p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white space-y-4">
                <h2 className="text-xl font-semibold leading-tight">{product.name}</h2>
                <p className="text-sm line-clamp-3">{product.description}</p>
                <p className="text-2xl font-bold">₹ {product.price}</p>

                {/* Buttons and Links */}
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    to={`${product._id}`}
                    className="text-sm px-4 py-2 bg-gray-50 text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 hover:text-indigo-700 transition-all duration-300"
                  >
                    View Product
                  </Link>

                  {product.creator === userid && <Link
                    to={`${product._id}/edit`}
                    className="text-sm text-yellow-400 font-medium underline hover:text-yellow-300 transition-all duration-300"
                  >
                    Edit Product
                  </Link>}



                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>

    </>
  );
}

export async function loader() {

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/getAllProducts`);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message)
    }
    const products = resData.allProduct
    const creatorId = products &&
      products.length >= 1 && products.map((product) => product.creator);


    localStorage.setItem("creatorid", creatorId)
    return resData



  } catch (err) {
    throw json({ message: "Field to fetch products list please try again later." }, { status: 500 })
  }

}
