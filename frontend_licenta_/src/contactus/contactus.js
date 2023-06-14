import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from "../navbar/navbar";
import './contactus.css'
import Footer from '../footer/footer';
import { useState } from 'react';
export const ContactUs = () => {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const sendEmail = (e) => {
      e.preventDefault();
  
      // Validate mandatory fields
      const { from_name, user_email, message } = form.current;
      if (!from_name.value || !user_email.value || !message.value) {
        setErrorMessage('Please fill in all mandatory fields.');
        return;
      }
  
      emailjs
        .sendForm('service_y32s0mw', 'template_8kdsbyi', form.current, 'p5vGuz2yb4Vp17ske')
        .then((result) => {
          console.log(result.text);
          setSuccessMessage('Email sent successfully!');
          // Clear form after successful submission
          form.current.reset();
        })
        .catch((error) => {
          console.log(error.text);
          setErrorMessage('Failed to send email. Please try again.');
        });
    };
  
    return (
        <div style={{backgroundColor: "#21474b"}}>
        <Navbar/>
        <h1 style={{color: "#efefe0"}}>Have anything to tell us? Let us know!</h1>
        {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form style={{marginBottom: "50px"}} ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="from_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      <Footer/>
      </div>
    );
}