import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function ProductDetail() {
  const product = useRouteLoaderData("product");
  const findProduct = product.findProduct;

  return (
    <>
      <div className="product-detail grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-lg shadow-md overflow-hidden p-4">
        <div className="lg:col-span-6">
          {/* Carousel with responsive settings */}
          <Carousel
            showThumbs={false} // Hide thumbnails (optional)
            infiniteLoop={true} // Enable infinite loop
            autoPlay={true} // Enable autoplay (optional)
            stopOnHover={true} // Stop autoplay on hover
            slidesPerView={1} // Show one image at a time
            className="carousel h-auto lg:h-[300px]" // Set carousel height
          >
            {findProduct.image.map((img) => (
              <div key={img}>
                <img
                  className="object-cover w-full h-full rounded-md shadow-xl"
                  src={`http://localhost/${img}`}
                  alt={findProduct.name}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col space-y-2 pt-4 lg:col-span-6">
          <h1 className="text-xl font-medium text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out">
            {findProduct.name}
          </h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              $<span className="text-2xl">{findProduct.price}</span>
            </h2>
            <p className="text-sm text-gray-600">{findProduct.brand}</p>
          </div>
          <p className="text-gray-700 line-clamp-3 hover:text-indigo-600 transition duration-300 ease-in-out">
            {findProduct.description}
          </p>
          <div className="flex flex-wrap text-gray-600 text-sm">
            <p className="mr-2">Category: {findProduct.category}</p>
            <p>Material: {findProduct.material}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ req, params }) {
  const proudId = params.id;
  const res = await fetch(`http://localhost/products/${proudId}`);
  const data = await res.json();
  return data;
}
