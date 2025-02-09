import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../configs/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion } from "firebase/firestore";

const FriendSidebar = () => {
  const [users, setUsers] = useState([]); // Store all users except current user
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [friendRequests, setFriendRequests] = useState([]); // Store incoming friend requests
  const [sentRequests, setSentRequests] = useState(new Set()); // Track sent requests

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        fetchUsers(user.uid);
        listenForFriendRequests(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch all users except the current user
  const fetchUsers = async (uid) => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const fetchedUsers = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().userUid !== uid) {
        fetchedUsers.push(doc.data());
      }
    });

    setUsers(fetchedUsers);
  };

  // Listen for incoming friend requests in real-time and fetch sender details
  const listenForFriendRequests = (uid) => {
    const q = query(collection(db, "friendRequests"), where("receiverId", "==", uid), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const requests = [];
      for (const docSnap of querySnapshot.docs) {
        const requestData = docSnap.data();
        const senderRef = doc(db, "users", requestData.senderId);
        const senderSnap = await getDocs(query(collection(db, "users"), where("userUid", "==", requestData.senderId)));

        if (!senderSnap.empty) {
          const senderData = senderSnap.docs[0].data();
          requests.push({
            id: docSnap.id,
            senderId: requestData.senderId,
            senderName: senderData.username,
            senderImg: senderData.imgUrl,
          });
        }
      }
      setFriendRequests(requests);
    });

    return () => unsubscribe();
  };

  // Send friend request
  const sendFriendRequest = async (receiverId) => {
    if (!currentUserUid || !receiverId) return;

    try {
      // Check if request already exists
      const q = query(
        collection(db, "friendRequests"),
        where("senderId", "==", currentUserUid),
        where("receiverId", "==", receiverId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Friend request already sent.");
        return;
      }

      // Add request to Firestore
      await addDoc(collection(db, "friendRequests"), {
        senderId: currentUserUid,
        receiverId,
        status: "pending",
      });

      setSentRequests((prev) => new Set(prev).add(receiverId)); // Update UI
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const getUserDocRef = async (userUid) => {
    const q = query(collection(db, "users"), where("userUid", "==", userUid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].ref; // Get the document reference
    }
    return null; // If the user doesn't exist
  };

 const acceptFriendRequest = async (requestId, senderId) => {
  try {
    const senderRef = await getUserDocRef(senderId);
    const receiverRef = await getUserDocRef(currentUserUid);

    if (!senderRef || !receiverRef) {
      console.error("Error: One of the user documents does not exist.");
      return;
    }

    // Update friends list
    await updateDoc(senderRef, { friends: arrayUnion(currentUserUid) });
    await updateDoc(receiverRef, { friends: arrayUnion(senderId) });

    // Delete friend request
    await deleteDoc(doc(db, "friendRequests", requestId));

    // Remove from local state
    setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
  } catch (error) {
    console.error("Error accepting friend request:", error);
  }
};



  // Decline friend request
  const declineFriendRequest = async (requestId) => {
    try {
      await deleteDoc(doc(db, "friendRequests", requestId));

      // Remove from local state
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  return (
    <div className="rounded-lg mx-2 pt-3 space-y-4">
      {/* People You May Know Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-3 text-gray-700">People You May Know</h2>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.userUid} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-3">
              <img src={user.imgUrl} alt="profile" className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-800">{user.username}</p>
                {sentRequests.has(user.userUid) ? (
                  <button className="mt-2 w-full bg-gray-400 text-white text-sm font-semibold py-2 rounded-lg">
                    Request Sent
                  </button>
                ) : (
                  <button
                    onClick={() => sendFriendRequest(user.userUid)}
                    className="mt-2 w-full bg-blue-500 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Send Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Friend Requests Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-md font-semibold mb-3 text-gray-700">Friend Requests</h2>
        <div className="space-y-4">
          {friendRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">No friend requests at the moment.</p>
          ) : (
            friendRequests.map((req) => (
              <div key={req.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
                <img src={req.senderImg || "https://i.pravatar.cc/50"} alt="profile" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">{req.senderName}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => acceptFriendRequest(req.id, req.senderId)}
                      className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => declineFriendRequest(req.id)}
                      className="bg-gray-300 text-xs font-semibold px-3 py-1 rounded-md hover:bg-gray-400"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendSidebar;
