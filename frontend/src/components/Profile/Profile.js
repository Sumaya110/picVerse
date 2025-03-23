"use client"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetchUserById, updateUser } from "@/services/auth";
import Image from "next/image";
import styles from "./Profile.module.css";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser?.userId || !token) return;

        const userData = await fetchUserById(storedUser.userId, token);
        setUser(userData.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const updatedUser = await updateUser(storedUser?.userId, updatedData);
      setUser(updatedUser.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.profileHeader}>
        <Image
          src={user.profilePicture || "/default-profile.png"}
          alt="Profile"
          width={150}
          height={150}
          className={styles.profileImage}
          priority
        />
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          Edit Profile
        </button>
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
      {isEditing && (
        <EditProfileModal user={user} onClose={() => setIsEditing(false)} onSave={handleProfileUpdate} />
      )}
    </div>
  );
};

export default Profile;
