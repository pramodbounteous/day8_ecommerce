import type { Product } from "../api/productApi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain mb-4"
      />
      <h2 className="font-bold text-lg">{product.title}</h2>
      <p className="text-gray-500">${product.price}</p>
      <div className="mt-auto flex flex-col gap-2">
        <Link
          to={`/products/${product.id}`}
          className="bg-blue-500 text-white py-1 px-3 rounded text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-600 text-white py-1 px-3 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
