"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetchUserById, updateUser } from "@/services/auth";
import styles from "./Profile.module.css";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";
import Sidebar from "../Sidebar/Sidebar";
import TrendingSidebar from "../TrendingSidebar/TrendingSidebar";

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
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = await updateUser(storedUser?.userId, updatedData);
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className={styles["profile-sidebar-wrapper"]}>
      <Sidebar />
      <div className={styles["profile-wrapper"]}>
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className={styles.profileHeader}>
            <div className={styles["profile-pic-wrapper"]}>
              <img
                src={user?.profilePic || "/default-profile.png"}
                alt="Profile"
                className={styles["profile-picture"]}
              />
            </div>
          </div>
          <p className={styles.profileText}>
            <strong>Username:</strong> {user.username}
          </p>
          <p className={styles.profileText}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles.profileText}>
            <strong>Bio:</strong> {user.bio}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            Edit Profile
          </button>
          {isEditing && (
            <EditProfileModal
              user={user}
              onClose={() => setIsEditing(false)}
              onSave={handleProfileUpdate}
            />
          )}
        </div>
      </div>
      <TrendingSidebar />
    </div>
  );
};

export default Profile;
