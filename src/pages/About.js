import React from "react";
import Footer from "../components/footer";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-inter">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      {/* Company Info */}
      <p className="text-lg text-gray-700 mb-6">
        Have questions or inquiries? Feel free to reach out to us. Our team is
        always ready to assist you.
      </p>

      {/* Contact Form */}
      <h2 className="text-2xl font-bold mb-1">Our Team</h2>
      <dv>
        <p>
          Classy Company was founded in 2023 with a vision to redefine elegance
          in the digital age. We believe in the power of simplicity and the
          beauty of minimalism
        </p>
        <br></br>
        <p>
          Our team of passionate designers and developers work tirelessly to
          create products that not only look stunning but also provide an
          unparalleled user experience
        </p>
      </dv>

      {/* Our Team */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team Member */}
        {[
          { name: "Hari T", role: "executive director" },
          { name: "Yuganshi", role: "chief technological officer" },
          { name: "Alice Johnson", role: "Operations Lead" },
        ].map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
              <span className="text-3xl font-semibold">👤</span>
            </div>
            <h3 className="font-semibold mt-3">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default About;
