import "./closeFriend.css";

const CloseFriend = ({ user }) => {
  return (
    <li className="leftsidebarFriend">
      <img
        className="leftsidebarFriendImg"
        src={user.profilePicture}
        alt="friend"
      />
      <span className="leftsidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriend;
