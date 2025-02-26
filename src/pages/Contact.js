import React from "react";
import Footer from "../components/footer";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Message"
                rows="4"
              ></textarea>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded">
              Send Message
            </button>
          </form>
        </div>
        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Information</h2>
          <p className="flex items-center gap-2">
            📍 873 Sector-38, Gurugram, 122001
          </p>
          <p className="flex items-center gap-2">📞 +91 6394184343</p>
          <p className="flex items-center gap-2">✉️ haritiwari442@gmail.cokm</p>
          <h2 className="text-xl font-semibold mt-6 mb-2">Business Hours</h2>
          <p>Monday - Friday: 9am - 5pm</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
