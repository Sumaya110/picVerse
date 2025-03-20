"use client";

import { useState, useContext } from "react";
import styles from "@/components/SignUp/SignUp.module.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await register(formData.username, formData.email, formData.password);
      router.push("/login"); // Redirect to login after successful signup
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred, please try again.");
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     username: e.target.username.value,
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:4000/api/auth/signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       router.push("/login"); // Redirect to the login page after successful signup
  //       setError(null);
  //     } else {
  //       setError(data.message || "An error occurred, please try again.");
  //     }
  //   } catch (error) {
  //     setError("Something went wrong. Please try again.");
  //   }
  // };

  return (
    <div className={styles["signup-wrapper"]}>
      <form className={styles["form-wrapper"]} onSubmit={handleSubmit}>
        <div>
          <input
            type="username"
            name="username"
            placeholder="Username"
            className={styles["input-field"]}
          />
        </div>

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
          <button type="submit" className={styles["signup-button"]}>
            Sign Up
          </button>
        </div>

        {error && <p className={styles["error-message"]}>{error}</p>}

        <div className={styles["login-link"]}>
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className={styles["login-button"]}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
