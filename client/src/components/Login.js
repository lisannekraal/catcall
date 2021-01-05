import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VALIDATE_MODERATOR } from '../api/queries';

import './Login.css';

import { useForm } from 'react-hook-form';

function Login({ setCookie, setMod }) {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const [validateModerator, { loading, data, error }] = useLazyQuery(VALIDATE_MODERATOR);

  const onSubmit = (data) => {
    const queryVariable = {
     email: data.email,
     password: data.password
    }
    validateModerator({ variables: queryVariable });
  }

  useEffect(()=>{
    if (data) {
      setCookie(
        'token',
        data.validateModerator.token,
        { path: '/' }
      );
      setMod(data.validateModerator);
      history.push('/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <div className="login">
      <div className="header-footer"></div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {loading ? <p>Loading...</p> : ''}
        {error ? <p>Incorrect E-mail or Password</p> : ''}

        <div className="form-segment">
          <label htmlFor="email">E-mail:</label>
          <input
            ref={register}
            id="email"
            name="email"
          ></input>
        </div>

        <div className="form-segment">
          <label htmlFor="password">Password:</label>
          <input
            ref={register}
            type="password"
            id="password"
            name="password"
          ></input>
        </div>

        <div className="form-segment">
          <input className="submit-button" type="submit" value="Log in" />
        </div>

      </form>
      <div className="header-footer"></div>
    </div>
  )
}

export default Login;