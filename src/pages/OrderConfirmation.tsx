import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order Confirmed 🎉</h1>

      <p className="mb-4">Order ID: {order.orderId}</p>

      <div className="mb-4">
        {order.products.map((item: any) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <h2 className="font-bold">Total: ${order.totalAmount.toFixed(2)}</h2>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Back to Home
      </button>
    </div>
  );
};
