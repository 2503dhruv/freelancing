import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsApi } from "../../services/api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    productsApi
      .getById(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="product-details"><p className="product-details__loading">Loading...</p></div>;
  if (!product) return <div className="product-details"><p className="product-details__error">Product not found.</p></div>;

  return (
    <div className="product-details">
      <div className="product-details__grid">
        <div className="product-details__image-wrap">
          <img src={product.image} alt={product.title} className="product-details__image" />
        </div>
        <div className="product-details__info">
          <h1 className="product-details__title">{product.title}</h1>
          {product.category && (
            <p className="product-details__category">{product.category.name}</p>
          )}
          {product.description && (
            <p className="product-details__content">{product.description}</p>
          )}
          {!product.description && (
            <p className="product-details__content">3D Viewer will come here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
