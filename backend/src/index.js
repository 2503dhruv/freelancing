import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import productRoutes from "./routes/products.js";
import contactRoutes from "./routes/contact.js";
import slideRoutes from "./routes/slides.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/premium-steel-works")
  .then(() => console.log("✓ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/slides", slideRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Premium Steel Works API" });
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
