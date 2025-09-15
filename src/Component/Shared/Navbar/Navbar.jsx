import { NavLink } from "react-router-dom";
import { useState } from "react";
import { LuLogIn } from "react-icons/lu";
import Swal from "sweetalert2";
import logo from "/mainlogo.png";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, handleSignOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogOut = () => {
    handleSignOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to log out",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const navItem = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/apartment"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-white"
            }`
          }
        >
          Apartment
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-24 md:w-32" />
          <p className="font-sans text-xl font-extrabold md:text-base tracking-widest text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Homex
          </p>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4 text-md">
          {navItem}

          {user ? (
            <div className="relative">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              />
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-gray-900 bg-opacity-95 text-white rounded-xl shadow-xl p-4 z-50">
                  <h1 className="font-semibold text-lg mb-2">{user.displayName}</h1>
                  <NavLink to="/dashboard">
                    <li className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-md py-2 px-3 mt-2 text-center cursor-pointer transition duration-300">
                      Dashboard
                    </li>
                  </NavLink>
                  <li
                    onClick={handleLogOut}
                    className="bg-red-600 hover:bg-red-500 rounded-md py-2 px-3 mt-2 text-center cursor-pointer transition duration-300"
                  >
                    Log Out
                  </li>
                </div>
              )}
            </div>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="text-2xl px-3 py-2 hover:text-purple-400 transition duration-300"
              >
                <LuLogIn />
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {mobileMenuOpen && (
            <ul className="absolute right-0 mt-2 w-52 bg-gray-900 bg-opacity-95 rounded-xl shadow-xl p-4 flex flex-col gap-2 z-50">
              {navItem}

              {user ? (
                <div className="flex flex-col mb-2 gap-2">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-purple-500 cursor-pointer hover:ring-2 hover:ring-purple-400 transition"
                    onClick={() =>
                      setProfileDropdownOpen(!profileDropdownOpen)
                    }
                  />

                  {profileDropdownOpen && (
                    <div className="flex flex-col gap-2 mt-2">
                      <NavLink to="/dashboard">
                        <li className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-md py-2 px-3 text-center cursor-pointer transition duration-300">
                          Dashboard
                        </li>
                      </NavLink>
                      <li
                        onClick={handleLogOut}
                        className="bg-red-600 hover:bg-red-500 rounded-md py-2 px-3 text-center cursor-pointer transition duration-300"
                      >
                        Log Out
                      </li>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="text-2xl px-3 py-2 hover:text-purple-400 transition duration-300"
                >
                  <LuLogIn />
                </NavLink>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
