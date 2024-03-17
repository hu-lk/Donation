import { useNavigate } from "react-router-dom";

import style from "./Navbar.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleRegister = () => {
    navigate("/auth/register");
  };
  const handleDashboard = () => {
    navigate("/user/dashboard");
  };

  return (
    <nav className={style.NavBar}>
      <div className={style.NavBarContainer}>
        <span
          className={style.NavBarTitle}
          //   onClick={() => handleNavigation("/")}
        >
          Charity Website
        </span>
        <div className={style.NavBarButtons}>
          <span className={style.NavBarButton} onClick={handleLogin}>
            Login
          </span>
          <span className={style.NavBarButton} onClick={handleRegister}>
            Register
          </span>
          <span className={style.NavBarButton} onClick={handleDashboard}>
            Dashboard
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
