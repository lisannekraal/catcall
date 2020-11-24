import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import './Login.css';

import { useForm } from 'react-hook-form';

function Login() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();
  const [nav, setNav] = useState('moderator');


  const changeNav = () => {
    setNav('dashboard');
  }

  return (
    <div className="login">
      <div className="header-footer"></div>
      <form className="login-form" onSubmit={handleSubmit(changeNav)}>
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