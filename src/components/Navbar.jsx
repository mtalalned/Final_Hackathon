import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { auth , db} from '../configs/firebase.config';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect , useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({imgurl}) => {
    
    const navigate = useNavigate()

    const SignoutUser = ()=>{
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
        });
    }

    return (
    <div className="navbar bg-base-100 flex justify-between">
  <div className="flex-0">
    <a className="btn btn-ghost text-xl">Instagram</a>
  </div>
  <div className="flex-1 gap-2 flex justify-between">
    <div className="form-control w-[40%] mx-[75px]">
      <input type="text" placeholder="Search" className="input input-bordered w-[100%]" />
    </div>
    <div className="dropdown dropdown-end mx-[20px]">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile Picture"
            src={imgurl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg z-[1] mt-3 w-52 p-2">
        <li className="hover:bg-gray-100 rounded-md">
          <a className="flex items-center py-2 px-4 text-gray-700">Home</a>
        </li>
        <li className="hover:bg-gray-100 rounded-md">
          <a className="flex items-center py-2 px-4 text-gray-700">Profile</a>
        </li>
        <li onClick={SignoutUser} className="hover:bg-gray-100 rounded-md">
          <a className="flex items-center py-2 px-4 text-red-500">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar