import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../connection/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (res.success === false) {
        setError(res.message);
        return;
      }
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 md:px-0 ">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center m-8 md:mb-0">
        <img
          src="checklist.png"
          alt="Inventory Checklist"
          className="w-full max-w-lg h-auto object-contain transform transition duration-1000 hover:scale-105"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6 m-8 md:p-8 transition duration-500 ease-in-out hover:shadow-2xl">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none transition duration-300 ease-in-out"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-300 outline-none transition duration-300 ease-in-out"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none transition duration-300 ease-in-out"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-300 outline-none transition duration-300 ease-in-out"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            Register
          </button>
          {error && ( <p className="text-red-500 text-sm mt-2 flex items-center justify-center">{error}</p>)}
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline hover:text-purple-600 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
