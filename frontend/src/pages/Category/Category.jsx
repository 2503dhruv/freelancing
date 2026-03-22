import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productsApi, categoriesApi } from "../../services/api";
import "./Category.css";

export default function Category() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState(slug || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    Promise.all([
      productsApi.getByCategorySlug(slug),
      categoriesApi.getBySlug(slug).catch(() => null),
    ])
      .then(([prods, cat]) => {
        setProducts(prods || []);
        setCategoryName(cat?.name || slug);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  const displayName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, " ")
    : slug;

  return (
    <div className="category">
      <h1 className="category__title">{displayName}</h1>
      {loading ? (
        <p className="category__loading">Loading...</p>
      ) : (
        <div className="category__grid">
          {products.length ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="category__empty">No products yet. Check back soon.</p>
          )}
        </div>
      )}
    </div>
  );
}
