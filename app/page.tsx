"use client";
import moment from "moment";
import "./styles/homePage.css";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainDrawer from "./components/MainDrawer";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WeekStat from "./components/weekStat";
// import useIpLocation from "./hooks/useIpLocation";
// import UseLocation from "./hooks/useLocation";
// import usePrayerTime from "./hooks/usePrayerTime";
export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const timeList = [
    { id: 1, title: "Fajr", time: "05:20", checked: true },
    { id: 2, title: "Dhuhr", time: "05:20", checked: true },
    { id: 3, title: "Asr", time: "05:20", checked: true },
    { id: 4, title: "Maghrib", time: "05:20", checked: true },
    { id: 5, title: "Isha'a", time: "05:20", checked: true },
  ];

  // const location = UseLocation();
  // console.log(location);
  return (
    <div className="home-main">
      <div className="home-container">
        <div className="header">
          <div className="header-text-wrap">
            <p className="head"> Daily Prayer Times</p>
            <p className="head-location">
              {" "}
              <LocationOnIcon fontSize="small" /> Seoul, South Korea
            </p>
            <p>
              <TodayIcon className="mr-1" />
              {moment().format("MMMM DD, YYYY")}
            </p>
          </div>
          <div onClick={() => setDrawerOpen(true)} className="menu-cover">
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <div className="list">
          {timeList.map((ele) => {
            return (
              <div key={ele.id} className="item">
                <div className="left-box">
                  <LightModeIcon />
                  <p className="title">{ele.title}</p>
                  <p className="remain-time">
                    {ele.id == 1
                      ? "(Sunrise: 06:30)"
                      : ele.id == 2
                      ? "-01:22:19"
                      : ""}
                  </p>
                </div>
                <div className="right-box">
                  <p>05:20</p>
                  {true ? (
                    <CheckCircleIcon className="active" />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <WeekStat />
      </div>
      <MainDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}
