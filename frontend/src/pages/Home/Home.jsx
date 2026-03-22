import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import showcaseGateImg from "./Screenshot 2026-03-22 123953.png";

const categories = [
  {
    name: "Gates",
    image:
      "https://images.unsplash.com/photo-1597003676818-8f1d5f1c3c14?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Staircases",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Railings",
    image:
      "https://images.unsplash.com/photo-1582582494700-4c2e6d4f0d8d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Balconies",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
];

const slides = [
  {
    title: "Browse everything.",
    text: "Premium Gates, Staircases, Railings and Balcony solutions for modern spaces.",
    image: showcaseGateImg,
  },
  {
    title: "Built with precision.",
    text: "Engineered steel work with durable finishes and clean architectural details.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80",
  },
  {
    title: "Designed for impact.",
    text: "From homes to commercial projects, every piece is tailored to your style.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-bg">
          {slides.map((slide, index) => (
            <img
              key={slide.title}
              src={slide.image}
              alt={slide.title}
              className={`home__hero-slide ${
                index === activeIndex ? "home__hero-slide--active" : ""
              }`}
            />
          ))}
        </div>
        <div className="home__hero-overlay" />

        <div className="home__hero-content">
          <p className="home__eyebrow">Premium Steel Works</p>
          <h1 className="home__hero-title">{slides[activeIndex].title}</h1>
          <p className="home__hero-subtitle">{slides[activeIndex].text}</p>

          <div className="home__hero-actions">
            <Link to="/category/Gates" className="home__hero-cta">
              Explore Designs
            </Link>
            <Link to="/category/Railings" className="home__hero-ghost">
              View Portfolio
            </Link>
          </div>

          <div className="home__dots" aria-label="Hero slider controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`home__dot ${index === activeIndex ? "home__dot--active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="home__showcase" aria-labelledby="showcase-heading">
        <h2 id="showcase-heading" className="home__showcase-heading">
          Crafted for Impact
        </h2>

        <article className="home__showcase-row">
          <div className="home__showcase-visual">
            <div className="home__showcase-3d">
              <img
                src={showcaseGateImg}
                alt="Modern steel gate design"
              />
            </div>
          </div>
          <div className="home__showcase-desc">
            <h3 className="home__showcase-title">Premium Gates</h3>
            <p className="home__showcase-text">
              Bespoke steel gates that combine security with style. From minimalist
              linear designs to ornate patterns, each gate is fabricated to your
              exact specifications and finished for lasting durability.
            </p>
            <Link to="/category/Gates" className="home__showcase-link">
              View Gates →
            </Link>
          </div>
        </article>

        <article className="home__showcase-row home__showcase-row--reverse">
          <div className="home__showcase-visual">
            <div className="home__showcase-3d">
              <img
                src="https://images.unsplash.com/photo-1600566752227-8f3b8de1f8dd?auto=format&fit=crop&w=900&q=85"
                alt="Elegant steel staircase design"
              />
            </div>
          </div>
          <div className="home__showcase-desc">
            <h3 className="home__showcase-title">Staircases That Stand Out</h3>
            <p className="home__showcase-text">
              Custom staircases engineered for both residential and commercial
              spaces. Floating treads, spiral designs, or classic stringers—we bring
              your vision to life with precision metalwork.
            </p>
            <Link to="/category/Staircases" className="home__showcase-link">
              View Staircases →
            </Link>
          </div>
        </article>
      </section>

      <section className="home__categories">
        <div className="home__section-head">
          <h2 className="home__categories-title">Our Categories</h2>
          <p className="home__categories-subtitle">
            Crafted to match your space, function, and style.
          </p>
        </div>

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
