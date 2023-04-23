import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ isLoggedIn, onLoginStatusChange }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Get token and id from local storage
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    // Clear fields from local storage
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    onLoginStatusChange(false);

    // Send logout request to server with token and id in request header
    try {
      await fetch("http://localhost:5001/api/clients/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Id": id, // Include the id in the request header
        },
      });
      console.log("Logged out successfully!");
      // You can also update state or perform other necessary actions here
    } catch (error) {
      console.error("Failed to logout:", error);
      // Handle error appropriately
    }

    // Redirect to homepage
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Spartan Bank
      </Link>
      <ul>
        {/* <CustomLink to="/">Home</CustomLink> */}
        {isLoggedIn ? (
          <>
            <CustomLink to="/findatm">Find ATM</CustomLink>
            <CustomLink to="/automate">Automate Payments</CustomLink>
            <li>
              <button onClick={handleLogout} className="custom-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/findatm">Find ATM</CustomLink>
          </>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
