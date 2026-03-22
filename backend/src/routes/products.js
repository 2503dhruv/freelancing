import express from "express";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/category/:slug", async (req, res) => {
  try {
    const cat = await Category.findOne({ slug: req.params.slug });
    if (!cat) return res.status(404).json({ message: "Category not found" });
    const products = await Product.find({ category: cat._id }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug"
    );
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, image, category, description } = req.body;
    if (!title || !image || !category) {
      return res
        .status(400)
        .json({ message: "Title, image, and category required" });
    }
    const product = await Product.create({
      title,
      image,
      category,
      description: description || "",
    });
    await product.populate("category", "name slug");
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { title, image, category, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, image, category, description },
      { new: true }
    ).populate("category", "name slug");
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
