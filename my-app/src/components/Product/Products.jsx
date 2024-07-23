import { Link } from "react-router-dom";
import CartContaxt from "../../context/CartContext";
import { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "https://jlineartsandsilks.com/wp-content/uploads/2022/04/JL_JBS_MC-05-Jaipur-Bandhani-Saree-in-Multi-color-body-with-zari-border-1-2.jpg",
  "https://tajbridalstore.in/cdn/shop/products/untitled-55_1f1c1299-aa55-4c29-9c5e-b45360e0b7c4.webp?v=1696627792",
  "https://thedailyguardian.com/wp-content/uploads/2024/01/01-a.jpg",
  "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800",
  "https://tiimg.tistatic.com/fp/1/008/565/strong-aroma-nice-fragrance-ayurvedic-herbal-tea-297.jpg",
];

const products = [
  {
    id: 1,
    name: "Jaipur Bandhej Saree",
    image: images,
    price: 1499.0,
    description:
      "Stunning handloom bandhej saree in vibrant colors, perfect for any occasion.",
    material: "Cotton",
    brand: "Jaipuri Weavers",
    category: "Clothing",
    averageRating: 4.8,
    isOnSale: false,
  },
  {
    id: 2,
    name: "Lac Bangles Set",
    image: images,
    price: 299.0,
    description:
      "Set of handcrafted lac bangles in a variety of colors, a beautiful and traditional accessory.",
    material: "Lac",
    category: "Jewelry",
    averageRating: 4.5,
    isOnSale: true,
    color: ["Red", "Green", "Yellow"],
  },
  {
    id: 3,
    name: "Blue Pottery Tea Set",
    image: images,
    price: 450.0,
    description:
      "Elegant blue pottery tea set with intricate floral designs, perfect for serving tea in style.",
    variations: ["4-cup set", "6-cup set"],
    category: "Homeware",
    averageRating: 4.7,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Jaipur Rug (Small)",
    image: images,
    price: 999.0,
    description:
      "Hand-woven Jaipur rug with beautiful colors and intricate patterns, adds a touch of luxury to any room.",
    size: "3ft x 5ft",
    category: "Homeware",
    averageRating: 4.9,
    isOnSale: true,
  },
  {
    id: 5,
    name: "Metal Elephant Statue",
    image: images,
    price: 349.0,
    description:
      "Handcrafted brass elephant statue, a symbol of good luck and prosperity.",
    material: "Brass",
    category: "Decor",
    averageRating: 4.2,
    isOnSale: false,
  },
  {
    id: 6,
    name: "Tandoori Spice Mix",
    image: images,
    price: 12.99,
    description:
      "Authentic blend of spices for creating delicious tandoori dishes at home.",
    category: "Food",
    averageRating: 4.9,
    isOnSale: false,
    countInInventory: 50,
  },
  {
    id: 7,
    name: "Ayurvedic Herbal Tea",
    image: images,
    price: 19.99,
    description:
      "Soothing herbal tea blend with Ayurvedic herbs for relaxation and well-being.",
    category: "Food",
    averageRating: 4.3,
    isOnSale: false,
    countInInventory: 25,
  },
  {
    id: 8,
    name: "Gulab Jamun (Sweet)",
    image: images,
    price: 7.99,
    description:
      "Delicious Indian sweet made with fried dough balls soaked in a rose-flavored syrup.",
    category: "Food",
    averageRating: 4.8,
    isOnSale: true,
    countInInventory: 10, // Limited stock!
  },
];

export default function Products() {
  const { addToCart } = useContext(CartContaxt);

  function handleAddToCart(product) {
    addToCart(product);
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
        {products.map((product) => (
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
              {product.image.map((img) => (
                <img
                  src={img}
                  className="w-full object-cover h-48 sm:h-64 lg:h-80"
                  alt={product.name}
                />
              ))}
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
