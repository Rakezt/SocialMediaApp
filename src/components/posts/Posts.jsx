import { MoreVert, ThumbUp } from "@mui/icons-material";
import "./posts.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Posts = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [showDropdown, setShowDropDown] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(
        `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/users?userId=${post.userId}`
      );
      setUser(data.data);
    };
    fetch();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(
        `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/posts/${post._id}/like`,
        {
          userId: currentUser._id,
        }
      );
    } catch (error) {
      console.error(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const toggleDropdown = () => {
    setShowDropDown(!showDropdown);
  };
  const handleRemovePost = async () => {
    try {
      if (post.userId === currentUser._id) {
        await axios.delete(
          `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/posts/${post._id}`,
          {
            data: { userId: currentUser._id },
          }
        );
      }
    } catch (error) {
      console.error("Error handling post:", error);
    }
    window.location.reload();
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={`http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/profile/${user.username}`}
            >
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://imgtr.ee/images/2024/04/27/1fe72092a6cc90a87aa84f71f5767de0.png"
                }
                alt="profile"
              />
            </Link>
            <span className="postUsername">
              {user ? user.username : "Yahoo"}{" "}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <div className="dropdown">
              <MoreVert
                className="postTopRightOptions"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="dropdownContent" style={{ display: "block" }}>
                  {post.userId === currentUser._id ? (
                    <span onClick={handleRemovePost}>Delete post</span>
                  ) : (
                    <span
                      onClick={handleRemovePost}
                      style={{ display: "none" }}
                    >
                      Hide post
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {post.img ? (
            <img
              className="postImg"
              src={post.img}
              alt="sorry, unable to load images"
            />
          ) : null}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUp className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
