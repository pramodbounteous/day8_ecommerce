import { Carousel } from "../components/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="space-y-8">
      <Carousel />
      <section className="text-center">
        <h1 className="text-3xl font-bold">Welcome to MyStore</h1>
        <p className="mt-2 text-gray-600">Minimal E-commerce built with React, Tailwind & shadcn/ui</p>
        <Link to="/products" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
          Shop Now
        </Link>
      </section>
    </div>
  );
};
export default Home;

