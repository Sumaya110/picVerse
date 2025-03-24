"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import SidebarLink from "@/components/SidebarLink/SidebarLink"
import { BsBell, BsThreeDots } from "react-icons/bs";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { fetchUserById, logoutUser } from "@/services/auth";

const Sidebar = ({ option }) => {
  const [notificationCount, setNotificationCount] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser?.userId || !token) return;

        const userData = await fetchUserById(storedUser.userId, token);
        console.log(userData.data?.profilePic, userData.data);
        setUser(userData.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleNavigation = (path) => router.push(path);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <div className={styles["sidebar-wrapper"]}>
      <div className={styles.sidebar}>
        <SidebarLink
          text="Home"
          Icon={AiFillHome}
          onClick={() => handleNavigation("/home")}
        />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink
          text="Messages"
          Icon={AiOutlineInbox}
          notification={notificationCount}
          onClick={() => handleNavigation("/messages")}
        />
        <SidebarLink
          text="Profile"
          Icon={AiOutlineUser}
          onClick={() => handleNavigation(`/profileId/${user?.userId}`)}
        />
      </div>

      <button className={styles.tweetButton}>Upload image</button>

      <div className={styles.signOutDiv} onClick={handleLogout}>
        <img
          src={user?.profilePic || "/default-profile.png"}
          alt="Profile"
          className={styles.userImage}
          width={40}
          height={40}
        />
        <div className={styles.userDetails}>
          <h4>{user?.name}</h4>
          <p>@{user?.username}</p>
        </div>
        <BsThreeDots className={styles.dotsIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
