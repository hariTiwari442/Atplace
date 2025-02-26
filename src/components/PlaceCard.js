import React, { useState } from "react";
import { Plus, Minus, RotateCw } from "lucide-react";
import { getAuthToken } from "./util/auth";
import { useSubmit } from "react-router-dom";
const PlaceCard = ({ name, count, placeId, onDelete, Tag }) => {
  const [newCount, setnewCount] = useState(count);
  const token = getAuthToken();

  const updateHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/place/${placeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete place");
      }
      const data = await response.json();
      setnewCount((prev) => {
        return data.counter;
      });
    } catch (error) {
      console.error(error);
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
          //   onClick={() => setCount(count - 1)}
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
    </div>
  );
};
// protected.DELETE("/place/:pid",controllers.DeletePlaceById)

export default PlaceCard;
