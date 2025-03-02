import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../components/util/auth";
import Footer from "../components/footer";

// const Profile = () => {
//   const navigate = useNavigate(); // Initialize navigation

//   const handleLogout = () => {
//     localStorage.clear(); // Clear all local storage
//     navigate("/login", { replace: true }); // Redirect to login page
//     window.location.reload(); // Force a full re-render
//   };

//   return (
//     <button
//       className="px-4 py-2 bg-black text-white font-inter rounded-lg hover:bg-gray-800 transition-all"
//       onClick={handleLogout}
//     >
//       Logout
//     </button>
//   );
// };

const Profile = () => {
  const navigate = useNavigate(); // Initialize navigation
  const data = useLoaderData();
  const [user, setUser] = useState(() => data || {});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // setUser(data);
  console.log(user, "From user");
  useEffect(() => {
    if (data && !Object.is(user, data)) {
      setUser(data);
    }
    setLoading(false);
  }, [data, user]); // Runs when placess changes

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate("/auth?mode=login", { replace: true }); // Redirect to login page
    window.location.reload(); // Force a full re-render
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(
        "https://aristotle-452112.de.r.appspot.com/dashboard/uploadImg",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.imageUrl) {
        setImage(`https://aristotle-452112.de.r.appspot.com/${data.imageUrl}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Centered Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center bg-white shadow-xl rounded-xl p-6 w-96">
          {/* Loading Spinner */}
          {loading ? (
            <div className="text-lg font-semibold flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-600"></div>
              <span>Uploading...</span>
            </div>
          ) : (
            <>
              {/* Profile Image */}
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition-all">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    "🧑"
                  )}
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* User Info */}
              <h2 className="text-xl font-semibold mt-4">
                {user?.username || "User"}
              </h2>
              <p className="text-gray-500">
                {user?.email || "No email available"}
              </p>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer Stays at Bottom */}
      <Footer className="mt-auto" />
    </div>
  );
};

export default Profile;

export const loader = async ({ params }) => {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=signup");
  }

  const { uid } = params;
  if (!uid || uid === "undefined") {
    return redirect("/auth?mode=login");
  }

  try {
    const response = await fetch(
      "https://aristotle-452112.de.r.appspot.com/dashboard/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data; // ✅ Correctly returning fetched user data
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};
