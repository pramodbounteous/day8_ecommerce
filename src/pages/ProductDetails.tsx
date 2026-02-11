import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import type { Product } from "../api/productApi";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id)).then((res) => setProduct(res));
    }
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-96 object-contain"
      />
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mt-2">${product.price}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-blue-500 text-white py-2 px-4 rounded mt-6"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
