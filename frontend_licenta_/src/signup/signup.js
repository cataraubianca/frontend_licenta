import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import styles from "./signup.module.css";
import { _post } from "../utils/api";
import TextField from '@mui/material/TextField';

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
    setEmailError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const validateForm = () => {
    if (!fullName || !email || !password) {
      setErrorName(!fullName ? "Name is required" : "");
      setErrorEmail(!email ? "Email is required" : "");
      setErrorPass(!password ? "Password is required" : "");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorPass(
        "Password must contain a combination of uppercase letters, lowercase letters, numbers, and symbols"
      );
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
      return false;
    }

    _post("http://localhost:3001/auth/new", {
      email: email,
      full_name: fullName || "",
      password: password,
      petsIds: []
    })
      .then((response) => {
        console.log(response.data);
        setSignupError("");
        setEmail("");
        setPassword("");
        setFullName("");
      })
      .catch((err) => {
        console.log(err);
        setSignupError("Failed to sign up. Please try again.");
      });
  };

  return (
    <>
      <div className={styles.Appauth}>
        <div className={styles.divregister}>
          <div className={styles.authformcontainerregister}>
            <form className={styles.registerform} onSubmit={handleFormSubmit}>
              {errorName && <div className={styles.error}>{errorName}</div>}
              <label htmlFor="firstname">Name:</label>
              <input
                className={styles.inputregister}
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="Name"
                id="firstname"
                name="name"
              />

              {errorEmail && <div className={styles.error}>{errorEmail}</div>}
              <label htmlFor="email">Email:</label>
              <input
                className={styles.inputregister}
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
              />

              {errorPass && <div className={styles.error}>{errorPass}</div>}
              <label htmlFor="password">Password:</label>
              <input
                className={styles.inputregister}
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />
              <div style={{ fontSize: "9px" }}>
                Must contain a combination of uppercase letters, lowercase letters, numbers, and symbols
              </div>
              {signupError && <div className={styles.error}>{signupError}</div>}
              <button className={styles.registerbtn} type="submit">
                <b>Register</b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
