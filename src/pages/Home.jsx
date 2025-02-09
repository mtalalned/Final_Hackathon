import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import PostBar from '../components/PostBar'
import { useState } from 'react'
import { auth, db } from '../configs/firebase.config'
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import RightSidebar from '../components/RightSideBar'
import LeftSideBar from '../components/LeftSideBar'
import FriendSidebar from '../components/FriendRequestModal'

const Home = () => {
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                // ...
                console.log(user.uid)

                const q = query(collection(db, "users"), where("userUid", "==", uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setImgUrl(doc.data().imgUrl)
                });
            } else {
                navigate('/login')
            }
        });
    }, [])

    return (
        <>
            <Navbar imgurl={imgUrl} />
            <div className="flex">
                {/* Left Sidebar - Fixed */}
                <div className="sticky top-0 h-screen w-[20%]">
                        <LeftSideBar />
                </div>

                {/* Main Content - Post Bar - Scrollable */}
                <div className="w-[40%]">
                        <PostBar imgurl={imgUrl} />
                </div>

                {/* Friend Sidebar - Fixed */}
                <div className="sticky top-0 h-screen w-[25%]">
                        <FriendSidebar />
                </div>

                {/* Right Sidebar - Fixed */}
                <div className="sticky top-0 h-screen w-[20%]">
                        <RightSidebar />
                </div>
            </div>
        </>
    )
}

export default Home;
