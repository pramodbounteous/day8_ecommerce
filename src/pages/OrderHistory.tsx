import { useEffect, useState } from "react";

export const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders.reverse());
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold">No Orders Yet</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      {orders.map((order) => (
        <div key={order.orderId} className="border rounded p-4 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">Order ID: {order.orderId}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </p>
            </div>
            <p className="text-green-600">{order.status}</p>
          </div>

          <div className="mt-3">
            {order.products.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="text-right font-bold mt-2">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};
