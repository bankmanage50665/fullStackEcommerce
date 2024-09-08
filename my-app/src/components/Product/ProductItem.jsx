import React, { useContext } from "react";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { MdCurrencyRupee } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";


import CartContext from "../../context/CartContext";
import VerticleDescription from "./VerticleDescription";


export default function ProductDetail() {
  const { addToCart } = useContext(CartContext)
  const product = useLoaderData()
  const findProduct = product.findProduct;

  console.log(findProduct)


  return (
    <>


      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Image Carousel */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={false}
                  stopOnHover={true}
                  className="rounded-lg shadow-xl overflow-hidden"
                >
                  {findProduct.image.map((img, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1">
                      <img
                        className="object-cover w-full h-full"
                        src={`${process.env.REACT_APP_BACKEND_URL}/${img}`}
                        alt={`${findProduct.name} - Image ${index + 1}`}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2">
                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-lg shadow-xl p-6 lg:p-8">
                  <h1 className="text-3xl font-bold text-white mb-4">{findProduct.name}</h1>

                  <div className="flex items-center mb-4">
                    <MdCurrencyRupee className="text-4xl text-luxury-gold mr-1" />
                    <span className="text-3xl font-bold text-white">{findProduct.price}</span>
                  </div>

                  <p className="text-gray-300 mb-4">Brand: {findProduct.brand}</p>
                  <p className="text-white text-lg mb-6">{findProduct.description}</p>
                  <p className="text-gray-300 mb-4">Category: {findProduct.category}</p>

                  <div className="flex items-center mb-6">
                    <GrDeliver className="text-2xl text-luxury-gold mr-2" />
                    <p className="text-white">Free Delivery</p>
                  </div>

                  <button
                    onClick={() => addToCart(findProduct)}
                    className="w-full bg-luxury-gold hover:bg-luxury-gold-hover text-black font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-opacity-50"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verticle Description */}
        <VerticleDescription productImg={findProduct.image} />
      </>

    </>
  );
}

export async function loader({ req, params }) {
  const proudId = params.id;

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${proudId}`);
    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message)
    }

    return resData;


  } catch (err) {
    throw json({ message: "Field to fetching product item, Please try again later after some time." }, { status: 500 })
  }

}
