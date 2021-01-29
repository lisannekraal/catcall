import React, { lazy, Suspense } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LandingFooter from './LandingFooter';
import LandingCarousel from "./LandingCarousel";
import Hidden from '@material-ui/core/Hidden';
const LandingInstagram = lazy(()=> import("./LandingInstagram"));

function Landing() {

  const { t } = useTranslation(['landing']);

  return (
    <div data-testid="landing" className="landing">
      <div className="landing-cover">

        <div className="header">
          <div className="header-title catcall-font">{t('title', 'default')}</div>
          <div className="header-buttons">
            <Link to={{
              pathname: '/catcalls',
              state: { dialog: t('disclaimer', 'default') }
            }}>
              <p>{t('button.view', 'default')}</p>
            </Link>
            <Link to="/catcalls/new">
              <p>{t('button.report', 'default')}</p>
            </Link>
          </div>
          <p className="header-disclaimer">
            {t('subtitle', 'default')} <a className="help-link" href="/help">{t('subtitle-cta', 'default')}</a>.
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
        <div className="why-title catcall-font">{t('why.title', 'default')}</div>
        <div className="why-content">
          <p>{t('why.p1', 'default')}</p>
          <p>{t('why.p2', 'default')}</p>
          <p>{t('why.p3', 'default')}</p>
        </div>
      </div>

      <div className="landing-community">
        <div className="community-content">
          <div className="community-title catcall-font">{t('social.title', 'default')}</div>
          <div className="landing-widget-container" style={{ margin: '30px auto' }}>
          <Suspense fallback={<div>Loading...</div>}>
            <LandingInstagram/>
          </Suspense>
          </div>
          <a href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
            <button className="normal-font"><p>{t('button.social', 'default')}</p></button>
          </a>
        </div>
      </div>

      <div className="landing-about">

        <div className="about-content">
          <p>{t('about.p1', 'default')}</p>
          <p>{t('about.p2', 'default')}</p>
          <p>{t('about.p3', 'default')}</p>
          <a href="/help" rel="noreferrer nofollow">
            <button className="normal-font"><p>{t('button.faq', 'default')}</p></button>
          </a>
        </div>
        <div className="about-title catcall-font">{t('about.title', 'default')}</div>
      </div>

      <LandingFooter />
    </div>
  );
}

export default Landing;