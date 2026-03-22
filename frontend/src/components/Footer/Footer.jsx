import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__section">
            <h3>Company</h3>
            <ul className="footer__list">
              <li><Link to="/about" className="footer__link">About</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
              <li><Link to="/" className="footer__link">Services</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>Products</h3>
            <ul className="footer__list">
              <li><Link to="/category/gates" className="footer__link">Gates</Link></li>
              <li><Link to="/category/staircases" className="footer__link">Staircases</Link></li>
              <li><Link to="/category/railings" className="footer__link">Railings</Link></li>
              <li><Link to="/category/balconies" className="footer__link">Balconies</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>Support</h3>
            <ul className="footer__list">
              <li><Link to="/" className="footer__link">FAQ</Link></li>
              <li><Link to="/" className="footer__link">Terms</Link></li>
              <li><Link to="/" className="footer__link">Privacy</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>Contact</h3>
            <p className="footer__text">
              info@premiumsteelworks.com
            </p>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Premium Steel Works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
