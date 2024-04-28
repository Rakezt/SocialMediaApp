import "./rsidebar.css";
import { Users } from "../../dummy";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Edit, Remove } from "@mui/icons-material";

const Rsidebar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users/friends/${user._id}`
        );
        setFriends(friendList.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        try {
          await axios.put(
            `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users/${user._id}/unfollow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } catch (error) {
          console.log(error, "Unfollow");
        }
      } else {
        try {
          await axios.put(
            `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users/${user._id}/follow`,
            {
              userId: currentUser._id,
            }
          );
          dispatch({ type: "FOLLOW", payload: user._id });
        } catch (error) {
          console.log(error, "follow");
        }
      }
      setFollowed(!followed);
    } catch (err) {
      console.error(err, "Axios Error:");
    }
  };

  const HomeRsidebar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src="https://imgtr.ee/images/2024/04/27/49bc1176fe858054971f9e1254e58a33.png"
            alt="birthday"
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Bendalin Smith </b> and <b>3 more friends</b> have birthday today
          </span>
        </div>
        <img
          className="rightsidebarAds"
          src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/17f4b51c-8024-4830-b855-063822d0fd05.__CR0,0,970,600_PT0_SX970_V1___.png"
          alt="ads"
        />
        <h4 className="rightsidebarTitle">Online Friends</h4>
        <div className="rightsidebarFriends">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </div>
      </>
    );
  };
  const ProfileRsidebar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="RsidebarFollowButton" onClick={handleClick}>
            {followed ? "Remove Friend" : "Add Friend"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="RsidebarTitle">
          User Information <Edit className="RsidebarTitleEdit" />
        </h4>
        <div className="RsidebarInfo">
          <div className="RsidebarInfoItem">
            <span className="RsidebarInfoKey">City:</span>
            <span className="RsidebarInfoValue">
              {user.city ? user.city : "need to update"}
            </span>
          </div>
          <div className="RsidebarInfoItem">
            <span className="RsidebarInfoKey">From:</span>
            <span className="RsidebarInfoValue">
              {user.from ? user.from : "need to update"}
            </span>
          </div>
          <div className="RsidebarInfoItem">
            <span className="RsidebarInfoKey">Relationship:</span>
            <span className="RsidebarInfoValue">
              {user.relationship
                ? user.relationship === 1
                  ? "Single"
                  : "Married"
                : "need to update"}
            </span>
          </div>
        </div>
        <h4 className="RsidebarTitle">User Friends ({friends.length})</h4>
        <div className="RsidebarFollowings">
          {friends.map((friend, index) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={index}
            >
              <div className="RsidebarFollowing">
                <img
                  className="RsidebarFollowingImg"
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "https://imgtr.ee/images/2024/04/27/1fe72092a6cc90a87aa84f71f5767de0.png"
                  }
                  alt="following"
                />
                <span className="RsidebarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightsidebar">
      <div className="rightsidebarWrapper">
        {user ? <ProfileRsidebar /> : <HomeRsidebar />}
      </div>
    </div>
  );
};

export default Rsidebar;
