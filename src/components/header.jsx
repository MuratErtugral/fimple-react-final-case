import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/components/header.module.css";
import { AiFillHome } from "react-icons/ai";
import withTheme from "../hoc/withTheme";
import { useAuth } from "../context/UserContext";

const Header = ({ theme, toggleTheme }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const Navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userAccessToken");
    setIsAuthenticated(false);
    Navigate("/");
  };

  return (
    <header
      className={`${styles.header} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.left}>
        <Link to="/">
          <AiFillHome size={25} color="#fff" />
        </Link>
        <button
          onClick={toggleTheme}
          className={`${styles.switchButton} ${
            theme === "dark" && styles.dark
          }`}
        >
          {theme === "dark" ? <span>🌞</span> : <span>🌙</span>}
        </button>
      </div>
      {/* <div className={styles.center}>
        <h1>{isAuthenticated ? "Yönetici Paneli" : "Hızlı Başvuru Takip"}</h1>
      </div> */}
      <div className={styles.right}>

       {isAuthenticated ? <Link to="/admin/basvuru-listesi">Başvuru Listesi </Link> : <Link to="/basvuru-sorgula">Başvuru Sorgula</Link>}
        {isAuthenticated ? (
          <button onClick={() => handleLogOut()}> Çıkış </button>
        ) : (
          <Link to="/admin">Admin</Link>
        )}
      </div>
    </header>
  );
};

export default withTheme(Header);
