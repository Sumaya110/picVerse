"use client";

import React, { useState, useContext, useEffect } from "react";
import styles from "@/components/Login/Login.module.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await login(formData.email, formData.password);

      router.push("/profile");
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred, please try again.");
    }
  };

  return (
    <div className={styles["login-form-wrapper"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles["input-field"]}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles["input-field"]}
          />
        </div>
        <div>
          <button type="submit" className={styles["login-button"]}>
            Login
          </button>
        </div>
        {error && <p className={styles["error"]}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
