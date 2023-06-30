import React from "react";
import "./Modal.css";
import { useState } from "react";
import { Login } from "../login/login";
import { Signup } from "../signup/signup";
import { getToken } from "../utils/token";
function Modal({ setOpenModal }) {
  const [ pressed, setPressed ] = useState(true)
  return (
    <div className="modalBackgroundd">
      <div className="modalContainerloginn">
        <div className="titleCloseBtn">
        <button className="loginbttn"
            onClick={() => {
              setPressed(true);
            }}
          >
            Login
          </button>
          <button
            className="signupbttn"
            onClick={() => {
              setPressed(false);
            }}
          >
            Signup
          </button>
          <button
            className="closebttn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
          
        </div>

        { pressed ? <div className="modallogsign"><Login/></div> : <div  className="modallogsign"><Signup/></div> }
      </div>
    </div>
  );
}

export default Modal;