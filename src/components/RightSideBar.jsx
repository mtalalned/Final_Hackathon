import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../configs/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const RightSidebar = () => {
  const [users, setUsers] = useState([]); // Store all users for stories
  const [friends, setFriends] = useState([]); // Store only friends for chat
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUsers(user.uid);
        fetchFriends(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch all users for stories
  const fetchUsers = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const allUsers = querySnapshot.docs.map((doc) => doc.data());
    setUsers(allUsers);
  };

  // Fetch only friends for chat
  const fetchFriends = async (uid) => {
    const userDoc = await getDocs(query(collection(db, "users"), where("userUid", "==", uid)));
    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();
      const friendIds = userData.friends || [];
      if (friendIds.length > 0) {
        const friendsQuery = query(collection(db, "users"), where("userUid", "in", friendIds));
        const friendsSnapshot = await getDocs(friendsQuery);
        const friendList = friendsSnapshot.docs.map((doc) => doc.data());
        setFriends(friendList);
      }
    }
  };

  return (
    <div className="max-w-xs mx-2 mt-3 p-4 space-y-4 bg-white shadow-md rounded-lg">

      {/* Search Stories */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Stories"
          className="w-full px-4 py-2 border rounded-full bg-gray-100 text-sm focus:outline-none"
        />
      </div>

      {/* Stories Section */}
      <div className="flex space-x-4 overflow-x-auto">
        {users.map((user) => (
          <div key={user.userUid} className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full p-1 cursor-pointer border-2 border-pink-500">
              <img src={user.imgUrl} alt={user.username} className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="text-xs text-gray-700 mt-1">{user.username}</p>
          </div>
        ))}
      </div>

      {/* Recent Chats */}
      <div>
        <h3 className="font-semibold text-gray-800">Recent Chats</h3>
        <div className="space-y-3 mt-2">
          {friends.length === 0 ? (
            <p className="text-gray-500 text-sm">No friends to show.</p>
          ) : (
            friends.map((friend) => (
              <div key={friend.userUid} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <img src={friend.imgUrl} alt={friend.username} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{friend.username}</h4>
                  </div>
                </div>
                <FaRegCommentDots className="text-gray-500" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
