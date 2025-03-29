"use client";
import React, { useEffect, useState } from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import SidebarLink from "@/components/SidebarLink/SidebarLink";
import { BsBell, BsThreeDots } from "react-icons/bs";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { fetchUserById, logoutUser } from "@/services/auth";

const Sidebar = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!storedUser?.userId || !token) return;

        const userData = await fetchUserById(storedUser.userId, token);
        setUser(userData.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleEditProfile = async () => {
    router.push(`/profile/${user?.id}`);
  };

  const handleHome = async () => {
    router.push("/home");
  };

  const handleMessage = async () => {
    router.push("/messages");
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <div className={styles["sidebar-wrapper"]}>
      <div className={styles["sidebar"]}>
        <button
          className={styles["profile-button"]}
          onClick={() => handleHome()}
        >
          <SidebarLink text="Home" Icon={AiFillHome} notification={null} />
        </button>

        <button className={styles["profile-button"]}>
          <SidebarLink text="Notifications" Icon={BsBell} notification={null} />
        </button>

        <button
          className={styles["profile-button"]}
          onClick={() => handleMessage()}
        >
          <SidebarLink
            text="Messages"
            Icon={AiOutlineInbox}
            notification={notification}
          />
        </button>

        <button
          className={styles["profile-button"]}
          onClick={() => handleEditProfile()}
        >
          <SidebarLink
            text="Profile"
            Icon={AiOutlineUser}
            notification={null}
          />
        </button>
      </div>

      <button className={styles["upload-image"]}>Upload image</button>

      <div className={styles["sign-out-div"]} onClick={handleLogout}>
        <img
          src={user?.profilePic || "/default-profile.png"}
          alt="Profile"
          className={styles["user-image"]}
          width={40}
          height={40}
        />
        <div className={styles["user-details"]}>
          <h4>{user?.name}</h4>
          <p>@{user?.username}</p>
        </div>
        <BsThreeDots className={styles["dots-icon"]} />
      </div>
    </div>
  );
};

export default Sidebar;
