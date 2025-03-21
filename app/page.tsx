"use client";
import moment from "moment";
import "./styles/homePage.css";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function Home() {
  return (
    <div className="home-main">
      <div className="home-container">
        <div className="header">
          <div className="header-text-wrap">
            <p className="head">Daily Prayer Times</p>
            <p className="">
              {" "}
              <LocationOnIcon fontSize="small" /> Seoul, South Korea
            </p>
            <p>
              <TodayIcon />
              {moment().format("MMMM DD, YYYY")}
            </p>
          </div>
          <div className="menu-cover">
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <div className="list"></div>
      </div>
    </div>
  );
}
