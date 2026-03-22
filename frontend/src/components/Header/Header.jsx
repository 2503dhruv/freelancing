import { Link } from "react-router-dom";
import "./Header.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/configurator", label: "Design Your Gate" },
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
