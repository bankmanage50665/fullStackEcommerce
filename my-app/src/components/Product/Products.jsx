import { Link, useLoaderData, useNavigation, useRouteLoaderData } from "react-router-dom";
import CartContaxt from "../../context/CartContext";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//

export default function Products() {
  const { addToCart } = useContext(CartContaxt);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const products = useRouteLoaderData("product");

  function handleAddToCart(product) {
    addToCart(product);
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {products &&
          products.allProduct.map((product) => <h1>{product.name}</h1>)}
        {isLoading && <h1>Loading...</h1>}
        {products &&
          products.allProduct.map((product) => (
            <li
              key={product.id}
              className="flex flex-col rounded-md shadow-md bg-white overflow-hidden"
            >
              <Carousel
                autoplay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
              >
                <img
                  src={product.image}
                  className="w-full object-cover h-48 sm:h-64 lg:h-80"
                  alt={product.name}
                />
              </Carousel>
              <div className="flex flex-col p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm mb-2">
                  {product.description.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <Link
                    to={`${product.id}`}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 focus:outline-none"
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

export async function loader(req, res) {
  const response = await fetch("http://localhost/products/getAllProducts");
  const resData = await response.json();
  return resData;
}
