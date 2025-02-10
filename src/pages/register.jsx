import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db} from '../configs/firebase.config';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";

const Register = () => {
    
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [username , setUsername] = useState('')
    const [imgUrl , setImgUrl] = useState('')
    const navigate = useNavigate()
  
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'dc9jcq8gl', 
      uploadPreset: 'expertizo-hackathon'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info.url);
          setImgUrl(result.info.url) 
        }
      }
    )
  
    const RegisterUser = (event) => {
      
      event.preventDefault()
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          const docRef = await addDoc(collection(db, "users"), {
            username,
            email,
            userUid: user.uid,
            imgUrl,
            friends: []
          });
          console.log("Document written with ID: ", docRef.id);
          navigate ('/login')
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => {
        console.log (error.message)
      });
      setEmail('')
      setPassword('')
      setUsername('')
    }
    
    return (
      <div className="min-h-screen bg-pink-100 flex items-center justify-center">
  <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
    {/* Left Box with Instagram Logo and Marketing Message */}
    <div className="w-1/2 bg-pink-500 text-white flex flex-col items-center justify-center p-10 shadow-lg">
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" className="w-28 mb-6" />
      <h2 className="text-3xl font-semibold mb-4">Join the Instagram Family</h2>
      <p className="text-center text-lg">Create an account and connect with your friends on Instagram. Share photos, stories, and more!</p>
    </div>

    {/* Right Box with Input Fields and Register Button */}
    <div className="w-1/2 p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={(event) => RegisterUser(event)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input type="text" id="username" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <button type="button" className="w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500" onClick={() => myWidget.open()}>Upload image</button>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500">Sign Up</button>
      </form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-pink-600 hover:text-pink-700">Login here</a></p>
      </div>
    </div>
  </div>
</div>

    
  );
};

export default Register;
