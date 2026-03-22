import { useState } from "react";
import { contactApi } from "../../services/api";
import "./Contact.css";

const contactInfo = [
  {
    icon: "📍",
    title: "Visit Us",
    details: ["123 Industrial Way", "Your City, State 12345"],
  },
  {
    icon: "📞",
    title: "Call Us",
    details: ["+1 (555) 123-4567", "Mon–Sat: 8AM – 6PM"],
  },
  {
    icon: "✉️",
    title: "Email",
    details: ["info@premiumsteelworks.com", "Replies within 24 hours"],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await contactApi.submit(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <section className="contact__hero">
        <h1 className="contact__title">Get in Touch</h1>
        <p className="contact__tagline">
          Have a project in mind? We'd love to hear from you.
        </p>
      </section>

      <div className="contact__layout">
        <section className="contact__form-section">
          <h2 className="contact__heading">Send a Message</h2>
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="quote">Get a Quote</option>
                  <option value="consultation">Schedule Consultation</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {success && <p className="contact__success">Message sent! We'll get back to you soon.</p>}
            {error && <p className="contact__error">{error}</p>}
            <button type="submit" className="contact__submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>

        <aside className="contact__info">
          <h2 className="contact__heading">Contact Information</h2>
          <div className="contact__info-cards">
            {contactInfo.map((item) => (
              <div key={item.title} className="contact__info-card">
                <span className="contact__info-icon">{item.icon}</span>
                <h3 className="contact__info-title">{item.title}</h3>
                {item.details.map((line) => (
                  <p key={line} className="contact__info-detail">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="contact__hours">
            <h3 className="contact__hours-title">Business Hours</h3>
            <p className="contact__hours-text">Monday – Saturday: 8:00 AM – 6:00 PM</p>
            <p className="contact__hours-text">Sunday: Closed</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
