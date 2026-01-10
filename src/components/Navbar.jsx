import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
        ${isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200 text-gray-800"
          : "bg-transparent text-white"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate("/")}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent hover:from-blue-700 hover:via-cyan-600 hover:to-teal-500 transition-all duration-300"
            >
              OES
            </button>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white hover:text-cyan-300 hover:bg-white/10"
                } rounded-lg`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white hover:text-cyan-300 hover:bg-white/10"
                } rounded-lg`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white hover:text-cyan-300 hover:bg-white/10"
                } rounded-lg`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white hover:text-cyan-300 hover:bg-white/10"
                } rounded-lg`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <div className="hidden md:block">
            <button
              onClick={handleLogin}
              className="relative inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Login</span>
              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${
                isScrolled ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white hover:text-cyan-300 hover:bg-white/10"
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!open ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          <button
            onClick={() => scrollToSection("home")}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left rounded-lg transition-all duration-200"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left rounded-lg transition-all duration-200"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left rounded-lg transition-all duration-200"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full text-left rounded-lg transition-all duration-200"
          >
            Contact
          </button>
          <div className="pt-2">
            <button
              onClick={handleLogin}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
            >
              Login
              <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
