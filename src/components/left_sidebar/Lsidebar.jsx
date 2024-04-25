import {
  Bookmark,
  Chat,
  LiveHelp,
  People,
  PlayCircle,
  RssFeed,
  School,
  Today,
  Work,
} from "@mui/icons-material";

import "./lsidebar.css";
import { Users } from "../../dummy";
import CloseFriend from "../closeFriend/CloseFriend";

const Lsidebar = () => {
  return (
    <div className="leftsidebar">
      <div className="leftsidebarWrapper">
        <ul className="leftsidebarList">
          <li className="leftsidebarListItem">
            <RssFeed className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Feed</span>
          </li>
          <li className="leftsidebarListItem">
            <Chat className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Chats</span>
          </li>
          <li className="leftsidebarListItem">
            <PlayCircle className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Video</span>
          </li>
          <li className="leftsidebarListItem">
            <People className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Groups</span>
          </li>
          <li className="leftsidebarListItem">
            <Bookmark className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Bookmarks</span>
          </li>
          <li className="leftsidebarListItem">
            <LiveHelp className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Questions</span>
          </li>
          <li className="leftsidebarListItem">
            <Work className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Jobs</span>
          </li>
          <li className="leftsidebarListItem">
            <Today className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Events</span>
          </li>
          <li className="leftsidebarListItem">
            <School className="leftsidebarIcon" />
            <span className="leftsidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="leftsidebarButton">Show More</button>
        <hr className="leftsidebarHr" />
        <ul className="leftsidebarFriendList">
          {Users.map((user) => (
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lsidebar;
