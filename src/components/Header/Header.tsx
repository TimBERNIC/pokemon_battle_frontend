import { Link } from "react-router-dom";
import "./Header.scss";
const Header = () => {
  return (
    <header className="header-global-box">
      <div className="header-title-box">
        <h1 className="header-title">POKEMON BATTLE APP</h1>
      </div>
      <div className="header-button-box">
        <Link to="/Battle" className="header-button">
          BATTLE
        </Link>
        <Link to="/Library" className="header-button">
          LIBRARY
        </Link>
      </div>
    </header>
  );
};

export default Header;
