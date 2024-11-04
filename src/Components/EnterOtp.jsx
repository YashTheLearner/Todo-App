import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterOtp = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let response = await axios.post(`${process.env.REACT_APP_API_URL}/verify`, { otp });

      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully');
        navigate('/login');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Enter OTP</h2>
          <p className="mt-2 text-center text-sm text-gray-400">Check your email for the OTP</p>
        </div>

        {/* OTP Form */}
        <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                placeholder="Enter your OTP"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-900/50 border border-red-500/50 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="rounded-md bg-green-900/50 border border-green-500/50 p-4">
              <p className="text-sm text-green-400">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 text-sm font-medium rounded-lg text-white ${
              isLoading ? 'bg-purple-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-gray-800'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>

        {/* Resend OTP Link */}
        <div className="text-sm text-center mt-4">
          <button
            className="font-medium text-purple-400 hover:text-purple-300"
            onClick={() => alert('Resend OTP functionality goes here')}
          >
            Resend OTP
          </button>
        </div>

        {/* Go Back Button */}
        <div className="text-sm text-center mt-4">
          <button
            className="font-medium text-purple-400 hover:text-purple-300"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
