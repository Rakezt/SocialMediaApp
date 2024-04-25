import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  Chat,
  Logout,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import "./topbar.css";
import { Link } from "react-router-dom";

const TopBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    setConfirmLogout(true);
  };
  const confirmedLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    setConfirmLogout(false);
  };
  const cancelLogout = () => {
    setConfirmLogout(false);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="topbarLeftlogo">
          <span className="logo">Kammanahalli POST</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="topbarLink">
            {" "}
            Home
          </Link>

          <Link to={`/profile/${user.username}`} className="topbarLink">
            Profile
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger">
              <Chat style={{ color: "white" }} />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ||
              "https://r2.easyimg.io/pn1putmmp/avatar.png"
            }
            alt="person"
            className="topbarImage"
          />
        </Link>
        <Logout className="topbarlogout" onClick={handleLogout} />
      </div>
      {confirmLogout && (
        <div className="confirmationOverlay">
          <div className="confirmationBox">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to Logout</p>
            <div className="confirmationButton">
              <button onClick={confirmedLogout}>Yes</button>
              <button onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
