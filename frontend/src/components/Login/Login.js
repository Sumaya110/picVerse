"use client";

import React, { useState, useContext } from "react";
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
     const response= await login(formData.email, formData.password);
     console.log("response ",response);
     localStorage.setItem("user", response.user);

      router.push("/profile");
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred, please try again.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };

  //   console.log(formData);

  //   try {
  //     const response = await fetch("http://localhost:4000/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     console.log("response  : ", response);

  //     if (response.ok) {
  //       localStorage.setItem("token", data.token);
  //       router.push("/profile");
  //       setError(null);
  //     } else {
  //       setError(data.message || "An error occurred, please try again.");
  //     }
  //   } catch (error) {
  //     setError("Something went wrong. Please try again.");
  //   }
  // };

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
