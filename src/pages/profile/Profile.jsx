import Feed from "../../components/feed/Feed";
import Lsidebar from "../../components/left_sidebar/Lsidebar";
import TopBar from "../../components/topbar/TopBar";
import "./profile.css";
import Rsidebar from "../../components/right_sidebar/Rsidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users?username=${username}`
      );
      setUser(data.data);
    };
    fetch();
  }, [username]);

  return (
    <div>
      <TopBar />
      <div className="profile">
        <Lsidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture ||
                  "https://r2.easyimg.io/39pyvewdo/cover.jpg"
                }
                alt="cover"
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture ||
                  "https://r2.easyimg.io/pn1putmmp/avatar.png"
                }
                alt="ProfilePicture"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName"> {user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rsidebar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
