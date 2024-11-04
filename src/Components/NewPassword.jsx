import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to generate OTP
  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/otp`,
        { email }
      );

      if (response.status === 200) {
        setSuccessMessage("OTP sent to your email.");
      } else {
        setError("Error generating OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to generate OTP. Please check your email and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle password reset
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/forgot`, {
        email,
        newPassword: password,
        userOTP: otp,
      });

      if (response.status === 200) {
        setSuccessMessage("Password has been reset successfully. You can now log in.");
        let navigate = useNavigate();
        navigate("/");
      } else {
        setError("Invalid OTP or email.");
      }
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Set New Password</h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email, generate OTP, and set a new password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
              <button
                type="button"
                onClick={handleGenerateOtp}
                className="py-2 mt-5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-gray-800"
              >
                Generate OTP
              </button>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {error && <p className="text-red-400">{error}</p>}
          {successMessage && <p className="text-green-400">{successMessage}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-white ${
              isLoading ? "bg-purple-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-gray-800"
            }`}
          >
            {isLoading ? "Loading..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
