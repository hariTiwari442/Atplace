import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SetNewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Supabase sends token as hash fragment: #access_token=...&type=recovery
  const hash = new URLSearchParams(window.location.hash.slice(1));
  const token = hash.get("access_token");
  const type = hash.get("type");
  const hashError = hash.get("error");
  const hashErrorDesc = hash.get("error_description");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token || type !== "recovery") {
      setError("Invalid or expired reset link. Please request a new one.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_password: password, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password updated! Redirecting to login...");
        setTimeout(() => navigate("/auth?mode=login"), 2000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-2">Set new password</h2>
        <p className="text-gray-500 text-sm mb-4">
          Create a new password for your account
        </p>

        {hashError && (
          <div className="text-red-600 text-sm mb-4">
            <p className="font-semibold">Link expired or invalid.</p>
            <p>{hashErrorDesc?.replace(/\+/g, " ")}</p>
            <a href="/forget-password" className="underline text-black mt-1 inline-block">
              Request a new reset link →
            </a>
          </div>
        )}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}

        {!hashError && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <button type="button" className="absolute inset-y-0 right-3 flex items-center" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-md">
              Set new password
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-gray-500 text-sm flex items-center justify-center">
          <Lock size={16} className="mr-1" />
          Your password is securely encrypted
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
