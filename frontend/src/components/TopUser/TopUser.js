import React from "react";
import styles from "@/components/TopUser/TopUser.module.css";

const TopUser = ({ user }) => {
  return (
    <div className={styles.topUserContainer}>
      <div className={styles.topUserDetails}>
        <div className={styles.topUserUsername}>{user?.username}</div>
        <div className={styles.topUserRating}>Rating: {user?.rating}</div>
      </div>
    </div>
  );
};

export default TopUser;
