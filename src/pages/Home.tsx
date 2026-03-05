import { Carousel } from "../components/Carousel";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

const Home = () => {

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts
  });

  if (isLoading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center">Error loading products</p>;

  return (
    <div className="space-y-8">
      
      <Carousel />

      <section className="text-center">
        <h1 className="text-3xl font-bold">Welcome to MyStore</h1>
        <p className="mt-2 text-gray-600">
          Minimal E-commerce built with React, Tailwind & shadcn/ui
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
        >
          Shop Now
        </Link>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
        {products?.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

    </div>
  );
};

export default Home;