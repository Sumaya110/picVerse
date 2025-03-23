"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./EditProfileModal.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { TbCameraPlus } from "react-icons/tb";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(
    user.profilePicture || "/default-profile.png"
  );
  const [selectedProPic, setSelectedProPic] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      const i = e.target.files[0];
      setProfilePic(i);
    }
    reader.onload = (readerEvent) => {
      setSelectedProPic(readerEvent.target.result);
    };
  };

  const handleSave = async () => {
    const formData = new FormData();

    if (profilePic) {
      formData.append("file", profilePic);
      console.log("Form data", formData, profilePic);
    }

    try {
      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData, 
      });

      const result = await response.json();
      if (response.ok) {
        onSave({
          name: username, 
          bio,
          profilePicture: result.filePath, 
        });
        onClose();
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose className={styles.closeIcon} onClick={onClose} />
        <h2>Edit Profile</h2>

        <div className={styles.imageUploadContainer}>
          <label htmlFor="profilePic" className={styles.imageUploadLabel}>
            <TbCameraPlus className={styles.uploadIcon} />
          </label>
          <input
            id="profilePic"
            type="file"
            hidden
            onChange={handleImageChange}
          />
          {selectedProPic ? (
            <div
              >
              {" "}
              <Image
                src={selectedProPic}
                alt="Profile"
                width={150}
                height={150}
                className={styles.profileImage}
              />{" "}
            </div>
          ) : (<Image
            src={profilePic}
            alt="Profile"
            width={150}
            height={150}
            className={styles.profileImage}
          />)}
        </div>

        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Bio</label>
          <textarea
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
