import React, { useState, useEffect } from "react";
import { Plus, Minus, RotateCw, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlaceCard = ({ name, count, placeId, Tag }) => {
  const [newCount, setnewCount] = useState(count);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    if (errorMessage || successMessage || infoMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
        setInfoMessage("");
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage, infoMessage]);

  const updateNegativeCounter = async () => {
    window.alert(
      "You cannot decrease the counter. Please go to the contact page and submit a request for the same."
    );
  };

  const updateHandler = async () => {
    try {
      if (!navigator.geolocation) {
        setErrorMessage("Geolocation is not supported by your browser.");
        return;
      }

      const getPosition = () =>
        new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, () => {
            navigator.geolocation.getCurrentPosition(resolve, (err) => {
              if (err.code === 1) {
                reject(new Error(
                  "Location denied. iPhone: Settings → Privacy → Location Services → AtPlace (or Safari) → While Using App"
                ));
              } else if (err.code === 2) {
                reject(new Error("Location unavailable. Please try again near a window or outside."));
              } else {
                reject(new Error("Location timed out. Please try again."));
              }
            }, {
              enableHighAccuracy: false,
              timeout: 10000,
              maximumAge: 60000,
            });
          }, {
            enableHighAccuracy: true,
            timeout: 8000,
            maximumAge: 5000,
          });
        });

      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/dashboard/place/${placeId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ latitude, longitude }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (response.status === 401) {
        localStorage.clear();
        navigate("/auth?mode=login&reason=expired");
        return;
      }

      if (response.status === 429) {
        const data = await response.json().catch(() => ({}));
        setInfoMessage(data.message || "You have already checked in here today.");
        setErrorMessage("");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to update place");
      }

      let data;
      try {
        data = JSON.parse(await response.text());
      } catch (jsonError) {
        throw new Error("Invalid response from server.");
      }

      setSuccessMessage("Place updated successfully!");
      setErrorMessage("");
      setnewCount(data.counter || newCount);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const toggleHistory = async () => {
    const next = !showHistory;
    setShowHistory(next);
    if (next && history === null && !historyLoading) {
      setHistoryLoading(true);
      setHistoryError("");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard/history/${placeId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 401) {
          localStorage.clear();
          navigate("/auth?mode=login&reason=expired");
          return;
        }
        if (!response.ok) {
          throw new Error("Could not load history.");
        }
        const data = await response.json();
        setHistory(data.history || []);
      } catch (err) {
        setHistoryError(err.message || "Could not load history.");
      } finally {
        setHistoryLoading(false);
      }
    }
  };

  const isOptum = Tag === "Work";

  return (
    <div
      className="shadow-lg rounded-2xl p-6 w-64 text-center"
      style={isOptum ? { backgroundColor: "#002677", color: "#fff" } : { backgroundColor: "#fff", color: "#000" }}
    >
      <h2 className="text-xl font-bold mb-1">
        {isOptum ? (
          <><span style={{ color: "#FF6900" }}>Optum</span> <span style={{ color: "#fff" }}>GGN</span></>
        ) : name}
      </h2>
      <p className="text-sm font-semibold" style={isOptum ? { color: "#FF6900" } : {}}>{Tag}</p>
      <p className="text-3xl font-semibold">{newCount}</p>
      <p className="text-xs opacity-70 mt-1">days this month</p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
          onClick={updateNegativeCounter}
        >
          <Minus size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
          onClick={updateHandler}
        >
          <Plus size={20} />
        </button>
        <button
          className="p-2 rounded-full hover:opacity-80"
          style={isOptum ? { backgroundColor: "#FF6900", color: "#fff" } : { backgroundColor: "#e5e7eb" }}
        >
          <RotateCw size={20} />
        </button>
      </div>

      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
      {infoMessage && (
        <p className="text-sm mt-2" style={isOptum ? { color: "#FF6900" } : { color: "#2563eb" }}>
          {infoMessage}
        </p>
      )}

      <button
        onClick={toggleHistory}
        className="mt-4 flex items-center justify-center gap-1 mx-auto text-sm opacity-80 hover:opacity-100"
      >
        {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        {showHistory ? "Hide history" : "Show past months"}
      </button>

      {showHistory && (
        <div
          className="mt-3 pt-3 border-t text-left"
          style={isOptum ? { borderColor: "rgba(255,255,255,0.2)" } : { borderColor: "#e5e7eb" }}
        >
          {historyLoading && <p className="text-sm opacity-70 text-center">Loading…</p>}
          {historyError && <p className="text-red-500 text-sm text-center">{historyError}</p>}
          {!historyLoading && !historyError && history && history.length === 0 && (
            <p className="text-sm opacity-70 text-center">No past visits yet.</p>
          )}
          {!historyLoading && !historyError && history && history.length > 0 && (
            <ul className="space-y-1 text-sm">
              {history.map((m) => (
                <li key={m.month} className="flex justify-between">
                  <span>{m.monthLabel}</span>
                  <span className="font-semibold">{m.uniqueDays} days</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaceCard;
