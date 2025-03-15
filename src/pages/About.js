import React from "react";
import Footer from "../components/footer";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 font-inter">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      {/* Company Info */}
      <p className="text-lg text-gray-700 mb-6">
        Atplace was built in April 2024 by Optum employees, for Optum employees.
        Designed to solve the hassle of tracking in-office workdays, it
        automatically records your attendance—so you don’t have to. Just
        download the app, show up at the office, and let AtPlace do the rest.
      </p>

      {/* Contact Form */}
      <h2 className="text-2xl font-bold mb-1">Our Team</h2>
      <dv>
        <p>
          Atplace, founded in April 2024, is designed to simplify attendance
          tracking for Optum employees. We believe in the power of automation
          and ease, eliminating the need for manual tracking.
        </p>
        <br></br>
        <p>
          Our team is dedicated to creating a seamless experience, ensuring you
          can focus on work while Atplace handles the rest. Just show up, and
          we’ll take care of the counting.
        </p>
      </dv>

      {/* Our Team */}
      <h2 className="text-2xl font-bold mb-6 mt-6">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Team Member */}
        {[
          { name: "Hari T", role: "Passionate Developer" },
          { name: "Yuganshi Bhatnagar", role: "Passionate Developer" },
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
