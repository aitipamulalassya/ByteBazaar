import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  const signedIn = localStorage.getItem("signedIn");

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b-4 border-black shadow-lg sticky top-0 z-50">
      <h1
        onClick={() => {
          Navigate("/signin");
        }}
        className="text-5xl font-mono font-bold text-white cursor-pointer relative group select-none"
      >
      ByteBazaar
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-blue-400 transition-all group-hover:w-full"></span>
      </h1>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => Navigate("/marketplace")}
          className="bg-blue-500 text-white uppercase font-semibold border-2 border-black px-5 py-2 rounded shadow-[4px_4px_0px_0px_white] transition-transform transform hover:scale-110 hover:bg-blue-600"
        >
          Marketplace
        </button>

        {signedIn === "true" ? (
          <>
            <button
              onClick={() => Navigate("/dashboard")}
              className="bg-red-500 text-white uppercase font-semibold border-2 border-black px-5 py-2 rounded shadow-[4px_4px_0px_0px_white] transition-transform transform hover:scale-110 hover:bg-red-600"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                localStorage.setItem("signedIn", false);
                Navigate("/signin");
              }}
              className="bg-red-500 text-white uppercase font-semibold border-2 border-black px-5 py-2 rounded shadow-[4px_4px_0px_0px_white] transition-transform transform hover:scale-110 hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.setItem("signedIn", false);
              Navigate("/signin");
            }}
            className="bg-red-500 text-white uppercase font-semibold border-2 border-black px-5 py-2 rounded shadow-[4px_4px_0px_0px_white] transition-transform transform hover:scale-110 hover:bg-red-600"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;