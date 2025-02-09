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

      console.log (email , password)

      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
      console.log (user)
        try {
          const docRef = await addDoc(collection(db, "users"), {
            username,
            email,
            userUid: user.uid,
            imgUrl,
          });
          console.log("Document written with ID: ", docRef.id);
          navigate ('/login')
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log (errorMessage)
      });

      setEmail('')
      setPassword('')
    }
    return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-teal-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={(event) => RegisterUser(event)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="text"
              name="Username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
          <button
           type="button"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => myWidget.open()}
          >
            Upload image
          </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
