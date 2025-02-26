import user from "../assets/user.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center p-5 bg-white shadow-md">
//       <h1 className="text-xl font-bold">AttendanceTracker</h1>
//       <div className="hidden md:flex space-x-6 flex justify-end items-center p-0 bg-white ">
//         <a href="#" className="hover:text-blue-600 ">
//           Home
//         </a>
//         <a href="#" className="hover:text-blue-600 flex items-center space-x-2">
//           <span>Profile</span>
//           <img src={user} alt="User" className="w-6 h-6 rounded-full" />
//         </a>
//         {/* <a href="#" className="hover:text-blue-600">
//           Profile
//         </a> */}
//         {/* <Button label="Login" />
//         <Button label="Logout" /> */}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import Logo from "./UI/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  // Function to update userId state from localStorage
  const updateUserId = () => {
    setUserId(localStorage.getItem("userId") || "");
  };

  // ✅ Listen for localStorage changes (Works across tabs)
  useEffect(() => {
    window.addEventListener("storage", updateUserId);

    return () => {
      window.removeEventListener("storage", updateUserId);
    };
  }, []);

  // ✅ Update state when user logs in/out (within same tab)
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      console.log("checking");
      originalSetItem.apply(this, arguments);
      if (key === "userId") {
        updateUserId(); // Trigger update when userId changes
      }
    };

    return () => {
      localStorage.setItem = originalSetItem; // Restore original function
    };
  }, [userId]);

  return (
    <nav className="p-5 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink href="#" className="text-lg font-bold text-gray-900">
          <Logo />
        </NavLink>

        {/* Burger Icon for Mobile */}
        <button
          className="md:hidden text-gray-900 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:flex space-x-6 md:space-x-10 px-6 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:flex`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : undefined
            }
          >
            Home
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : undefined
            }
          >
            About
          </NavLink>
          <NavLink
            to="contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600" : undefined
            }
          >
            Contact
          </NavLink>
          {userId !== "" && (
            <NavLink
              to={`/dashboard/${userId}`}
              className={({ isActive }) =>
                isActive ? "text-blue-600" : undefined
              }
            >
              Dashboard
            </NavLink>
          )}
          {/* "hover:text-blue-600 flex items-center space-x-2" */}
          {/* Profile with Icon */}
          {userId !== "" && (
            <NavLink
              to={`/profile/${userId}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex important  items-center space-x-2"
                  : "flex items-center space-x-2"
              }
            >
              <span>Profile</span>
              <img src={user} alt="User" className="w-6 h-6 rounded-full" />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
