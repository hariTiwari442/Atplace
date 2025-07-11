import { useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import {
  Form,
  redirect,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";

const AuthPage = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userExist, setUserExist] = useState(false);
  const [isSignUp, setIsSignup] = useState(
    searchParams.get("mode") === "signup"
  );
  const [isProcessing, setIsProcessing] = useState(false); // New state for loading

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true); // Start loading

    const formData = new FormData(event.target);
    const authData = {
      username: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // https://atplace-api-565389196387.asia-south1.run.app
    try {
      const mode = isSignUp ? "signup" : "login";
      const res = await fetch(
        `https://atplace-api-565389196387.asia-south1.run.app/${mode}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(authData),
        }
      );

      const resData = await res.json();

      if (res.ok && mode === "signup") {
        navigate(
          `/verify-otp?email=${encodeURIComponent(
            authData.email
          )}&userid=${encodeURIComponent(resData.userId)}`
        );
      } else if (res.ok && mode === "login") {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        navigate(`/dashboard/${resData.userId}`);
      } else {
        if (res.status == 409) {
          setIsProcessing(true);
        }
        alert(resData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Network error! Try again.");
    }

    setIsProcessing(false); // Stop loading
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-inter">
      <div className="w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <Form method="post" className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full p-3 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              className="w-full p-3 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="w-full p-3 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Auth Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isProcessing} // Disable button while processing
          >
            {isProcessing ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
          </button>

          {!isSignUp && (
            <div className="text-right mt-2">
              <Link
                to="/forget-password"
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}
          {isProcessing && (
            <div className="text-right mt-2">
              <Link
                to="/verify-mail"
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Verify your mail
              </Link>
            </div>
          )}
        </Form>

        {/* Processing Popup */}
        {isProcessing && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold">Processing...</p>
              <p className="text-sm text-gray-500">Please wait</p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow bg-gray-300 h-px"></div>
          <span className="mx-4 text-sm text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-grow bg-gray-300 h-px"></div>
        </div>

        {/* Social Login */}
        <div className="flex space-x-4">
          <button className="flex items-center justify-center w-full border border-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaGithub className="mr-2" /> Github
          </button>
          <button className="flex items-center justify-center w-full border border-gray-700 py-2 rounded-lg hover:bg-gray-200 transition">
            <FaTwitter className="mr-2" /> Twitter
          </button>
        </div>

        {/* Switch between Login & Signup */}
        <p className="mt-6 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup((prevState) => !prevState);
              navigate(isSignUp ? "/auth?mode=login" : "/auth?mode=signup");
            }}
            className="text-black font-medium hover:underline"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const data = await request.formData();
  const authData = {
    username: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  const res = await fetch(
    "https://atplace-api-565389196387.asia-south1.run.app/" + mode,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  const resData = await res.json();
  const token = resData.token;
  const userId = resData.userId;
  console.log(resData);
  if (res.ok && mode === "signup") {
    return redirect(
      `/verify-otp?email=${encodeURIComponent(
        authData.email
      )}&userid=${encodeURIComponent(userId)}`
    );
  }
  console.log(resData);
  if (res.ok && mode === "login") {
    console.log("from here", token, userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    return redirect(`/dashboard/${userId}`);
  }
  return redirect("/");
};
