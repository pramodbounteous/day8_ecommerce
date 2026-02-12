import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
    return <p className="p-6 text-center">No orders placed yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 rounded mb-4 bg-gray-50"
        >
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Products:</strong></p>
          <ul className="ml-4 list-disc">
            {order.products.map((item: any) => (
              <li key={item.id}>
                {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
