import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const order = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleDateString(),
      products: cartItems,
      totalAmount,
      shippingAddress: formData,
      paymentMethod: "Cash on Delivery",
      status: "Confirmed",
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders") || "[]");

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    clearCart();
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-4">
        <input
          name="fullName"
          placeholder="Full Name"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address Line"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="state"
          placeholder="State"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          name="pincode"
          placeholder="Pincode"
          className="border p-2 rounded"
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">
          Total Amount: ${totalAmount.toFixed(2)}
        </h2>
        <p className="mb-4 font-medium">
          Payment Method: Cash on Delivery (COD)
        </p>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
