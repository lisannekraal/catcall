import { useTranslation } from 'react-i18next';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function LandingFooter() {

  const { t } = useTranslation(['landing']);

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-div">
          <div className="footer-title catcall-font">{t('footer.title', 'default')}</div>
          <p>{t('footer.content', 'default')}</p>
        </div>
        <div className="footer-div">
          <div className="footer-title catcall-font">{t('footer.contact-title', 'default')}</div>
          <p>{t('footer.contact-name', 'default')}</p>

          <a style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }} href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow">
            <InstagramIcon fontSize='small' />
            <div>{t('footer.contact-insta', 'default')}</div>
          </a>

          <a style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }} href="mailto:catcallsofams@gmail.com">
            <MailOutlineIcon fontSize='small' />
            <div>{t('footer.contact-email', 'default')}</div>
          </a>

        </div>
      </div>
    </div>
  )
}

export default LandingFooter;