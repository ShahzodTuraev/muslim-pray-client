"use client";
import moment from "moment";
import "./styles/homePage.css";
import MenuIcon from "@mui/icons-material/Menu";
import TodayIcon from "@mui/icons-material/Today";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MainDrawer from "./components/MainDrawer";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
          <div onClick={() => setDrawerOpen(true)} className="menu-cover">
            <MenuIcon fontSize="large" />
          </div>
        </div>
        <div className="list">
          <div className="item">
            <div className="left-box">
              <LightModeIcon sx={{ color: "green" }} />
              <p className="title">Fajr</p>
              <p className="remain-time">Fajr</p>
            </div>
          </div>
        </div>
      </div>
      <MainDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
}
