import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

// If user is already logged in, skip the auth page and go straight to dashboard
export function redirectIfAuth() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (token && userId) {
    return redirect(`/dashboard/${userId}`);
  }
  return null;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=signup");
  }
  return null;
}
