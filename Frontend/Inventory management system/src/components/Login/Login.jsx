import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../connection/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await auth.login(formData.email, formData.password);
      if (res.success == true) {
        navigate("../");
        const token = res.token;
        localStorage.clear();
        localStorage.setItem("token",token);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 md:px-0">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-lg rounded-lg p-6 m-8 md:p-8 md:mb-0 transition duration-500 ease-in-out hover:shadow-2xl">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition duration-300 ease-in-out"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 outline-none transition duration-300 ease-in-out"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2 flex items-center justify-center">{error}</p>}
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline hover:text-purple-600 transition-colors"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center m-8">
        <img
          src="checklist.png"
          alt="Inventory Checklist"
          className="w-full max-w-lg h-auto object-contain transform transition duration-1000 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Login;
