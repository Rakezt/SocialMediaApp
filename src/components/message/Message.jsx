import "./message.css";
import { format } from "timeago.js";

const Message = ({ messages, own, currentUser }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? currentUser.profilePicture
              : "https://imgtr.ee/images/2024/04/27/1fe72092a6cc90a87aa84f71f5767de0.png"
          }
          alt=""
        />
        <p className="messageText">{messages.text}</p>
      </div>
      <div className="messageBottom">{format(messages.createdAt)}</div>
    </div>
  );
};

export default Message;
