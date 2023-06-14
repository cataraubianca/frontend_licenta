import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import { saveToken } from "../utils/storage";
import { getToken } from "../utils/storage";
import { _post } from "../utils/api";
import jwt from "jwt-decode";
import {useCookies} from "react-cookie"
export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookies] = useCookies(["name"])
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    _post("http://localhost:3001/auth/login", {
      email: email,
      password: pass
    }).then((response) => {
      if (response) {
        setCookies("accessCookie", response.data.access_token)
        saveToken(response.data.access_token);
        setSuccessMessage('Login successful!');
        console.log("token: ", response.data.access_token);
        window.location.reload();
      } else {
        setErrorMessage('Email and/or password is not valid!');
      }
    }).catch((err) => {
      console.log(err);
      setErrorMessage('Failed to login. Please try again.');
    });
  };

  const validateForm = () => {
    if (!email || !pass) {
      setErrorMessage('Please fill in all mandatory fields.');
      return false;
    }
    return true;
  };

  return (
    <>
      <div className={styles.Appauth}>
        <div className={styles.divlogin}>
          <div className={styles.authformcontainerlogin}>
            <form className={styles.loginform} onSubmit={handleSubmit}>
              {errorMessage && <div className={styles.error}>{errorMessage}</div>}
              {successMessage && <div className={styles.success}>{successMessage}</div>}
              <label htmlFor="email">Email:</label>
              <input
                className={styles.inputlogin}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
              />

              <label htmlFor="password">Password:</label>
              <input
                className={styles.inputlogin}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
                type="password"
                placeholder="********"
                id="password"
                name="password"
              />

              <button id="login-button" className={styles.loginbtn} type="submit">
                <b>Login</b>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
