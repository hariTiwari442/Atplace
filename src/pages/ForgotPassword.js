import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://aristotle-452112.de.r.appspot.com/forgot-password",
        {
          email,
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-2">Reset password</h2>
        <p className="text-gray-500 text-sm mb-4">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {message && <p className="text-green-600 text-sm">{message}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Reset password
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/auth?mode=login"
            className="text-gray-600 hover:underline flex items-center justify-center gap-1"
          >
            Back to login <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
