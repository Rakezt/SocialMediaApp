import Posts from "../posts/Posts";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = username
          ? await axios.get(
              `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/posts/profile/` +
                username
            )
          : await axios.get(
              `http://socialmediaapi.ap-south-1.elasticbeanstalk.com/api/posts/timeline/` +
                user._id
            );
        setPost(
          data.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetch();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {post.map((post) => (
          <Posts key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
