import { useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Form, redirect, useSearchParams } from "react-router-dom";

const AuthPage = (props) => {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignup] = useState(
    searchParams.get("mode") === "signup"
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-inter">
      <div className="w-full max-w-md p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <Form method="post" className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="w-full p-3 mt-1 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
            />
          </div>

          {/* Auth Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </Form>

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
            onClick={() => setIsSignup(!isSignUp)}
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
  console.log("https:8080/" + mode, "url");
  const data = await request.formData();
  const authData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(authData);
  return redirect("/");
};
