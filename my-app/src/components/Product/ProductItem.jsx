import { useRouteLoaderData } from "react-router-dom";

export default function ProductItem() {
  const product = useRouteLoaderData("product");
  console.log(product);

  return (
    <>
      <div class="product-item grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-lg shadow-md overflow-hidden p-4">
        <img
          class="object-cover w-full h-48 rounded-md shadow-xl lg:col-span-6 lg:h-auto"
          src={product.findProduct.image}
          alt={product.findProduct.name}
        />
        <div class="flex flex-col space-y-2 pt-4 lg:col-span-6">
          <h1 class="text-xl font-medium text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out">
            {product.findProduct.name}
          </h1>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">
              $<span class="text-2xl">{product.findProduct.price}</span>
            </h2>
            <p class="text-sm text-gray-600">{product.findProduct.brand}</p>
          </div>
          <p class="text-gray-700 line-clamp-3 hover:text-indigo-600 transition duration-300 ease-in-out">
            {product.findProduct.description}
          </p>
          <div class="flex flex-wrap text-gray-600 text-sm">
            <p class="mr-2">Category: {product.findProduct.category}</p>
            <p>Material: {product.findProduct.material}</p>
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
