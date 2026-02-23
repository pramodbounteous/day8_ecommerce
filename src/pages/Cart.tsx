
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Product</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-t border-gray-300">
              <td className="p-2 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <span>{item.title}</span>
              </td>

              <td className="text-center">${item.price.toFixed(2)}</td>

              <td className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </td>

              <td className="text-center">
                ${(item.price * item.quantity).toFixed(2)}
              </td>

              <td className="text-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">
          Total Amount: ${totalAmount.toFixed(2)}
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
