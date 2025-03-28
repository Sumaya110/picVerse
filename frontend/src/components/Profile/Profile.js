"use client";
import styles from "./Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import TrendingSidebar from "../TrendingSidebar/TrendingSidebar";
import UserFeed from "../UserFeed/UserFeed";

const Profile = ({ profileId }) => {
  return (
    <div className={styles["profile-sidebar-wrapper"]}>
      <Sidebar />
      <UserFeed profileId={profileId} />
      <TrendingSidebar />
    </div>
  );
};

export default Profile;
