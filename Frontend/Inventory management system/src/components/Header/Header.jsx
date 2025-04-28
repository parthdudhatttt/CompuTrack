import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { menuItems } from "../../constant/constant";

const Header = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-lg py-3 px-6 md:px-10 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4 text-white font-serif text-2xl font-extrabold">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            CompuTrack
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <ul className="flex space-x-6">
            {auth ? (
              <>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-lg font-semibold transition duration-300 ${
                          isActive
                            ? "text-yellow-300 underline underline-offset-4"
                            : "text-white"
                        } hover:text-yellow-300`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Link
                    to="/login"
                    onClick={logout}
                    className="text-lg font-semibold text-white hover:text-yellow-300 transition duration-300"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `text-lg font-semibold transition duration-300 ${
                      isActive
                        ? "text-yellow-300 underline underline-offset-4"
                        : "text-white"
                    } hover:text-yellow-300`
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-lg font-semibold transition duration-300 ${
                      isActive
                        ? "text-yellow-300 underline underline-offset-4"
                        : "text-white"
                    } hover:text-yellow-300`
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white hover:text-yellow-300 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      {isSidebarVisible && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="flex-grow bg-black opacity-50 transition-opacity duration-300"
            onClick={closeSidebar}
          ></div>

          {/* Sidebar */}
          <aside
            id="logo-sidebar"
            className="w-3/5 sm:w-1/3 h-screen pt-5 bg-gradient-to-r from-purple-700 to-blue-800 text-white transform transition-transform duration-300 ease-in-out"
          >
            <div className="h-full px-5 pb-6 overflow-y-auto">
              <button
                className="absolute top-5 right-5 text-white hover:text-yellow-300 transition duration-300"
                onClick={closeSidebar}
              >
                ✕
              </button>
              <ul className="space-y-6 font-medium mt-8">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block text-lg font-semibold px-5 py-3 rounded-lg transition duration-300 ${
                          isActive
                            ? "bg-yellow-400 text-black"
                            : "hover:bg-yellow-400 hover:text-black"
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Link
                    to="/login"
                    onClick={() => {
                      logout();
                      toggleSidebar();
                    }}
                    className="block text-lg font-semibold px-5 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
