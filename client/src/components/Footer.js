import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-div">
          <div  className="footer-title">ABOUT THIS MAP APPLICATION</div>
          <div>This is a project for Catcalls of Amsterdam by Lisanne Kraal. Inspired by the young activists, she contacted the organization to help them mapping their enormous database in an interactive way. This is a first version of a project under construction. Any feedback or want to contribute? Contact us.</div>
        </div>
        <div className="footer-div">
          <div className="footer-title">CONTACT</div>
          <div>Catcalls of Amsterdam</div>

          <div>
            <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
              <i className="fab fa-instagram"></i> PM on Instagram
            </a>
          </div>

          <div>
            <a style={{ textDecoration: 'none', color: 'white' }} href="mailto:catcallsofams@gmail.com">
              <i className="far fa-envelope"></i> Send an email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;