import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Slide from "./models/Slide.js";
import Product from "./models/Product.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/premium-steel-works";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Seeding...");

  await User.deleteMany({});
  const admin = await User.create({
    email: "admin@premiumsteelworks.com",
    password: "admin123",
  });
  console.log("✓ Admin created: admin@premiumsteelworks.com / admin123");

  await Category.deleteMany({});
  const categories = await Category.insertMany([
    {
      name: "Gates",
      slug: "gates",
      image: "https://res.cloudinary.com/dlxjb5vzm/image/upload/v1774166511/tptpfkugtinn82fmdjt9.png",
      order: 0,
    },
    {
      name: "Staircases",
      slug: "staircases",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop",
      order: 1,
    },
    {
      name: "Railings",
      slug: "railings",
      image: "https://images.unsplash.com/photo-1582582494700-4c2e6d4f0d8d?w=600&h=450&fit=crop",
      order: 2,
    },
    {
      name: "Balconies",
      slug: "balconies",
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=450&fit=crop",
      order: 3,
    },
  ]);
  console.log("✓ Categories created:", categories.length);

  await Slide.deleteMany({});
  const slides = await Slide.insertMany([
    {
      title: "Browse everything.",
      text: "Premium Gates, Staircases, Railings and Balcony solutions for modern spaces.",
      image: "https://res.cloudinary.com/dlxjb5vzm/image/upload/v1774166511/tptpfkugtinn82fmdjt9.png",
      order: 0,
    },
    {
      title: "Built with precision.",
      text: "Engineered steel work with durable finishes and clean architectural details.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=80",
      order: 1,
    },
    {
      title: "Designed for impact.",
      text: "From homes to commercial projects, every piece is tailored to your style.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=80",
      order: 2,
    },
  ]);
  console.log("✓ Slides created:", slides.length);

  await Product.deleteMany({});
  const gatesId = categories.find((c) => c.slug === "gates")._id;
  const stairsId = categories.find((c) => c.slug === "staircases")._id;
  await Product.insertMany([
    { title: "Modern Gate", image: "https://res.cloudinary.com/dlxjb5vzm/image/upload/v1774166511/tptpfkugtinn82fmdjt9.png", category: gatesId },
    { title: "Classic Wrought Iron Gate", image: "https://images.unsplash.com/photo-1597003676818-8f1d5f1c3c14?w=600&h=450&fit=crop", category: gatesId },
    { title: "Steel Staircase", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop", category: stairsId },
    { title: "Floating Tread Stairs", image: "https://images.unsplash.com/photo-1600566752227-8f3b8de1f8dd?w=600&h=450&fit=crop", category: stairsId },
  ]);
  console.log("✓ Sample products created");

  await mongoose.disconnect();
  console.log("✓ Seed complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
