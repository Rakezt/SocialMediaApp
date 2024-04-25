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
              : "https://r2.easyimg.io/pn1putmmp/avatar.png"
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
