import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Category.css";

const dummyProducts = [
  {
    _id: "1",
    title: "Modern Gate",
    image: "https://images.unsplash.com/photo-1597003676818-8f1d5f1c3c14?w=600&h=450&fit=crop",
  },
  {
    _id: "2",
    title: "Steel Staircase",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
  },
];

export default function Category() {
  const { name } = useParams();

  return (
    <div className="category">
      <h1 className="category__title">{name}</h1>
      <div className="category__grid">
        {dummyProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
