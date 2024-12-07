import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ( ) => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigate=useNavigate();

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-lightblue">Invento</span> Mart
        </div>

        {/* Nav Links */}
        <div className="hidden space-x-6 md:flex">
          <button
            onClick={() => scrollToSection("home")}
            className="transition duration-300 hover:text-lightblue"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="transition duration-300 hover:text-lightblue"
          >
            About Us
          </button>
          <button
            onClick={() => navigate('/Dashboard')}
            className="transition duration-300 hover:text-lightblue"
          >
            Profile
          </button>
          <button className="px-4 py-2 transition duration-300 rounded-lg bg-midblue hover:bg-lightblue">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-lightblue focus:outline-none"
            aria-label="Toggle Navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
