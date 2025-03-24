import React from "react";
import styles from "@/components/SearchedUser/SearchedUser.module.css";

const SearchedUser = ({ user }) => {
  return (
    <div className={styles.userCard}>
      <img
        src={user?.profilePic || "/default-profile.png"}
        alt={user?.username}
        className={styles.userImage}
      />
      <p className={styles.userName}>{user?.username}</p>
    </div>
  );
};

export default SearchedUser;
