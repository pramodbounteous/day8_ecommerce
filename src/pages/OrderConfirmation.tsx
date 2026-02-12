import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return <p className="p-6 text-center">No order found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Confirmed!</h1>
      <p className="mb-2">Order ID: {order.id}</p>
      <p className="mb-2">Payment Method: {order.paymentMethod}</p>
      <p className="mb-4">Total Amount: ${order.totalAmount.toFixed(2)}</p>

      <h2 className="text-xl font-bold mb-2">Products:</h2>
      <ul className="mb-4">
        {order.products.map((item: any) => (
          <li key={item.id}>
            {item.title} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">Shipping Address:</h2>
      <p>{order.shippingAddress.fullName}</p>
      <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
      <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
    </div>
  );
};

export default OrderConfirmation;
