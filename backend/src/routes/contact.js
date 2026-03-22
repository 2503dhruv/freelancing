import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Name, email, subject, and message are required",
      });
    }
    const contact = await Contact.create({
      name,
      email,
      phone: phone || "",
      subject,
      message,
    });
    res.status(201).json({ message: "Message sent", id: contact._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
