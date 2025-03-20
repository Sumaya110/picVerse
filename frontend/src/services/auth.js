export const registerUser = async (username, email, password) => {
    const res = await fetch("http://localhost:4000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    }
  
    return res.json();
  };
  
  export const loginUser = async (email, password) => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }
  
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    return data;
  };
  
  export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  
  export const fetchProfile = async (token) => {
    const res = await fetch("http://localhost:4000/api/users/profile", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });
  
    if (!res.ok) {
      throw new Error("Unauthorized access, please log in again.");
    }
  
    return res.json();
  };
  