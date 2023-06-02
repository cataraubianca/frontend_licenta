import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import styles from "./signup.module.css";
import { _post } from "../utils/api";
import TextField from '@mui/material/TextField'
export const Signup = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [passwordComplexity, setPasswordComplexity] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');



  const handleEmailChange = (e) => {
    setEmailError(" ");
    setEmail(e.target.value);

  };

  const handlePasswordChange = (e) => {
    setPasswordError(" ");
    setPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      console.log("nana")
      return false;
    }

    _post("http://localhost:3001/auth/new", {
      email: email,
      full_name: fullName || "",
      password: password,
      petsIds: []
    })
      .then((response) => {
        //history("/signup/pending-approval");
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
        setSignupError(err.message);
      });
  };

    return (
        <>
        <div className={styles.Appauth}>
            <div className={styles.divregister}>
                <div className={styles.authformcontainerregister}>
                    <form className={styles.registerform} onSubmit={handleFormSubmit}>
                        { errorName && <div className={styles.error}>{errorName}</div> }
                        <label htmlFor="firstname">Name:</label>
                        <input className={styles.inputregister} value={fullName} onChange={handleFullNameChange} placeholder="Name" id="firstname" name="name" />
                        
                        { errorEmail && <div className={styles.error}>{errorEmail}</div> }
                        <label htmlFor="email">Email:</label>
                        <input className={styles.inputregister} value = {email} onChange={handleEmailChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                        { errorPass && <div className={styles.error}>{errorPass}</div> }
                        <label htmlFor="password">Password:</label>
                        <input className={styles.inputregister} value = {password} onChange={handlePasswordChange} type="password" placeholder="********" id="password" name="password" />
                        
                        <button className={styles.registerbtn} type="submit"><b>Register</b></button>
                    </form>

                </div>
            </div>
        </div>
        </>
    )
}