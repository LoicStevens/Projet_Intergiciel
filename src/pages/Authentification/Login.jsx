



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8081/api/auth/login', {
        identifier,
        password
      });

      const { token, user } = res.data;

      // Sauvegarde dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirection selon le rôle
      if (user.role === 'CLIENT') {
        navigate('/home-client');
      } else if (user.role === 'PRESTATAIRE') {
        navigate('/home-prestataire');
      } else {
        navigate('/');
      }

    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError(err.response?.data || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="JobOs" className="h-12" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Welcome to JobOs! 👋
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please sign in to your account and start the adventure
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-custom-green"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600">
                👁
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-custom-green text-white rounded-md hover:custom-green focus:outline-none"
          >
            Sign in
          </button>
        </form>
       <p className="text-center text-gray-600 mt-6">
  New on our platform?{' '}
  <a href="/register" className="text-custom-green hover:underline">
    Create an account
  </a>
</p>

<p className="text-center text-gray-600 mt-2">
  Forgot your password?{' '}
  <a href="/forgotPassword" className="text-custom-green hover:underline">
    Reset it here
  </a>
</p>

      </div>
    </div>
  );
};

export default LoginPage;
