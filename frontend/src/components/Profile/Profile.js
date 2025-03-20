"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { fetchProfile } from "@/services/auth";

const Profile = () => {
  const {logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please log in.");
  
        const data = await fetchProfile(token);
        console.log("Fetched user data:", data);
  
        localStorage.setItem("user", JSON.stringify(data)); // Store user profile
        setUser(data); // Update state
      } catch (error) {
        setError(error.message);
        logout(); // Log out if the token is invalid
      } finally {
        setLoading(false);
      }
    };
  
    if (!user) {
      console.log("No user found, fetching profile...");
      getProfile();
    }
  }, []); // Only run once on mount
  
  

  if (!user) return <p>Please log in to view your profile.</p>;
  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <img src={profile.profilePic} alt="Profile" width="100" />
        </div>
      ) : (
        <p>Could not load profile information.</p>
      )}
    </div>
  );
};

export default Profile;
