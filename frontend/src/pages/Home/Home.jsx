import { Link } from "react-router-dom";
import "./Home.css";

const categories = [
  { name: "Gates", image: "https://images.unsplash.com/photo-1597003676818-8f1d5f1c3c14" },
  { name: "Staircases", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
  { name: "Railings", image: "https://images.unsplash.com/photo-1582582494700-4c2e6d4f0d8d" },
  { name: "Balconies", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
];

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">Premium Steel Works</h1>
        <p className="home__hero-subtitle">
          Gates • Staircases • Railings • Custom Designs
        </p>
        <Link to="/category/Gates" className="home__hero-cta">
          Explore Designs
        </Link>
      </section>

      <section className="home__categories">
        <h2 className="home__categories-title">Our Categories</h2>
        <div className="home__categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name}`}
              className="home__category-card"
            >
              <img src={cat.image} alt={cat.name} />
              <div className="home__category-card-overlay">
                <h3 className="home__category-card-title">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
