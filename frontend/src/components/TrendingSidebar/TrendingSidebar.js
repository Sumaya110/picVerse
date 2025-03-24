import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "@/components/TrendingSidebar/TrendingSidebar.module.css";
import { searchUser } from "@/services/auth";
import TopUser from "@/components/TopUser/TopUser";

const TrendingSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

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
      const response = await searchUser(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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

      {searchQuery && searchResults?.length > 0 && (
        <div className={styles.resultsContainer}>
          {searchResults?.map((user) => (
            <TopUser key={user?.userId} user={user} />
          ))}
        </div>
      )}

      <div className={styles.topUsersContainer}>
        <h2> Top Users</h2>
        {topUsers.map((user, index) => (
          <TopUser key={user?.userId || index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
