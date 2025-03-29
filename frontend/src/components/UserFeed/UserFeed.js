import React, { useEffect, useState } from "react";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";
import { fetchUserById, updateUser } from "@/services/auth";
import styles from "@/components/UserFeed/UserFeed.module.css";

const UserFeed = ({ profileId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileHolder, setProfileHolder] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("public");

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
      <div className={styles["profile"]}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className={styles["profile-pic-edit-wrapper"]}>
          <div className={styles["profile-pic-wrapper"]}>
            <img
              src={profileHolder?.profilePic || "/default-profile.png"}
              alt="Profile"
              className={styles["profile-picture"]}
            />
          </div>
          {profileId === userId ? (
            <button
              onClick={() => setIsEditing(true)}
              className={styles["edit-button"]}
            >
              Edit Profile
            </button>
          ) : null}
        </div>
        <p className={styles["user-name"]}>{profileHolder.username}</p>
        <p className={styles["email"]}>{profileHolder.email}</p>
        <p className={styles.profileText}>{profileHolder.bio}</p>

        {isEditing && (
          <EditProfileModal
            user={profileHolder}
            onClose={() => setIsEditing(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </div>
      <div className={styles["tab-buttons"]}>
        <button
          className={`${styles["tab-button"]} ${
            selectedTab === "public" ? styles["active-tab"] : ""
          }`}
          onClick={() => setSelectedTab("public")}
        >
          Public Images
        </button>
        <button
          className={`${styles["tab-button"]} ${
            selectedTab === "private" ? styles["active-tab"] : ""
          }`}
          onClick={() => setSelectedTab("private")}
        >
          Private Images
        </button>
      </div>
      <div className={styles["image-grid"]}>
        {(selectedTab === "public"
          ? profileHolder.publicImages
          : profileHolder.privateImages
        )?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={selectedTab}
            className={styles["image"]}
          />
        ))}
      </div>
    </div>
  );
};

export default UserFeed;
