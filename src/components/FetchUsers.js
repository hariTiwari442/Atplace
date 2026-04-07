import React, { useState, useEffect } from "react";
import { CheckCircle, User, Mail, Building } from "lucide-react";

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState({});
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://aristotle-1069976119647.asia-south1.run.app/users"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users: " + err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId) => {
    try {
      setVerifying((prev) => ({ ...prev, [userId]: true }));

      const response = await fetch(
        `https://aristotle-1069976119647.asia-south1.run.app/verify-user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update user status locally
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isVerified: true } : user
        )
      );

      console.log(`User ${userId} verified successfully`);
    } catch (err) {
      console.error("Error verifying user:", err);
      alert("Failed to verify user: " + err.message);
    } finally {
      setVerifying((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <button
            onClick={fetchUsers}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="h-6 w-6" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and verify user accounts
            </p>
          </div>

          <div className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users found</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {user.name || "No name"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">
                          {user.email || "No email"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 text-sm">
                          {user.company || "No company"}
                        </span>
                      </div>

                      <div className="pt-2">
                        {user.verified ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <button
                            onClick={() => verifyUser(user.id)}
                            disabled={verifying[user.id]}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {verifying[user.id] ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Verifying...
                              </div>
                            ) : (
                              "Make Verified"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerification;
