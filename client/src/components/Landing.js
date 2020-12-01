import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css';

import Footer from './Footer';

import LogoRot from '../assets/catcallsofrot.png';
import LogoUtr from '../assets/catcallsofutr.png';
import LogoNyc from '../assets/catcallsofnyc.png';
import LogoGrunn from '../assets/catcallsofgrunn.png';

function Landing () {


  return (
    <div data-testid="landing" className="landing">
      <div className="landing-cover">

        <div className="header">
          <div className="header-title">Chalk back.</div>
          <div className="header-buttons">
            <Link to="/catcalls">
              <p>View Catcalls of Amsterdam</p>
            </Link>
            <Link to="/catcalls/new">
              <p>Report a new catcall</p>
            </Link>
          </div>
          <div className="header-disclaimer">
            Disclaimer: this application contains violent language and words of racism, sexual harassment and hate speach. Are you younger than 18 years old? Ask your guardian.
          </div>
        </div>

      </div>
      <div className="landing-cities">

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoRot} alt="logo-rot"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> ROTTERDAM</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoUtr} alt="logo-utr"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> UTRECHT</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoNyc} alt="logo-nyc"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> NEW YORK</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoNyc} alt="logo-ant"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> ANTWERP</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoNyc} alt="logo-ber"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> BERLIN</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

        <div className="city">
          <div>
            <div className="city-logo">
              <img src={LogoGrunn} alt="logo-grunn"></img>
            </div>
          </div>
          <div>
            <div className="city-name"><i className="fas fa-map-marker-alt"></i> GRONINGEN</div>
            <div className="city-description">coming soon</div>
          </div>
        </div>

      </div>

      <div className="landing-why" id="about">
        <div className="why-title">Why.</div>
        <div className="why-content">
          <p>A catcall is basically everything sexist, insulting, queerphobic, racist or else shouted after and at you in the streets. This also includes wolf whistling, being followed, not accepting a “no” and encompasses a host of other behaviours.  It is a form of gender-based violence.</p>
          <p>Worldwide, youth-led movements - like Catcalls of Amsterdam - are committed to ending gender-based street harassment with public chalk art, digital media and education. We write stories of harassment word-for-word in the spots where they happened alongside the hashtag #stopstreetharassment using sidewalk chalk and then post on social media to spur dialogue and story sharing</p>
          <p>Why do we do this? On the one hand, we want to claim back the space of the harassment for the victim and give them a voice. On the other hand we want to show those passing our chalk art that catcalling happens everywhere and engage them in a discussion about it. Catcalling is still too normal in our society and we want to change that, together with you. </p>
        </div>
      </div>

      <div className="landing-community">
        <div className="community-content">
          <div className="community-title">Get involved</div>
          <div className="community-text">See the social media channel for actions of Catcalls of Amsterdam: the stories of catcalls being reported to the organization and pictures of thse chalk back actions. Join the discussion and share the chalked catcalls so we can create awareness.</div>
          <a href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
            <button><p>Join the community on Instagram</p></button>
          </a>
        </div>
      </div>

      <div className="landing-about">

        <div className="about-content">
          <p>Catcalls of Amsterdam is founded in December 2017, after Ambrien found the account Catcalls of New York on Instagram. After talking with Sophie Sandberg, its founder, she decided to join the movement and start chalking in Amsterdam.</p>
          <p>In the meantime our team grew and is organised by four people: Ambrien, Margriet, Paula and Zessiah. Together with 150 other initiatives worldwide, we 'chalk back'. Our goal is to provide a place to share experiences on street harassment and use people's stories to create awereness around catcalling and denormalize it.</p>
          <p>With this application outside of Instagram, we show our catcalling database on the map and make it easier for any victim to report their experience. Check it out and contact us if you have any questions.</p>
        </div>
        <div className="about-title">About Catcalls of Amsterdam.</div>
      </div>

      <Footer />
      {/* <div className="footer">

      </div> */}
    </div>
  );
}


export default Landing;