import "./online.css";

const Online = ({ user }) => {
  return (
    <li className="rightsidebarFriend">
      <div className="rightsidebarProfileImgContainer">
        <img
          className="rightsidebarProfileImg"
          src={user?.profilePicture}
          alt="friend"
        />
        <span className="rightsidebarOnline"></span>
      </div>
      <span className="rightsidebarUsername">{user?.username}</span>
    </li>
  );
};

export default Online;
