import Feed from "../../components/feed/Feed";
import Lsidebar from "../../components/left_sidebar/Lsidebar";
import Rsidebar from "../../components/right_sidebar/Rsidebar";
import TopBar from "../../components/topbar/TopBar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="homeContainer">
        <Lsidebar />
        <Feed />
        <Rsidebar />
      </div>
    </div>
  );
};

export default Home;
