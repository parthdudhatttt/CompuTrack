import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false); // Tracks whether to show Login or Register

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Sliding Container */}
      <div
        className={`absolute flex w-full h-full transform transition-transform duration-700 ${
          isLogin ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Register Component */}
        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <Register onToggle={handleToggle} />
        </div>
        {/* Login Component */}
        <div className="w-full flex-shrink-0 flex items-center justify-center">
          <Login onToggle={handleToggle} />
        </div>
      </div>
    </div>
  );
};

const Register = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Register data:", formData);
    navigate("/login");
  };

  return (
    <div className="w-full md:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            placeholder="Create a password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
        >
          Register
        </button>
      </form>
      <p className="text-sm text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <button
          onClick={onToggle}
          className="text-blue-600 font-semibold hover:underline hover:text-purple-600 transition-colors"
        >
          Login
        </button>
      </p>
    </div>
  );
};

const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="w-full md:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Welcome Back
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-600 text-center mt-6">
        Don't have an account?{" "}
        <button
          onClick={onToggle}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Auth;
