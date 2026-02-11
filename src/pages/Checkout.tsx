import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "COD";
}

export const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Partial<OrderFormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = `ORD-${Date.now()}`;

    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      products: cartItems,
      totalAmount,
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
      status: "Confirmed",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart();

    navigate("/order-confirmation", { state: newOrder });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="address" placeholder="Address Line" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-2 rounded" />

        <div>
          <p className="font-semibold">Payment Method</p>
          <p>Cash on Delivery (COD)</p>
        </div>

        <button className="bg-green-600 text-white py-3 px-6 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};
