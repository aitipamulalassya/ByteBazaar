import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username.trim() || !password.trim() || !fullName.trim()) {
      alert('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        username,
        password,
        fullName,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('signedIn', true);
        navigate('/dashboard');
      } else {
        alert('Error signing up. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-6">
      <div className="bg-white border-4 border-black p-8 rounded-lg shadow-[6px_6px_0px_0px_black] w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-8 text-center tracking-wide select-none">Sign Up</h2>

        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-5 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={username}
          autoComplete="username"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-5 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={password}
          autoComplete="new-password"
        />

        <input
          type="text"
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full mb-7 p-3 border-2 border-black rounded shadow-[4px_4px_0px_0px_black] placeholder-gray-500 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          value={fullName}
        />

        <div className="flex justify-between">
          <button
            onClick={handleSignup}
            disabled={loading}
            className={`bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <button
            onClick={() => navigate('/signin')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-6 py-2 rounded border-2 border-black shadow-[4px_4px_0px_0px_black] transition-transform transform hover:scale-110"
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;