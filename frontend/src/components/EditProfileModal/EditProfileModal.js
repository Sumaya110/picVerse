"use client";
import React, { useState } from "react";
import styles from "./EditProfileModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { TbCameraPlus } from "react-icons/tb";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [profilePic, setProfilePic] = useState(
    user.profilePic || "/default-profile.png"
  );
  const [selectedProPic, setSelectedProPic] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (readerEvent) => {
      setSelectedProPic(readerEvent.target.result);
      setProfilePic(file);
    };
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (selectedProPic) {
      formData.append("file", profilePic);
    }
    let updatedProfilePic = user.profilePic;

    try {
      if (selectedProPic) {
        const response = await fetch("http://localhost:4000/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (!response.ok) {
          console.error(result.error);
          return;
        }
        updatedProfilePic = result?.filePath;
      }
      onSave({
        username,
        bio,
        profilePic: updatedProfilePic,
      });
      onClose();
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose className={styles["close-icon"]} onClick={onClose} />
        <h2>Edit Profile</h2>

        <div className={styles["image-upload-container"]}>
          <label htmlFor="profilePic" className={styles["image-upload-label"]}>
            <TbCameraPlus className={styles["upload-icon"]} />
          </label>
          <input
            id="profilePic"
            type="file"
            hidden
            onChange={handleImageChange}
          />
          <img
            src={selectedProPic || user.profilePic}
            alt="Profile"
            className={styles["profile-picture"]}
          />
        </div>

        <div className={styles["input-group"]}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles["input-group"]}>
          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <button className={styles["save-button"]} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
