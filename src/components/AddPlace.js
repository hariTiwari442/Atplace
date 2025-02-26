import { useState, useEffect } from "react";

const PlaceForm = ({ onClose, onSubmit, showForm }) => {
  const [isShow, setIsShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    latitude: "",
    longitude: "",
  });

  // Get user's current location
  useEffect(() => {
    console.log("I am from effect");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, [showForm]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close form after submission
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        <h2 className="text-xl font-semibold text-black mb-4 font-inter">
          Add Place
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md font-inter"
          />
          <input
            type="text"
            name="place"
            placeholder="Enter Tag like (Gym,Office)"
            value={formData.place}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md font-inter"
          />
          <div className="text-gray-600 font-inter">
            <p>Latitude: {formData.latitude || "Fetching..."}</p>
            <p>Longitude: {formData.longitude || "Fetching..."}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-600 hover:text-black"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceForm;
