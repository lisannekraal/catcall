import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MapForm from '../Map/MapForm';
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_green.css';
import { CREATE_CATCALL } from '../../api/queries';
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function ReportForm() {

  let history = useHistory();
  const { t } = useTranslation(['report']);
  const { register, handleSubmit, errors } = useForm();
  const [date, setDate] = useState("");
  const [mapError, setMapError] = useState("");
  const [checkRecaptcha, setCheckRecaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [lngLat, setLngLat] = useState([]);
  const [createCatcall] = useMutation(CREATE_CATCALL);

  const onSubmit = async (data) => {
    if (lngLat.length > 0 && checkRecaptcha) {

      const queryVariable = {
        "catcall": {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": lngLat
          },
          "properties": {
            "quote": data.quote,
            "context": data.context ? data.context : "",
            "dateCatcall": date ? "" + Date.parse(date) : "",
            "dateAdded": "" + Date.now(),
            "url": "",
            "verified": false,
            "chalked": false,
            "listedForChalk": false,
            "starred": false,
            "trash": false,
            "categories": [],
            "votes": 0
          }
        }
      }
      await createCatcall({ variables: queryVariable });
      history.push({
        pathname: '/catcalls',
        state: { dialog: t('dialog', 'default') }
      });
    }
  }

  function setLocation(e) {
    setLngLat([e.lngLat.lng, e.lngLat.lat]);
  }

  function setDateCatcall(newDate) {
    setDate(newDate);
  }

  return (
    <>
      <div className="header-footer"></div>
      <div className="report-form" data-testid="report-form">
        <h1>{t('title', 'default')}</h1>

        <div style={{marginTop: '50px', marginBottom: '40px'}}>
          <p>{t('info.p1', 'default')} <b>{t('info.p2-bold', 'default')}</b>, {t('info.p3', 'default')} <a style={{color: "black"}} href="/help" target="_blank">{t('info.p4-link', 'default')}</a>.</p>

          <p>{t('info.p5', 'default')} <a style={{color: "black"}} href="/help#houserules" target="_blank">{t('info.p5-link', 'default')}</a>.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-segment">
            <label htmlFor="quote">{t('quote.title', 'default')}</label>
            <input
              data-testid="catcall-quote"
              id="quote"
              name="quote"
              aria-describedby="quote-help"
              ref={register({
                required: "Required",
                pattern: {
                  value: /[^\x22]+/,
                  message: "Do not use double quotes"
                }
              })}
            ></input>
            <small id="quote-help">{t('quote.help', 'default')}</small>
            <p className="error-message">{errors.quote && errors.quote.message}</p>
          </div>

          <div className="form-segment">
            <label htmlFor="context">{t('context.title', 'default')}</label>
            <input
              id="context"
              name="context"
              aria-describedby="context-help"
              ref={register({
                pattern: {
                  value: /[^\x22]+/,
                  message: "Do not use double quotes"
                }
              })}
            ></input>
            <small id="context-help">{t('context.help', 'default')}</small>
            <p className="error-message">{errors.context && errors.context.message}</p>

          </div>

          <div className="form-segment">
            <label htmlFor="context">{t('date.title', 'default')}</label>
            <Flatpickr
              value={date}
              onChange={newDate => setDateCatcall(newDate)}
              options={{
                maxDate: "today"
              }}
            />
          </div>

          <div className="form-segment">
            <label htmlFor="context" className="location-title">{t('location.title', 'default')}</label>
            <MapForm setLocation={setLocation} />
            <small id="context-help">{t('location.help', 'default')}</small>
            {mapError!=='' ? <p className="error-message">{mapError}</p> : ''}
          </div>

          <div className="form-segment checkbox">
            <div className="checkbox" data-testid="check-box">
              <input
                data-testid="catcall-checkbox"
                id="check"
                name="check"
                type="checkbox"
                ref={register({
                  required: "Required",
                  pattern: {
                    message: "Please agree on these conditions"
                  }
                })}
              ></input>
              <label htmlFor="check">{t('checkbox.text', 'default')}</label>
            </div>
            <p className="error-message">{errors.check && errors.check.message}</p>
          </div>

          <div className="form-segment">
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={()=>{setCheckRecaptcha(true)}} />
            {captchaError!=='' ? <p className="error-message">{captchaError}</p> : ''}
          </div>


          <button type="button" className="cancel-button normal-font" onClick={()=> history.push('/') }>{t('button.cancel', 'default')}</button>

          {/* disable recaptcha to run test correctly */}
          <input className="submit-button normal-font"  type="submit" value={t('button.submit', 'default')} onClick={()=>{
            if (lngLat.length === 0) setMapError('Required');
            if (!checkRecaptcha) setCaptchaError('Please indicate you\'re not a robot');
          }}/>

        </form>
      </div>
      <div className="header-footer"></div>
    </>
  );
}
export default ReportForm;