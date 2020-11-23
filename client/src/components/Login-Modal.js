import React, { useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from "react-router-dom";
import {Button} from '@material-ui/core'
import {Icon} from '@material-ui/core'

import './Login-Modal.css';

import { useForm } from 'react-hook-form';

function LoginModal() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [nav, setNav] = useState('moderator');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue = () => {
    if (nav === 'dashboard') {
      history.push('/dashboard');
    } else {
      setModalIsOpen(true);
    }
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  }

  const changeNav = () => {
    setNav('dashboard');
    setModalIsOpen(false);
  }

  return (
    <>
      <Button
        key={'moderator-button'}
        onClick={setModalIsOpenToTrue}
        color='inherit'
        startIcon={<Icon className={'fas fa-user-cog'} fontSize="small" style={{ marginRight: 7 }} />}
      >{nav}
      </Button>

      <Modal data-testid="login-modal" isOpen={modalIsOpen} style={customStyles} onRequestClose={() => setModalIsOpen(false)}>
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
                <input className="submit-button" type="submit" value="Log in" />
              </div>
            </form>
          </div>

        </div>
      </Modal>
    </>
  )
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    backgroundColor: 'rgb(29, 113, 183)'
  }
};

export default LoginModal;