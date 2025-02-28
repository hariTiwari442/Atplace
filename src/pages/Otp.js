import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const userid = searchParams.get("userid");

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode, userid: userid }),
      });

      const resData = await res.json();
      if (res.ok) {
        alert("OTP Verified! Redirecting...");
        navigate("/auth?mode=login");
        // Navigate to dashboard
      } else {
        alert(resData.message || "Invalid OTP, try again!");
      }
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setTimer(120);
    setResendDisabled(true);

    try {
      const res = await fetch("http://localhost:8080/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: userid, email: email }),
      });

      const resData = await res.json();
      if (res.ok) {
        alert("New OTP has been sent!");
      } else {
        setTimer(0);
        alert(resData.message || "Failed to resend OTP.");
      }
    } catch (error) {
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px] text-center">
        <h2 className="text-2xl font-bold text-black">Verify Your Account</h2>
        <p className="text-gray-400 mt-2">OTP sent to: {email}</p>
        <p className="text-gray-500 mt-2">
          Enter the 6-digit code sent to your phone
        </p>

        <div className="flex justify-center items-center mt-4 text-gray-700">
          <span className="text-lg">
            ⏳{" "}
            {`${Math.floor(timer / 60)}:${(timer % 60)
              .toString()
              .padStart(2, "0")}`}
          </span>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-black focus:ring-2 focus:ring-black outline-none"
              maxLength={1}
              disabled={loading}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className={`w-full mt-6 py-2 rounded-md text-white font-semibold ${
            otp.join("").length === 6
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={otp.join("").length !== 6 || loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <p className="text-gray-500 mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={handleResend}
            className={`text-black font-semibold ${
              resendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={resendDisabled}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
