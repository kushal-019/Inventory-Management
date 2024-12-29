// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = ( ) => {
//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };
//   const navigate=useNavigate();

//   return (
//     <nav className="sticky top-0 z-50 px-6 py-4 shadow-lg text-light bg-dark">
//       <div className="flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-2xl font-bold">
//           <span className="text-lightblue">Invento</span> Mart
//         </div>

//         {/* Nav Links */}
//         <div className="hidden space-x-6 md:flex">
//           <button
//             onClick={() => scrollToSection("home")}
//             className="transition duration-300 hover:text-lightblue"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => scrollToSection("about")}
//             className="transition duration-300 hover:text-lightblue"
//           >
//             About Us
//           </button>
//           <button
//             onClick={() => navigate('/Dashboard')}
//             className="transition duration-300 hover:text-lightblue"
//           >
//             Profile
//           </button>
//           <button className="px-4 py-2 transition duration-300 rounded-lg bg-midblue hover:bg-lightblue"
//           onClick={()=> {
//             localStorage.removeItem("authToken");
//             navigate('/');

//           }}
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             className="text-lightblue focus:outline-none"
//             aria-label="Toggle Navigation"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);  // Close mobile menu after clicking
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-blue-400">Invento</span> Mart
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="transition duration-300 hover:text-blue-400"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="transition duration-300 hover:text-blue-400"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/Dashboard')}
              className="transition duration-300 hover:text-blue-400"
            >
              Profile
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-400 hover:text-blue-300 focus:outline-none"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="transition duration-300 hover:text-blue-400 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="transition duration-300 hover:text-blue-400 py-2"
              >
                About Us
              </button>
              <button
                onClick={() => navigate('/Dashboard')}
                className="transition duration-300 hover:text-blue-400 py-2"
              >
                Profile
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300 w-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;