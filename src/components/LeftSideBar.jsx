import React from 'react';
import { FaHome, FaUsers, FaShoppingCart, FaEnvelope, FaCog } from 'react-icons/fa';

const LeftSideBar = () => {
  return (
    <div className="max-w-xs mx-2 mt-3 p-4 space-y-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Feed</h2>
      <nav className="space-y-3">
        <button className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg w-full">
          <FaHome /> <span>Home</span>
        </button>
        <button className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg w-full">
          <FaUsers /> <span>Groups</span>
        </button>
        <button className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg w-full">
          <FaShoppingCart /> <span>Marketplace</span>
        </button>
        <button className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg w-full">
          <FaEnvelope /> <span>Messages</span>
        </button>
        <button className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg w-full">
          <FaCog /> <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default LeftSideBar;