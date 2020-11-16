import React, { useState, useEffect } from "react";
import Logo from '../assets/logowhite.png';
import './Navbar.css';

function Navbar () {
  const [ foldinMenu, setFoldinMenu ] = useState(false);

  return (
    <div className="navbar">
      <div style={ foldinMenu ? navbarMobile : navbarDesktop } className="navbar-content">
        <div className="navbar-brand">
          <div className="navbar-logo"><img src={Logo} alt="logo"></img></div>
          <div> Catcalls of Amsterdam</div>
          
        </div>

        <div className="navbar-content-right">
          <div classname="navbar-about">
            <i class="fas fa-info-circle"></i> ABOUT
          </div>
          <div classname="navbar-map">
            <i class="fas fa-map-marked-alt"></i> MAP
          </div>
          <div classname="navbar-community">
            <i class="fab fa-instagram"></i> COMMUNITY
          </div>
          <div className="navbar-login">
            <i class="fas fa-user-cog"></i> MODERATORS
          </div>
          <div className="navbar-report">
            <button><p>Report a new datcall</p></button>
          </div>

        </div>
      </div>
    </div>
  );
}

const navbarDesktop = {
  display: "flex",
  margin: "0 200px",
  justifyContent: "space-between",
  alignItems: "center",
  color: "white",
  paddingTop: "20px"
}

const navbarMobile = {

}

export default Navbar;