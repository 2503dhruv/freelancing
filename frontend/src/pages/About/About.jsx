import { Link } from "react-router-dom";
import "./About.css";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "2000+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
];

const values = [
  {
    title: "Precision",
    desc: "Every cut, weld, and finish meets exacting standards. We engineer for longevity.",
  },
  {
    title: "Craftsmanship",
    desc: "Our artisans combine traditional metalwork with modern fabrication techniques.",
  },
  {
    title: "Trust",
    desc: "From consultation to installation, we stand behind our work with transparency.",
  },
];

export default function About() {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-content">
          <h1 className="about__title">About Premium Steel Works</h1>
          <p className="about__tagline">
            Building lasting structures and lasting relationships since 2009.
          </p>
        </div>
      </section>

      <section className="about__intro">
        <div className="about__container">
          <div className="about__intro-grid">
            <div className="about__intro-text">
              <h2 className="about__heading">Our Story</h2>
              <p className="about__body">
                Premium Steel Works began with a simple belief: quality metalwork
                should be accessible without compromise. What started as a small
                workshop has grown into a full-service fabrication house
                specializing in gates, staircases, railings, and custom
                architectural metalwork.
              </p>
              <p className="about__body">
                Today we serve homeowners, architects, and contractors with
                bespoke solutions that combine security, aesthetics, and
                durability. Every project is an opportunity to deliver something
                exceptional.
              </p>
              <Link to="/configurator" className="about__cta">
                Design Your Gate →
              </Link>
            </div>
            <div className="about__intro-visual">
              <div className="about__visual-card">
                <span className="about__visual-label">Est. 2009</span>
                <span className="about__visual-text">Crafting excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__stats">
        <div className="about__container">
          <div className="about__stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="about__stat">
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__values">
        <div className="about__container">
          <h2 className="about__heading about__heading--center">
            What We Stand For
          </h2>
          <div className="about__values-grid">
            {values.map((v) => (
              <div key={v.title} className="about__value-card">
                <h3 className="about__value-title">{v.title}</h3>
                <p className="about__value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__cta-section">
        <div className="about__container">
          <h2 className="about__cta-heading">Ready to Build?</h2>
          <p className="about__cta-text">
            Let's discuss your project. Get a free quote or schedule a visit.
          </p>
          <Link to="/contact" className="about__cta-btn">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
