import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { UPDATE_CATCALL } from '../../api/queries';
import { useForm } from 'react-hook-form';

function AdminEditForm() {

  let history = useHistory();
  const location = useLocation();
  const { t } = useTranslation(['admin']);
  const { register, handleSubmit, errors } = useForm();
  const [updateCatcall] = useMutation(UPDATE_CATCALL);

  const [ quote, setQuote ] = useState(location.state.catcall.properties.quote);
  const [ context, setContext ] = useState(location.state.catcall.properties.context);
  const [ url, setUrl ] = useState(location.state.catcall.properties.url);
  const [ dateAdded ] = useState(location.state.catcall.properties.dateAdded);
  const [ dateCatcall ] = useState(location.state.catcall.properties.dateCatcall);

  const handleQuoteInput = e => {
    setQuote(e.target.value);
  }

  const handleContextInput = e => {
    setContext(e.target.value);
  }

  const handleUrlInput = e => {
    setUrl(e.target.value);
  }

  const onSubmit = async (newData) => {
    let chalkedVal = false;
    if (newData.url) chalkedVal = true;
    const variables = {
      id: location.state.catcall._id,
      catcall: {
        properties: {
          quote: newData.quote,
          context: newData.context ? newData.context : "",
          url: newData.url ? newData.url : "",
          chalked: chalkedVal
        }
      }
    };
    await updateCatcall({ variables });
    history.push("/dashboard");
  }

  return (
    <>
      <div className="header-footer"></div>
      <div className="report-form" data-testid="report-form">
        <h1>{t('edit.title', 'default')}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          { location.search === '?edit=url' ? (

            <>
              <div className="form-segment">
                <label htmlFor="context">{t('edit.quote', 'default')}</label>
                <p>{quote}</p>
              </div>
              <div className="form-segment">
                <label htmlFor="context">{t('edit.context', 'default')}</label>
                <p>{context ? context : t('edit.context-empty', 'default')}</p>
              </div>
            </>

          ) : (

            <>
              <div className="form-segment">
                <label htmlFor="quote">{t('edit.quote', 'default')}</label>
                <input
                  data-testid="catcall-quote"
                  id="quote"
                  name="quote"
                  value={quote}
                  ref={register({
                    required: "Required",
                    pattern: {
                      value: /[^\x22]+/,
                      message: "Do not use double quotes"
                    }
                  })}
                  onChange={handleQuoteInput}
                ></input>
                <p className="error-message">{errors.quote && errors.quote.message}</p>
              </div>

              <div className="form-segment">
                <label htmlFor="context">{t('edit.context', 'default')}</label>
                <input
                  id="context"
                  name="context"
                  aria-describedby="context-help"
                  value={context}
                  ref={register({
                    pattern: {
                      value: /[^\x22]+/,
                      message: "Do not use double quotes"
                    }
                  })}
                  onChange={handleContextInput}
                ></input>
                <p className="error-message">{errors.context && errors.context.message}</p>
              </div>
            </>

          ) }

          <div className="form-segment">
            <label htmlFor="context">{t('edit.date-catcall', 'default')}</label>
            <p>{ dateCatcall ? (new Date(Number(dateCatcall))).toDateString() : "no date"}</p>
          </div>

          <div className="form-segment">
            <label htmlFor="context">{t('edit.date-report', 'default')}</label>
            <p>{(new Date(Number(dateAdded))).toDateString()}</p>
          </div>

          <div className="form-segment">
            <label htmlFor="context">{t('edit.url', 'default')}</label>
            <input
              id="url"
              name="url"
              value={url}
              ref={register({
                pattern: {
                  value: /[^\x22]+/,
                  message: "Do not use double quotes"
                }
              })}
              onChange={handleUrlInput}
            ></input>
            <p className="error-message">{errors.url && errors.url.message}</p>
          </div>

          <button type="button" className="cancel-button" onClick={()=> history.push('/dashboard') }>{t('edit.cancel', 'default')}</button>

          <input className="submit-button"  type="submit" value={t('edit.submit', 'default')} />

        </form>
      </div>
      <div className="header-footer"></div>
    </>
  );
}

export default AdminEditForm;