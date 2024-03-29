import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import "./NavBar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  return (
    <nav className="navbar" id="custom-navbar">
      <Link to="/" id="home-link">
        <img className="logo-link" src="/img/logo.png" alt="Logo" style={{ width: "90%", height: "auto" }} />
      </Link>



      <div className="nav-links">
        <Link to="/" className="nav-link">
          <button>Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to={`/user/${user._id}`} className="nav-link">
              <button>Profile</button>
            </Link>        
            <button onClick={logOutUser} className="nav-link">Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup" className="nav-link">
              <button>SignUp</button>
            </Link>
            <Link to="/login" className="nav-link">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
      <hr className="navbar-divider" />
    </nav>

    
  );
}

export default Navbar;
