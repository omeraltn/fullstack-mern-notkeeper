import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { kullanici } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to={"/"}>
          <h1>📓 Udemig Not Defteri</h1>
        </Link>
        <nav>
          {kullanici && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span>👤 {kullanici.email}</span>
              <button onClick={handleClick}>Çıkış</button>
            </div>
          )}
          {!kullanici && (
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to={"/login"}>Giriş Yap</Link>
              <Link to={"/signup"}>Üye Ol</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
