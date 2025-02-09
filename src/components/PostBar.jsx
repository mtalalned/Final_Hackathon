import React, { useEffect, useState } from 'react';
import { FaRegSmile, FaRegImage, FaVideo, FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../configs/firebase.config';
import { onAuthStateChanged } from "firebase/auth";
import { query, where, addDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const PostBar = ({ imgurl }) => {
  const [postText, setPostText] = useState('');
  const [postimgUrl, setPostImgUrl] = useState('');
  const [userObj, setUserObj] = useState({}); // Initialize as an object
  const navigate = useNavigate();
  const [postArray , setPostArray] = useState([])

  var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dc9jcq8gl', 
    uploadPreset: 'expertizo-hackathon'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info.url);
        setPostImgUrl(result.info.url) 
      }
    }
  )

  useEffect(()=>{
         onAuthStateChanged(auth, async (user) => {
                if (user) {
                const uid = user.uid;
                // ...
                console.log (user.uid)
    
                const q = query(collection(db, "users"), where("userUid", "==", uid));
    
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                setUserObj(doc.data())
            });
              } else {
                navigate ('/login')
            }
            });
  } , [])



  useEffect(()=>{
// Function to get all posts from the "posts" collection
    const getAllPosts = async () => {
    try {
    // Reference to the "posts" collection
    const postsCollectionRef = collection(db, "posts");

    // Get all documents from the collection
    const querySnapshot = await getDocs(postsCollectionRef);
    // Loop through each document and log its data
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data()); // doc.id is the document ID and doc.data() is the document data
        postArray.push(doc.data())
        setPostArray([...postArray])
    });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// Call the function
getAllPosts();
}, [])



  const createPost = async () => {
    console.log(postText);

    // Check if the user is authenticated
    const docRef = await addDoc(collection(db, "posts"), {
        username: userObj.username,
        email: userObj.email,
        userUid: userObj.userUid,
        description: postText,
        posterPic: userObj.imgUrl,
        postImg: postimgUrl, // Add the imgUrl if necessary
        likes: [],
        comments: [],
      });
  };


  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {/* Status Input Box */}
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="flex items-center space-x-3">
          <img
            src={imgurl}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="What's happening?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"     onClick={() => myWidget.open()}>
            <FaVideo className="text-red-500" />
            <span>Live video</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500" onClick={() => myWidget.open()}>
            <FaRegImage className="text-green-500" />
            <span>Photos</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <FaRegSmile className="text-yellow-500" />
            <span>Feeling</span>
          </button>
          <button onClick={createPost} className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm">
            Post
          </button>
        </div>
      </div>

      {/* Post Card */}
      {postArray && postArray.map((item , index)=>{
        return <div className="bg-white p-4 shadow rounded-lg">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <img
            src={item.posterPic}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{item.username}</h2>
          </div>
        </div>

        {/* Post Image */}
        <div className="mt-3 rounded-lg overflow-hidden">
          <img
            src={item.postImg}
            alt="Post"
            className="w-full object-cover"
          />
        </div>

        {/* Reactions and Comments */}
        <div className="flex items-center justify-between mt-3 text-gray-600 text-sm">
          <div className="flex items-center">
            <img src="https://randomuser.me/api/portraits/women/46.jpg" alt="User" className="w-6 h-6 rounded-full border-2 border-white -ml-2" />
            <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="User" className="w-6 h-6 rounded-full border-2 border-white -ml-2" />
            <img src="https://randomuser.me/api/portraits/women/48.jpg" alt="User" className="w-6 h-6 rounded-full border-2 border-white -ml-2" />
            <span className="ml-2">+13</span>
          </div>
          <p>13 Comments • 340 Likes</p>
        </div>

        {/* Like, Comment, Share */}
        <div className="border-t pt-3 mt-3 flex justify-between text-gray-600">
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaRegHeart />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaRegComment />
            <span>Comments</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        {/* Comment Box */}
        <div className="border-t pt-3 mt-3 flex items-center">
          <img
            src="https://randomuser.me/api/portraits/women/49.jpg"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 ml-2"
          />
          <button className="p-2 bg-pink-500 text-white rounded-full ml-2">
            <IoSend />
          </button>
        </div>
      </div>
      })}
      
    </div>
  );
};

export default PostBar;
