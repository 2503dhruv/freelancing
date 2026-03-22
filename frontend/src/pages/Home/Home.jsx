import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoriesApi, slidesApi } from "../../services/api";
import "./Home.css";
import showcaseGateImg from "./Screenshot 2026-03-22 123953.png";

const fallbackCategories = [
  { name: "Gates", slug: "gates", image: "https://res.cloudinary.com/dlxjb5vzm/image/upload/v1774166511/tptpfkugtinn82fmdjt9.png" },
  { name: "Staircases", slug: "staircases", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" },
  { name: "Railings", slug: "railings", image: "https://images.unsplash.com/photo-1582582494700-4c2e6d4f0d8d?w=1200&q=80" },
  { name: "Balconies", slug: "balconies", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80" },
];

const fallbackSlides = [
  { title: "Browse everything.", text: "Premium Gates, Staircases, Railings and Balcony solutions for modern spaces.", image: showcaseGateImg },
  { title: "Built with precision.", text: "Engineered steel work with durable finishes and clean architectural details.", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=80" },
  { title: "Designed for impact.", text: "From homes to commercial projects, every piece is tailored to your style.", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=80" },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState(fallbackCategories);
  const [slides, setSlides] = useState(fallbackSlides);

  useEffect(() => {
    categoriesApi.getAll().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    slidesApi.getAll().then((data) => {
      if (data?.length) setSlides(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-bg">
          {slides.map((slide, index) => (
            <img
              key={slide.title + index}
              src={slide.image}
              alt={slide.title}
              className={`home__hero-slide ${index === activeIndex ? "home__hero-slide--active" : ""}`}
            />
          ))}
        </div>
        <div className="home__hero-overlay" />

        <div className="home__hero-content">
          <p className="home__eyebrow">Premium Steel Works</p>
          <h1 className="home__hero-title">{currentSlide?.title}</h1>
          <p className="home__hero-subtitle">{currentSlide?.text}</p>

          <div className="home__hero-actions">
            <Link to="/configurator" className="home__hero-cta">
              Design Your Gate
            </Link>
            <Link to="/category/gates" className="home__hero-ghost">
              Explore Designs
            </Link>
          </div>

          <div className="home__dots" aria-label="Hero slider controls">
            {slides.map((slide, index) => (
              <button
                key={slide.title + index}
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
              <img src={showcaseGateImg} alt="Modern steel gate design" />
            </div>
          </div>
          <div className="home__showcase-desc">
            <h3 className="home__showcase-title">Premium Gates</h3>
            <p className="home__showcase-text">
              Bespoke steel gates that combine security with style. From minimalist
              linear designs to ornate patterns, each gate is fabricated to your
              exact specifications and finished for lasting durability.
            </p>
            <Link to="/category/gates" className="home__showcase-link">
              View Gates →
            </Link>
          </div>
        </article>

        <article className="home__showcase-row home__showcase-row--reverse">
          <div className="home__showcase-visual">
            <div className="home__showcase-3d">
              <img
                src="https://images.unsplash.com/photo-1600566752227-8f3b8de1f8dd?w=900&q=85"
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
            <Link to="/category/staircases" className="home__showcase-link">
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
              key={cat._id || cat.slug || cat.name}
              to={`/category/${cat.slug || cat.name?.toLowerCase()}`}
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
