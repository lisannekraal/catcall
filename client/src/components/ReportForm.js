import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import MapForm from './Map-form';
import "flatpickr/dist/themes/material_green.css";
import './ReportForm.css';
import Flatpickr from "react-flatpickr";
import { CREATE_CATCALL } from '../api/queries';
import { useHistory } from "react-router-dom";


function ReportForm() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [date, setDate] = useState("");
  const [lngLat, setLngLat] = useState([]);
  const [createCatcall] = useMutation(CREATE_CATCALL);

  const onSubmit = (data) => {
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
          "trash": false
        }
      }
    }
    createCatcall({ variables: queryVariable });
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
            <small id="quote-help">Only Catcall quote (what has been catcalled)</small>
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
            <small id="context-help">Not required. Share what you'd like, but make sure it does not contain any recognizable features, personal details or words of racism/hate. Moderators can edit this part of your report if necessary. For more details, see our house rules.</small>
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
              <label htmlFor="check">I understand that is catcall report is anonymous and account for it to be true and in accordance with the house rules. More information here.</label>
            </div>
            <p className="error-message">{errors.check && errors.check.message}</p>
          </div>

          <div className="form-segment">
            <div name="captcha" className="g-recaptcha" data-sitekey={process.env.REACT_APP_RECAPTCHA_KEY}></div>
          </div>


          <button type="button" className="cancel-button" onClick={()=> history.push('/')}>Cancel</button>


          <input className="submit-button" type="submit" value="Submit new catcall" />

        </form>

        {/* to do:
        - check CAPTCHA before submission
        - validate form (make sure location is submitted)
        - empty the form */}
      </div>
      <div className="header-footer"></div>
    </>
  );
}
export default ReportForm;