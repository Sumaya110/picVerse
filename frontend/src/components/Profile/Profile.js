"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetchUserById } from "@/services/auth";
import Image from "next/image";
import styles from "./Profile.module.css"; 

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("user  ")
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        console.log("stored user  & token  :: ", storedUser, "  ", token );

        if (!storedUser?.userId || !token) return;

        const userData = await fetchUserById(storedUser.userId, token);
        setUser(userData.data);
        console.log("User data:", userData.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}


        <div >
          <Image
            src="/default-profile.png"
            alt="Profile"
            width={150}
            height={150}
            unoptimized={true}
            priority={true}
          />
        </div>


      <p>
        <strong>Username:</strong> {user.username}
      </p>
      
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Bio:</strong> {user.bio}
      </p>
    </div>
  );
};

export default Profile;
