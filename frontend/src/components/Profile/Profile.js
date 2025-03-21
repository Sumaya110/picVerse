"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetchUserById } from "@/services/auth";
import Image from "next/image";
import styles from "./Profile.module.css"; // ✅ Fixed import

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null); // ✅ Changed initial state to null
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

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

  if (!user) return <p>Loading profile...</p>; // ✅ Improved condition

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles["cover-picture-container"]}>
        <Image
          src="http://localhost:4000/uploads/images/default-profile.png"
          alt="Profile"
          width={150}
          height={150}
          unoptimized={true}
        />

        <div>
          <Image
            src="http://localhost:4000/uploads/images/default-profile.png"
            alt="Profile"
            width={150}
            height={150}
            unoptimized={true}
          />
        </div>
      </div>

      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default Profile;
