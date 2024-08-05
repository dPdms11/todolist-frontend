import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A component that renders a fixed header at the top of the window.
 * 
 * @returns {React.FC} The Header component.
 */
const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white py-4 px-5 sm:px-10 sticky top-0 left-0">
      <Link to="/">TODO</Link>
      <div className="text-xs sm:text-sm text-neutral-200">
        <Link to="/" className="pr-6">View List</Link>
        <Link to="/add">Add Todo</Link>
      </div>
    </header>
  );
}

export default Header;
