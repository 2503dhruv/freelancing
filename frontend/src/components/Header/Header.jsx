import { Link } from "react-router-dom";
import "./Header.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/category/Gates", label: "Gates" },
  { to: "/category/Staircases", label: "Staircases" },
  { to: "/category/Railings", label: "Railings" },
  { to: "/category/Balconies", label: "Balconies" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Premium Steel Works
        </Link>

        <nav className="header__nav">
          {navLinks.map(({ to, label }) => (
            <Link key={to + label} to={to} className="header__link">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
