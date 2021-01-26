import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import MapForm from '../Map/MapForm';
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_green.css';
//import './ReportForm.css';
import { CREATE_CATCALL } from '../../api/queries';
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function ReportForm() {
  let history = useHistory();
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
        state: { dialog: 'Your catcall has been reported. Thanks for that. You won\'t see it on the map yet. When a moderator has reviewed your submission it will be added to the map automatically.'}
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
        <h1>Report a catcall</h1>

        <div style={{marginTop: '50px', marginBottom: '40px'}}>
          <p>Submit your experience through this form. Important: <b>if you are in direct need of help</b>, check out <a style={{color: "black"}} href="/help" target="_blank">our resource section</a>.</p>

          <p>Questions about reporting a catcall? Visit our <a style={{color: "black"}} href="/help#faq" target="_blank">FAQ</a> and <a style={{color: "black"}} href="/help#houserules" target="_blank">house rules</a>.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-segment">
            <label htmlFor="quote">Catcall quote*:</label>
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
            <small id="quote-help">Only Catcall text (what exactly has been catcalled)</small>
            <p className="error-message">{errors.quote && errors.quote.message}</p>
          </div>

          <div className="form-segment">
            <label htmlFor="context">Your story:</label>
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
            <small id="context-help">Additional information, not required. Moderators can edit this part of your report if necessary.</small>
            <p className="error-message">{errors.context && errors.context.message}</p>

          </div>

          <div className="form-segment">
            <label htmlFor="context">Date of Catcall:</label>
            <Flatpickr
              value={date}
              onChange={newDate => setDateCatcall(newDate)}
              options={{
                maxDate: "today"
              }}
            />
          </div>

          <div className="form-segment">
            <label htmlFor="context" className="location-title">Location*:</label>
            <MapForm setLocation={setLocation} />
            <small id="context-help">Click on the map to add the location of the catcall.</small>
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
              <label htmlFor="check">I understand that is catcall report is anonymous and account for it to be true and <a className="help-button" href="/help" target="_blank">in accordance with the house rules</a>*.</label>
            </div>
            <p className="error-message">{errors.check && errors.check.message}</p>
          </div>

          <div className="form-segment">
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={()=>{setCheckRecaptcha(true)}} />
            {captchaError!=='' ? <p className="error-message">{captchaError}</p> : ''}
          </div>


          <button type="button" className="cancel-button normal-font" onClick={()=> history.push('/') }>Cancel</button>

          {/* disable recaptcha to run test correctly */}
          <input className="submit-button normal-font"  type="submit" value="Submit new catcall" onClick={()=>{
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