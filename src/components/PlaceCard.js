import React, { useState, useEffect } from "react";
import { Plus, Minus, RotateCw } from "lucide-react";
import { getAuthToken } from "./util/auth";
const PlaceCard = ({ name, count, placeId, onDelete, Tag }) => {
  const [newCount, setnewCount] = useState(count);
  const token = getAuthToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000); // Message disappears after 3 seconds

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [errorMessage, successMessage]);
  const updateNegativeCounter = async () => {
    window.alert(
      "You cannot decrease the counter. Please go to the contact page and submit a request for the same."
    );
  };
  const updateHandler = async () => {
    try {
      if (!navigator.geolocation) {
        setErrorMessage("Geolocation is not supported by your browser.");
        return;
      }

      const getPosition = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true, // More precise location
            timeout: 10000, // 10s timeout
            maximumAge: 5000, // Cache position for 5s
          });
        });

      // Get current location
      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      // Set API timeout (AbortController)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

      const response = await fetch(
        `https://aristotle-839538790556.asia-south2.run.app/dashboard/place/${placeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId); // Clear timeout if request completes

      if (!response.ok) {
        const errorText = await response.text(); // Read raw response
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to update place");
      }

      // Parse response safely
      let data;
      try {
        data = JSON.parse(await response.text());
      } catch (jsonError) {
        throw new Error("Invalid response from server.");
      }

      setSuccessMessage("Place updated successfully!");
      setErrorMessage("");
      setnewCount(data.counter || newCount);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-64 text-center">
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-sm font-semibold">{Tag}</p>
      <p className="text-3xl font-semibold">{newCount}</p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={updateNegativeCounter}
        >
          <Minus size={20} />
        </button>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={updateHandler}
        >
          <Plus size={20} />
        </button>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          //   onClick={() => setCount(0)}
        >
          <RotateCw size={20} />
        </button>
      </div>
      {token && (
        <button
          onClick={() => onDelete(placeId)}
          className=" m-2  bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
};
// protected.DELETE("/place/:pid",controllers.DeletePlaceById)

export default PlaceCard;
