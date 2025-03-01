import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return (window.location.href = "/");
      try {
        const res = await fetch("http://localhost:3030/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) setUser(data.user);
        else setError("Unauthorized");
      } catch {
        setError("Server error");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return <h2 className="text-xl">Hello, {user?.name}!</h2>;
}

export default Profile;