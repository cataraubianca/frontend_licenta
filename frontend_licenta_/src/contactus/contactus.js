import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from "../navbar/navbar";
import './contactus.css'
export const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_y32s0mw', 'template_8kdsbyi', form.current, 'p5vGuz2yb4Vp17ske')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
        <>
        <Navbar/>
        <h1>Have anything to tell us? Let us know!</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="from_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      </>
    );
}