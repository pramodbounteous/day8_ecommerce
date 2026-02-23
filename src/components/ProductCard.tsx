import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../api/productApi";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

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
    <div className="border p-4 rounded shadow relative">
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 text-xl"
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className="h-40 mx-auto" />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
      </Link>

      <p className="font-bold mt-2">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="bg-black text-white px-3 py-1 mt-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
