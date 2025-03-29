"use client";
import styles from "./Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import TrendingSidebar from "../TrendingSidebar/TrendingSidebar";
import UserFeed from "../UserFeed/UserFeed";

const Profile = ({ profileId }) => {
  return (
    <div className={styles["profile-sidebar-wrapper"]}>
      <div className={styles["fixed"]}>
        <Sidebar />
      </div>

      <div className={styles["user-feed"]}>
        <UserFeed profileId={profileId} />
      </div>

      <div className={styles["trending-sidebar"]}>
        <TrendingSidebar />
      </div>
    </div>
  );
};

export default Profile;
