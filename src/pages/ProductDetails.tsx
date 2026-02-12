import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (!isAuthenticated) {
      alert("Please login to use wishlist");
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-96 mx-auto object-contain"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>

          <p className="text-gray-600 mb-4">{product.category}</p>

          <p className="text-xl font-semibold mb-4">${product.price}</p>

          <p className="mb-6 text-gray-700">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-2 rounded w-full mb-3"
          >
            Add to Cart
          </button>

          <button
            onClick={handleWishlist}
            className="border px-6 py-2 rounded w-full"
          >
            {inWishlist ? "Remove from Wishlist ❤️" : "Add to Wishlist 🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
