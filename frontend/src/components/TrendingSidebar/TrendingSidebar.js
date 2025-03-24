import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "@/components/TrendingSidebar/TrendingSidebar.module.css";
import FollowUser from "@/components/TopUser/TopUser";
import { searchUser } from "@/services/auth";

const TrendingSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [topUsers, setTopUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/top");
        const data = await res.json();
        if (res.ok) setTopUsers(data.users);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const res = await searchUser(searchQuery);
      setSearchResult(res);
      setShowModal(true);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.trendingSidebar}>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} onClick={handleSearch} />
        <input
          type="text"
          placeholder="Search users..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showModal && searchResult && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Search Results</h3>
              <button className={styles.closeButton} onClick={closeModal}>
                X
              </button>
            </div>
            <div className={styles.resultsContainer}>
              <FollowUser key={searchResult?.userId} user={searchResult} />
            </div>
          </div>
        </div>
      )}

      <div className={styles.topUsersContainer}>
        <h2>Top Users</h2>
        {topUsers.map((user, index) => (
          <FollowUser key={user?.userId || index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
