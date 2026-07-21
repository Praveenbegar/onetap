import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          <img src={logo} alt="OneTap" />
        </Link>

        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/latest"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Latest
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "active-link" : ""
            }
          >
            Contact
          </NavLink>

        </nav>

      </div>
    </header>
  );
}

export default Navbar;