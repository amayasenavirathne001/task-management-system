import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#2563eb",
        color: "#fff",
        padding: "15px 30px",
      }}
    >
      <h2>Task Management System</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span>Welcome, {user?.name}</span>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;