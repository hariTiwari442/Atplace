import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import {
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";

const Contact = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigation.state === "submitting") {
      setIsSubmitted(true); // Mark that the form was submitted
    }

    if (isSubmitted && navigation.state === "idle") {
      navigate("/"); // Redirect after form submission is complete
    }
  }, [navigation.state, isSubmitted, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <Form method="post" className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Send Message"}
            </button>
          </Form>

          {/* Display Messages */}
          {isLoading && <p className="text-gray-500">Submitting...</p>}
          {actionData?.error && (
            <p className="text-red-500">{actionData.error}</p>
          )}
          {actionData?.success && (
            <p className="text-green-500">{actionData.message}</p>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Information</h2>
          <p className="flex items-center gap-2">
            📍 873 Sector-38, Gurugram, 122001
          </p>
          <p className="flex items-center gap-2">📞 +91 6394184343</p>
          <p className="flex items-center gap-2">✉️ haritiwari442@gmail.com</p>

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

export const action = async ({ request }) => {
  const data = await request.formData();

  const formData = {
    name: data.get("name"),
    email: data.get("email"),
    message: data.get("message"),
  };

  try {
    const res = await fetch(
      "https://aristotle-452112.de.r.appspot.com/dashboard/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Something went wrong!" };
    }

    const responseData = await res.json();
    return { success: true, message: responseData.message };
  } catch (error) {
    return { error: "Failed to connect to the server. Please try again." };
  }
};
