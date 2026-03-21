import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card__wrapper">
        <div className="product-card__image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
          />
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">{product.title}</h3>
        </div>
      </div>
    </Link>
  );
}
