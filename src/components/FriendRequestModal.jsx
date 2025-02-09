import React from "react";

const FriendSidebar = () => {
  return (
    <div className="rounded-lg mx-2 pt-3 space-y-4">
      {/* Friend Suggestions Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-3 text-gray-700">People You May Know</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((id) => (
            <div key={id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={`https://i.pravatar.cc/50?img=${id}`}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">User {id}</p>
                  <p className="text-xs text-gray-500">5 mutual friends</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Requests Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-3 text-gray-700">Friend Requests</h2>
        <div className="space-y-4">
          {[4, 5].map((id) => (
            <div key={id} className="flex items-center">
              {/* Profile Picture */}
              <img
                src={`https://i.pravatar.cc/50?img=${id}`}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              {/* User Info */}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">User {id}</p>
                <p className="text-xs text-gray-500">Sent you a request</p>
                {/* Buttons */}
                <div className="mt-2 flex gap-2">
                  <button className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-blue-600">
                    Confirm
                  </button>
                  <button className="bg-gray-300 text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-400">
                    Ignore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendSidebar;
