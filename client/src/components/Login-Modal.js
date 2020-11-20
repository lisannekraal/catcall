import React, { useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";

import './Login-Modal.css';

import { useForm } from 'react-hook-form';

function LoginModal (){
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [ nav, setNav ] = useState('MODERATOR');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue =()=>{
    if (nav === 'MOD DASHBOARD') {
      history.push('/dashboard');
    } else {
      setModalIsOpen(true);
    }
  }

  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false);
  }

  const changeNav =()=>{
    setNav('MOD DASHBOARD');
    setModalIsOpen(false);
  }

  return(
      <>
        <div className="moderator-button" onClick={setModalIsOpenToTrue}>
          <i className="fas fa-user-cog"></i> {nav}
        </div>

        <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={()=> setModalIsOpen(false)}>
          <div className="modal-content">
            <button onClick={setModalIsOpenToFalse}>x</button>

            <div>
              <form onSubmit={handleSubmit(changeNav)}>

                <div className="form-segment">
                  <label for="email">E-mail:</label>
                  <input
                    id="email"
                    name="email"
                  ></input>
                </div>
                <div className="form-segment">
                  <label for="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                  ></input>
                </div>
                <div className="form-segment">
                  <input className="submit-button" type="submit" value="Log in"/>
                </div>
              </form>
            </div>

          </div>
        </Modal>
      </>
  )
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color                 : 'white',
    backgroundColor       : 'rgb(29, 113, 183)'
  }
};

export default LoginModal;