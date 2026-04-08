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
      }, 6000);

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
          // First try high accuracy, fall back to low accuracy on error
          navigator.geolocation.getCurrentPosition(resolve, () => {
            navigator.geolocation.getCurrentPosition(resolve, (err) => {
              if (err.code === 1) {
                reject(new Error(
                  "Location denied. iPhone: Settings → Privacy → Location Services → AtPlace (or Safari) → While Using App"
                ));
              } else if (err.code === 2) {
                reject(new Error("Location unavailable. Please try again near a window or outside."));
              } else {
                reject(new Error("Location timed out. Please try again."));
              }
            }, {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 60000,
            });
          }, {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 5000,
          });
        });

      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      // Set API timeout (AbortController)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/dashboard/place/${placeId}`,
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

  const isOptum = Tag === "Work";

  return (
    <div
      className="shadow-lg rounded-2xl p-6 w-64 text-center"
      style={isOptum ? { backgroundColor: "#002677", color: "#fff" } : { backgroundColor: "#fff", color: "#000" }}
    >
      <h2 className="text-xl font-bold mb-1">
        {isOptum ? (
          <><span style={{ color: "#FF6900" }}>Optum</span> <span style={{ color: "#fff" }}>GGN</span></>
        ) : name}
      </h2>
      <p className="text-sm font-semibold" style={isOptum ? { color: "#FF6900" } : {}}>{Tag}</p>
      <p className="text-3xl font-semibold">{newCount}</p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
          onClick={updateNegativeCounter}
        >
          <Minus size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
          onClick={updateHandler}
        >
          <Plus size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
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
