import React from "react";
import styles from "@/components/SearchedUser/SearchedUser.module.css";
import { useRouter } from "next/navigation";

const SearchedUser = ({ user }) => {
  const router = useRouter();
  const handleUser = (user) => {
    router.push(`/profile/${user?.id}`);
  };
  return (
    <div className={styles.userCard} onClick={() => handleUser(user)}>
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
