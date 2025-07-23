import React, { useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/contact", formData);

      if (res.data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to send message. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <Navbar/>
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md mt-10">
       
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact Us</h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            Thank you for your message! We will get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 border-t pt-6 text-center text-gray-700">
          <p className="mb-2 font-semibold">Or reach us directly at:</p>
          <p>Email: <a href="mailto:ankushkumarsin@gmail.com" className="text-green-600 hover:underline">support@jobfinder.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="text-green-600 hover:underline">+91 coming soon</a></p>
          <p>Address: coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
