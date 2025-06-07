  import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const email = localStorage.getItem('resetEmail'); // Email stocké après OTP

    try {
      const response = await fetch('http://localhost:8081/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword: password })
      });

      if (response.ok) {
        setSuccessMessage("Password successfully reset!");
        setErrorMessage('');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="JobOs" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Reset Password? 🔗
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please sign in to your account and start the adventure
        </p>

        {successMessage && (
          <div className="mb-4 text-green-600 text-center font-medium">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center font-medium">{errorMessage}</div>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-custom-green text-white rounded-md hover:bg-green-600 focus:outline-none"
          >
            Reset
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          <a href="/login" className="text-custom-green hover:underline">
            <i className="fas fa-chevron-left"></i> Back
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
