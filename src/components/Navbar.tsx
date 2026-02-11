import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Navbar = () => {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        MyStore
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart" className="relative">
          Cart
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
