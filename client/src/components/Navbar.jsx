import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const Tabs = () => {
    return (
      <>
        <NavLink
          to={'/'}
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/80 font-medium transition-colors px-2 py-1 rounded-md"
          onClick={() => setOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to={'/pricings'}
          className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/80 font-medium transition-colors px-2 py-1 rounded-md"
          onClick={() => setOpen(false)}
        >
          Pricings
        </NavLink>
        {localStorage.getItem('access_token') ? (
          <>
            <NavLink
              to={'/collections'}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/80 font-medium transition-colors px-2 py-1 rounded-md"
              onClick={() => setOpen(false)}
            >
              Collections
            </NavLink>
            <NavLink
              to={'/profile'}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <img src="https://i.pravatar.cc/36" alt="Profile" className="w-full h-full object-cover" />
            </NavLink>
          </>
        ) : (
          <NavLink
            to={'/login'}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-200/80 font-medium transition-colors px-2 py-1 rounded-md"
            onClick={() => setOpen(false)}
          >
            Login
          </NavLink>
        )}
      </>
    );
  };

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="flex-shrink-0 text-2xl font-bold text-gray-800">Shred</h1>
          <div className="hidden md:flex items-center space-x-6">
            <Tabs />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full bg-white/80 border border-gray-300"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 shadow-lg border-b border-gray-200 flex flex-col items-center py-4 space-y-4 animate-fade-in">
          <Tabs />
        </div>
      )}
    </nav>
  );
}
