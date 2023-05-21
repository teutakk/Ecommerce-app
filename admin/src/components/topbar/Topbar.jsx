import React from "react";
import {Link} from "react-router-dom"
import styled from "styled-components";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux"
import { logoutAdmin } from "../../redux/apiCalls";


// const MenuItem = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
// `;
export default function Topbar() {
  const logged = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Panel</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div>{!logged && <div ><Link to="/login">LOG IN</Link></div>}
           {logged && <div onClick={() => logoutAdmin(dispatch)}><Link style={{ textDecoration: "none", color:"#111", marginRight: "10px" }} to="/login">LOG OUT</Link></div>}</div>
          <Link to="/">
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </Link>
          
        </div>
      </div>
    </div>
  );
}
