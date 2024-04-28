import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material";
import "./share.css";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      await axios.post(
        "http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/posts",
        newPost
      );
    } catch (error) {
      console.error(error, "this is my POST FROM REACT");
    }
    window.location.reload();
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://imgtr.ee/images/2024/04/27/1fe72092a6cc90a87aa84f71f5767de0.png"
            }
            alt="shareProfile"
            className="shareProfileImg"
          />
          <input
            className="shareInput"
            placeholder={"What's in your mind " + user.username + "?"}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText"> Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText"> Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText"> Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText"> Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
