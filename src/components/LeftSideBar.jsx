import React from 'react';
import { FaHome, FaUsers, FaShoppingCart, FaEnvelope, FaCog } from 'react-icons/fa';

const LeftSideBar = () => {
  return (
    <div className="max-w-xs mx-2 mt-3 p-4 space-y-4 h-123 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Feed</h2>
      <nav className="space-y-3">
        <button className="flex items-center space-x-3 p-2 bg-white hover:bg-pink-100 transition-all rounded-lg w-full">
          <FaHome className="text-gray-700 text-lg" /> <span className="text-md">Home</span>
        </button>
        <button className="flex items-center space-x-3 p-2 bg-white hover:bg-pink-100 transition-all rounded-lg w-full">
          <FaUsers className="text-gray-700 text-lg" /> <span className="text-md">Groups</span>
        </button>
        <button className="flex items-center space-x-3 p-2 bg-white hover:bg-pink-100 transition-all rounded-lg w-full">
          <FaShoppingCart className="text-gray-700 text-lg" /> <span className="text-md">Marketplace</span>
        </button>
        <button className="flex items-center space-x-3 p-2 bg-white hover:bg-pink-100 transition-all rounded-lg w-full">
          <FaEnvelope className="text-gray-700 text-lg" /> <span className="text-md">Messages</span>
        </button>
        <button className="flex items-center space-x-3 p-2 bg-white hover:bg-pink-100 transition-all rounded-lg w-full">
          <FaCog className="text-gray-700 text-lg" /> <span className="text-md">Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default LeftSideBar;
