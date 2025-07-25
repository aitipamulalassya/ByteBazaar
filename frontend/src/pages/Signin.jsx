import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('signedIn', true);
        navigate('/dashboard');
      } else {
        alert('Error signing in. Please try again.');
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('An error occurred while signing in. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[6px_6px_0px_0px_black] w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-wide select-none">Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-5 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-7 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          autoComplete="current-password"
        />

        <div className="flex justify-between">
          <button
            onClick={handleSignin}
            disabled={loading}
            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Signing in...' : 'Signin'}
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;