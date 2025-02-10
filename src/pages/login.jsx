import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase.config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Side - Instagram Branding */}
        <div className="w-1/2 bg-pink-500 text-white flex flex-col items-center justify-center p-10 shadow-lg h-130">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" className="w-28 mb-6" />
          <h2 className="text-3xl font-semibold mb-4">Welcome Back!</h2>
          <p className="text-center text-lg">Log in and continue sharing your moments with the world.</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={LoginUser}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account? {" "}
              <a href="/register" className="text-pink-600 hover:text-pink-700">
                Sign up
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
