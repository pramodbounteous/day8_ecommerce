import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 mx-auto"
            />
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="font-bold mt-2">${item.price}</p>

            <button
              onClick={() => moveToCart(item)}
              className="bg-black text-white px-3 py-1 mt-3 rounded w-full"
            >
              Move to Cart
            </button>

            <button
              onClick={() => removeFromWishlist(item.id)}
              className="border px-3 py-1 mt-2 rounded w-full"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
