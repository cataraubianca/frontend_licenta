import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './modaladopt.css';
import { useState, useEffect } from 'react';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { getToken } from '../utils/token';
import { _get } from '../utils/api';
function ModalAdopt({ setOpenModal, id }) {
  const [pressed, setPressed] = useState(true);
  const form = useRef();
  const [email, setEmail] = useState();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const sendEmail = (e) => {
    e.preventDefault();
  
    // Validate mandatory fields
    if (!form.current.phone.value || !form.current.message.value) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }
  
    emailjs
      .sendForm('service_y32s0mw', 'template_cqvjsqp', form.current, 'p5vGuz2yb4Vp17ske')
      .then((result) => {
        console.log(result.text);
        setSuccessMessage('Email sent successfully!');
      })
      .catch((error) => {
        console.log(error.text);
        setErrorMessage('Failed to send email. Please try again.');
      });
  };
  
  const getOwnerEmailByPetId = async (id) => {
    await _get(`http://localhost:3001/pets/ownerEmail/${id}`).then((response) => {
      setEmail(response.data)
      console.log(email)
  })
  }
  useEffect( ()=>{
    console.log(id);
    getOwnerEmailByPetId(id);
  })
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

        {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <form ref={form} onSubmit={sendEmail}>
          <div>We will let know the owner that you want to adopt this pet. Write your phone number on which you could be contacted below and a message for the owner.</div>
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
