import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useLocation } from "react-router-dom";
import { stringify } from "postcss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const query = useQuery();
  const token = query.get("token");
  // Correct way to access params

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = {
      new_password: password,
      token: token,
    };
    console.log(formData);

    // API call to update password
    fetch(
      "https://atplace-api-565389196387.asia-south1.run.app/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Corrected JSON.stringify()
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-2">Set new password</h2>
        <p className="text-gray-500 text-sm mb-4">
          Create a new password for your account
        </p>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field */}
          <label className="block text-sm font-medium">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <label className="block text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Set new password
          </button>
        </form>

        {/* Password Security Info */}
        <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center">
          <Lock size={16} className="mr-1" />
          Your password is securely encrypted
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
