
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // Provide default empty array just in case
  const { cartItems = [] } = useCart();
  const { isAuthenticated, logout } = useAuth();

  // Safe total calculation
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MyStore
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>

        {isAuthenticated ? (
          <>
            <Link to="/wishlist">Wishlist</Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
