import React, { useEffect, useState } from "react";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";
import { fetchUserById, updateUser } from "@/services/auth";
import styles from "@/components/UserFeed/UserFeed.module.css";

const UserFeed = ({ profileId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileHolder, setProfileHolder] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser?.userId || !token) return;

        setUserId(storedUser?.userId);

        const userData = await fetchUserById(profileId);
        setProfileHolder(userData.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const updatedUser = await updateUser(userId, updatedData);
      setProfileHolder(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profileHolder) return <p>Loading profile...</p>;

  return (
    <div className={styles["profile-wrapper"]}>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles.profileHeader}>
          <div className={styles["profile-pic-wrapper"]}>
            <img
              src={profileHolder?.profilePic || "/default-profile.png"}
              alt="Profile"
              className={styles["profile-picture"]}
            />
          </div>
        </div>
        <p className={styles.profileText}>
          <strong>Username:</strong> {profileHolder.username}
        </p>
        <p className={styles.profileText}>
          <strong>Email:</strong> {profileHolder.email}
        </p>
        <p className={styles.profileText}>
          <strong>Bio:</strong> {profileHolder.bio}
        </p>

        {profileId === userId ? (
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            Edit Profile
          </button>
        ) : null}

        {isEditing && (
          <EditProfileModal
            user={profileHolder}
            onClose={() => setIsEditing(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default UserFeed;
