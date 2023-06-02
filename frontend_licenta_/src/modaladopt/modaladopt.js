import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './modaladopt.css';
import { useState } from 'react';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { getToken } from '../utils/token';

function ModalAdopt({ setOpenModal, id }) {
  const [pressed, setPressed] = useState(true);
  const form = useRef();
  const [email, setEmail] = useState('catarau.bianca@yahoo.com');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_y32s0mw', 'template_cqvjsqp', form.current, 'p5vGuz2yb4Vp17ske')
      .then((result) => {
        console.log(result.text);
      })
      .catch((error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            className="closebttn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <form ref={form} onSubmit={sendEmail}>
          <label>Phone number</label>
          <input type="number" name="phone" />
          <label>Message</label>
          <textarea name="message" />
          <input type="hidden" name="email" value={email} />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default ModalAdopt;
