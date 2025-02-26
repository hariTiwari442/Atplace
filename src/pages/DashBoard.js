import {
  redirect,
  json,
  useLoaderData,
  useRevalidator,
  useNavigation,
} from "react-router-dom";
import PlaceCard from "../components/PlaceCard";
import { useState, useEffect } from "react";
import PlaceForm from "../components/AddPlace";
import Footer from "../components/footer";

const DashBoard = () => {
  const navigation = useNavigation();
  console.log(navigation.state, "state of loader");
  const placess = useLoaderData(); // Load data from loader
  const { revalidate } = useRevalidator(); // Get the revalidation function
  const [places, setPlaces] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const startDeleteHandler = async (placeId) => {
    const proceed = window.confirm(
      "Are you sure you want to delete this place?"
    );
    if (!proceed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/dashboard/place/${placeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete place");
      }
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.placeId !== placeId)
      );

      // Revalidate to ensure data consistency with backend
      revalidate();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      placess.length > 0 &&
      JSON.stringify(placess) !== JSON.stringify(places)
    ) {
      setPlaces(placess); // Update state when placess data is available
    }
  }, [placess, places]); // Runs when placess changes

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/dashboard/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Place Added:", data);
      revalidate(); // Manually refresh the loader
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {navigation.state === "loading" ? (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse"></div>
      ) : (
        <>
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Your Places</h1>
            <div className="flex flex-wrap gap-6">
              {places.map((place, index) => (
                <PlaceCard
                  key={index}
                  placeId={place.placeId}
                  name={place.name}
                  count={place.Count}
                  onDelete={startDeleteHandler}
                  Tag={place.tag}
                />
              ))}
            </div>
            <button
              className="bg-black text-white px-4 py-2 mt-3 rounded-lg hover:bg-gray-800"
              onClick={() => setShowForm(true)}
            >
              Add Place
            </button>
            {showForm && (
              <PlaceForm
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
                showForm={showForm}
              />
            )}
          </div>

          {/* Footer Always at Bottom */}
          <Footer className="mt-auto" />
        </>
      )}
    </div>
  );
};

export default DashBoard;

// Loader function for authentication
export const loader = async ({ params }) => {
  console.log("I am from loder");
  const { uid: UserId } = params;
  const token = localStorage.getItem("token");
  if (!UserId || UserId === "undefined" || !token) {
    return redirect("/login");
  }

  const response = await fetch("http://localhost:8080/dashboard/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("error hai");
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
};
