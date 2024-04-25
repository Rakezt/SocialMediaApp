import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users/friends/" ${currentId}`
        );
        setFriends(res.data);
      } catch (error) {
        console.error(error, "API issue");
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.includes(f._id) && f._id !== currentId)
    );
  }, [friends, onlineUsers, currentId]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(friend)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                friend?.profilePicture
                  ? friend.profilePicture
                  : "https://r2.easyimg.io/pn1putmmp/"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{friend?.username}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
