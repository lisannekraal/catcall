import React from "react";
import { Link } from 'react-router-dom';
import './Landing.css';
import Footer from './Footer';
import LandingCarousel from "./LandingCarousel";
import Hidden from '@material-ui/core/Hidden';

function Landing() {

  return (
    <div data-testid="landing" className="landing">
      <div className="landing-cover">

        <div className="header">
          <div className="header-title catcall-font">Chalk back</div>
          <div className="header-buttons">
            <Link to={{
              pathname: '/catcalls',
              state: { dialog: 'This is an overview of all catcalls reported. Disclaimer: this application contains violent language and words of racism, sexual harassment and hate speach. Are you younger than 18 years old? Ask your guardian.' }
            }}>
              <p>View catcalls on map</p>
            </Link>
            <Link to="/catcalls/new">
              <p>Report a new catcall</p>
            </Link>
          </div>
          <p className="header-disclaimer">
            This initiative is standing up against street harassment and does not replace reporting your issue to the police. Are you currently in danger or need help right away? <a className="help-link" href="/help">Click here</a>.
          </p>
        </div>

      </div>
      <Hidden smUp>
        <LandingCarousel citiesDisplayed={2} />
      </Hidden>
      <Hidden xsDown lgUp>
        <LandingCarousel citiesDisplayed={3} />
      </Hidden>
      <Hidden mdDown>
        <LandingCarousel citiesDisplayed={6} />
      </Hidden>


      <div className="landing-why" id="about">
        <div className="why-title catcall-font">Why</div>
        <div className="why-content">
          <p>A catcall is basically everything sexist, insulting, queerphobic, racist or else shouted after and at you in the streets. This also includes wolf whistling, being followed, not accepting a “no” and encompasses a host of other behaviours.  It is a form of gender-based violence.</p>
          <p>Worldwide, youth-led movements - like Catcalls of Amsterdam - are committed to ending gender-based street harassment with public chalk art, digital media and education. We write stories of harassment word-for-word in the spots where they happened alongside the hashtag #stopstreetharassment using sidewalk chalk and then post on social media to spur dialogue and story sharing</p>
          <p>Why do we do this? On the one hand, we want to claim back the space of the harassment for the victim and give them a voice. On the other hand we want to show those passing our chalk art that catcalling happens everywhere and engage them in a discussion about it. Catcalling is still too normal in our society and we want to change that, together with you. </p>
        </div>
      </div>

      <div className="landing-community">
        <div className="community-content">
          <div className="community-title catcall-font">Get involved</div>
          <div className="landing-widget-container" style={{ margin: '30px auto'}}>
            <iframe title="catcall photos" src="https://snapwidget.com/embed/900599" className="snapwidget-widget" allowtransparency="true" frameBorder="0" scrolling="no" style={{ border: 'none', overflow: 'scroll', height: '100%', width: '100%' }}></iframe>
          </div>
          <a href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
            <button className="normal-font"><p>Join the community on Instagram</p></button>
          </a>
        </div>
      </div>

      <div className="landing-about">

        <div className="about-content">
          <p>Catcalls of Amsterdam is founded in December 2017, after Ambrien found the account Catcalls of New York on Instagram. After talking with Sophie Sandberg, its founder, she decided to join the movement and start chalking in Amsterdam.</p>
          <p>In the meantime our team grew and is organised by four people: Ambrien, Margriet, Paula and Zessiah. Together with 150 other initiatives worldwide, we 'chalk back'. Our goal is to provide a place to share experiences on street harassment and use people's stories to create awereness around catcalling and denormalize it.</p>
          <p>With this application outside of Instagram, we show our catcalling database on the map and make it easier for any victim to report their experience. Check it out and contact us if you have any questions.</p>
          <a href="/help" rel="noreferrer nofollow">
            <button className="normal-font"><p>Go to help page and FAQ</p></button>
          </a>
        </div>
        <div className="about-title catcall-font">About Catcalls of Amsterdam</div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;