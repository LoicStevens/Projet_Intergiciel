

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/api/auth/forgot-password', {
        email: email,
      });

      // Stocker l'email temporairement pour la vérification OTP
      localStorage.setItem('resetEmail', email);

      // Rediriger vers la page de vérification OTP
      navigate('/otpVerification');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'OTP :', error);
      alert('Une erreur est survenue. Vérifie ton email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="JobOs" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Forgot Password? 🔐
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email and we ll send you instructions to reset password
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email 
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-custom-green text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Send reset OTP
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

export default ForgotPassword;