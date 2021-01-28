// import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function LandingFooter() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-div">
          <div className="footer-title catcall-font">ABOUT THIS MAP APPLICATION</div>
          <p>
            This is a project for Catcalls of Amsterdam by Lisanne Kraal. Inspired by the young activists, she contacted the organization to help them mapping their enormous database in an interactive way. This is a first version of a project under construction. Any feedback or want to contribute? Contact us.
          </p>
        </div>
        <div className="footer-div">
          <div className="footer-title catcall-font">CONTACT</div>
          {/* <div>Catcalls of Amsterdam</div> */}
          <p>Catcalls of Amsterdam</p>

          <a style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }} href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
            <InstagramIcon fontSize='small' />
            <div>PM on Instagram</div>
          </a>

          <a style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }} href="mailto:catcallsofams@gmail.com">
            <MailOutlineIcon fontSize='small' />
            <div>Send us an email</div>
          </a>

        </div>
      </div>
    </div>
  )
}

export default LandingFooter;