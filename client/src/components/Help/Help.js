import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Help() {

  const { t } = useTranslation(['help']);

  return (
    <>
      <div className="header-footer"></div>
      <div className="help-container">

        <div>
          <h1>{t('help.title', 'default')}</h1>
          <p>{t('help.p', 'default')}</p>
          <ul>
            <li>{t('help.li-police', 'default')} <a href="tel:112">112</a></li>
            <li>{t('help.li-police2', 'default')} <a href="tel:0900-8844">0900-8844</a></li>
            <li>{t('help.li-lhbti', 'default')} <a href="tel:088-1691234">088-1691234</a> {t('help.li-lhbti2', 'default')} <a href="https://www.politie.nl/themas/roze-in-blauw.html#:~:text=Elke%20politieman%20of%20vrouw%20kan,meldingen%20direct%20met%20112%20belt." target="_blank" rel="noreferrer">click here</a>.</li>
            <li>{t('help.li-tolk', 'default')} <a href="https://www.tolkcontact.nl/tolkcontact-app/wat-kun-je-met-de-app/" target="_blank" rel="noreferrer">{t('help.li-tolk-link', 'default')}</a></li>
            <li>{t('help.li-police-behavior', 'default')} <a href="tel:0800-1205">0800-1205</a></li>
          </ul>
        </div><br></br>

        <div id="houserules">
          <h1>{t('house-rules.title', 'default')}</h1>
          <p>{t('house-rules.p1', 'default')}</p>
          <p>{t('house-rules.p2', 'default')}</p>
          <p>{t('house-rules.p3', 'default')}</p>
        </div><br></br>

        <div id="faq">
          <h1>{t('faq.title', 'default')}</h1>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t('faq.Q1', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t('faq.A1', 'default')}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{t('faq.Q2', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t('faq.A2', 'default')}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{t('faq.Q3', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{t('faq.A3', 'default')}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{t('faq.Q4', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul>
                  <li>{t('faq.A4-1', 'default')}</li>
                  <li>{t('faq.A4-2', 'default')}</li>
                  <li>{t('faq.A4-3', 'default')}</li>
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

      </div>
      <div className="header-footer"></div>
    </>
  );
}

export default Help;